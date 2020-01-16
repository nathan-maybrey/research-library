require('dotenv').config();

const express = require('express');
const app = express();
const nunjucks  = require('nunjucks');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dateFilter = require('nunjucks-date-filter');

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const i18nextBackend = require('i18next-node-fs-backend');

const passport = require('passport');
const passportSetup = require('./src/config/passport-setup');
const cookieSession = require('cookie-session');

const projectRoutes = require('./src/controllers/projects/routes');
const authRoutes = require('./src/controllers/auth/routes');

//i18n setup
i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en'],
    saveMissing: true,
    useCookie: false,
    ns: [
        'app',
        'projects',
        'project',
        'signin',
        'createProject',
        'createDocument'
    ]
  });

app.use(i18nextMiddleware.handle(i18next));


const initiateNunjucks = () => {
    let env = nunjucks.configure([
        "src/views",
        "src/views/helpers",
        "node_modules/govuk-frontend/"
    ], {
        autoescape: true,
        express: app
    })

    env.addFilter('date', dateFilter);
};

initiateNunjucks();

app.use(cookieSession({
    maxAge: 60 * 60 * 1000, //1 hour
    keys: [process.env.COOKIE_KEY]
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Add post middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));


// Middleware to serve static assets
app.set('view engine', 'html');
app.use('/assets', express.static('public'));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets'), { maxage: 86400000 }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
// app.use(express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets'), { maxage: 86400000 }));

//Database setup
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

app.use('/signin', authRoutes);

app.use('/signout', (req, res) => {
    req.logout();
    res.redirect('/signin');
});

app.use((req, res, next) => {
    if(req.user){
        next();
    } else {
        console.log("User not authenticated... Redirecting");
        res.redirect('/signin');
    }
});

app.use('/projects', projectRoutes);

//Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;