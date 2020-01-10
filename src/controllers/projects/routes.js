const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/', functions.viewAllProjects);

router.get('/project/:id', functions.viewProjectById);

router.get('/create', functions.createProjectGet);
router.post('/create', functions.createProjectPost);

module.exports = router;