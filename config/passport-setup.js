const User = require('../models/User');
const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const localStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
dotenv.config();

const opts = {};
opts.jwtFromRequest = passportJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		function (username, password, done) {
			let email = username;
			//console.log(`${username}    hell0 123 and ${password}`);
			User.findOne({ email }, (err, user) => {
				if (err || !user) {
					//console.log('error:USER EMAIL DOESNT EXISTS1');
					return done(err, false, {
						error: 'USER EMAIL DOESNT EXISTS',
					});
				}
				if (!user.authenticate(password)) {
					return done(err, false, {
						// console.log("error:USER EMAIL DOESNT EXISTS2");
						error: 'EMAIL AND PASSSWORD DOESNT MATCH ',
					});
				}
				done(null, user);
			});
		}
	)
);

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
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/redirect',
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
					console.log('user is: ', currentUser);

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
							console.log('created new user: ', newUser);
							done(null, newUser);
						});
				}
			});
		}
	)
);

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		console.log(jwt_payload +"PAYLOAD") ;
    User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  })
}));
