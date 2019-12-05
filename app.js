const express = require('express');
const app = express();
const nunjucks  = require('nunjucks');
const path = require('path');

const collectionRoutes = require('./src/controllers/collections/routes');

nunjucks.configure([
    "src/views",
    "node_modules/govuk-frontend/"
], {
    autoescape: true,
    express: app
})

app.use('/collections', collectionRoutes);

// Middleware to serve static assets
app.set('view engine', 'html');
app.use('/assets', express.static('./public'));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets'), { maxage: 86400000 }));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;