const path = require('path');
const root = require('../../util/path');

const passport = require('passport');

const signin = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'signin.html'));
};

const redirectToAuth = (req, res) => {
    if(req.body['sign-in'] == 'google'){
        res.redirect('/signin/google');
    } else {
        res.redirect('');
    }
};

const handleAuth = (req, res) => {
    console.log("Authenticated");
    res.redirect('/projects');
};

module.exports.signin = signin;
module.exports.handleAuth = handleAuth;
module.exports.redirectToAuth = redirectToAuth;