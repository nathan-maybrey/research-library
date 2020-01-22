const path = require('path');
const root = require('../../util/path');

const passport = require('passport');

const signin = (req, res) => {
    if(req.user){
        res.redirect('/projects');
    } else {
        res.render(path.join(root, 'src/views/pages', 'signin.html'), { user: req.user });
    }
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