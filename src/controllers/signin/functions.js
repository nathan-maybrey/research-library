const path = require('path');
const root = require('../../util/path');

const passport = require('passport');

const signin = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'signin.html'));
}

const handleAuth = (req, res) => {
    console.log("Authenticated");
    res.redirect('/projects');
}

module.exports.signin = signin;
module.exports.handleAuth = handleAuth;