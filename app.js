require('dotenv').config();

const express = require('express');
const app = express();
const nunjucks  = require('nunjucks');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dateFilter = require('nunjucks-date-filter');

const collectionRoutes = require('./src/controllers/collections/routes');
const projectRoutes = require('./src/controllers/projects/routes');

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
}

initiateNunjucks();

// Add post middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/collections', collectionRoutes);
app.use('/projects', projectRoutes);

// Middleware to serve static assets
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
app.use(express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets'), { maxage: 86400000 }));

//Database setup
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

//Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;