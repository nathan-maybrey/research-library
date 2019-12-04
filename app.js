const express = require('express');

const app = express();

const collectionRoutes = require('./src/controllers/collections/routes');

app.use('/collections', collectionRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;