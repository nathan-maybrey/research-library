const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/', functions.viewAllProjects);

router.get('/project/:id', functions.viewProjectById);

router.get('/create-project', functions.createProjectGet);
router.post('/create-project', functions.createProjectPost); 

module.exports = router;