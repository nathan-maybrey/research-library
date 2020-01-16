const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/', functions.viewAllProjects);

router.get('/create', functions.createProjectGet);
router.post('/create', functions.createProjectPost);

router.get('/:id', functions.viewProjectById);
router.get('/:id/documents/create', functions.createDocumentGet);
router.post('/:id/documents/create', functions.createDocumentPost);

module.exports = router;