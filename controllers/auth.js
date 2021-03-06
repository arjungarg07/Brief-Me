const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

function signUp(req, res) {
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ 
      errors: errors.array()[0].msg
     });
  }
	const user = new User(req.body);

	user.save((err, user) => {
		if (err) {
			return res.status(404).json({
				error: 'NOT able to STORE',
			});
		}
		res.json(user);
	});
}
function signIn(req, res, next) {
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ 
      errors: errors.array()[0].msg
     });
  }
	passport.authenticate(
		'local',
		{ session: false },
		function (err, user, info) {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(500).json(info.message);
			}
			//create token
			const token = jwt.sign({ _id: user._id }, process.env.SECRET);
			//create cookie
			res.cookie('token', token, {
				expire: new Date() + 9999,
			});
			const { _id, name, email } = user;
			return res.json({
				token,
				user: { _id, name, email },
			});
		}
	)(req, res, next);
}

function signOut(req, res) {
	res.clearCookie('token');
	res.json({
		message: 'User signOut success',
	});
}

module.exports = { signIn, signUp, signOut };
