const User = require("../models/User");
const passport = require("passport");
const config = require("config");
const GOOGLE_CLIENT_ID = config.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = config.get("GOOGLE_CLIENT_SECRET");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOneAndUpdate(
        { googleId: profile.id },
        { lastLogin: Date.now() },
        { new: true }
      ).then((currentUser) => {
        if (currentUser) {
          // already have this user
          //update the last login
          console.log("user is: ", currentUser);

          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            name: profile.displayName,
            lastLogin: Date.now(),
            creationDate: Date.now(),
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
