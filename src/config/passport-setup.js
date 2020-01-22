require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

//Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/signin/redirect"
  },
  async function(accessToken, refreshToken, profile, cb) {

    const existingUser = await User.findOne({ googleId: profile.id });

    if(existingUser){
        //User already exists in DB
        cb(null, existingUser);
    } else {
        //Create new record in DB
        const newUser = await new User({
            name: profile.displayName,
            googleId: profile.id
        }).save();
        cb(null, newUser);
    }

  }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser( async (userId, cb) => {
    const retrievedUser = await User.findById(userId);
    cb(null, retrievedUser);
});