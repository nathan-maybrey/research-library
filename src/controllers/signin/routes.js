const express = require('express');
const functions = require('./functions');
const passport = require('passport');

const router = new express.Router();

router.get('/', functions.signin);

router.post('/', functions.redirectToAuth);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/redirect', passport.authenticate('google'), functions.handleAuth);

module.exports = router;