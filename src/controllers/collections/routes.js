const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/', functions.getCollections);

router.get('/test', functions.testForm);
router.post('/test', functions.submitTestForm); 

module.exports = router;