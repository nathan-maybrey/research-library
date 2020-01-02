const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/', functions.getCollections);

module.exports = router;