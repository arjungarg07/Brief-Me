const router = require('express').Router();

const passport = require('passport');
const cache = require('../middlewares/cachePolicy');
const url = require('../controllers/url');
const googleAuth = require('../controllers/googleAuth');
const auth = require('../controllers/auth');
const { check, validationResult } = require('express-validator')

require('../config/passport-setup');

//authentation
router.post('/signUp',[
    check('name','name should be min 3 char')
    .isLength({ min: 3 }),
    check('email','email should be a valid one')
    .isEmail(),
    check('password','password should be min 3 char')
    .isLength({ min: 3 }),

], auth.signUp);
router.post('/signIn',[
    
    check('email','email should be a valid one')
    .isEmail(),
    check('password','password is required')
    .isLength({ min: 1 }),

], auth.signIn);
router.get('/signOut', auth.signOut);

router.post('/shorten', url.shorten);
router.get('/:code', cache, url.redirect);

//auth logout
router.get('/auth/logout', googleAuth.logout);

//auth with google+
router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

//callback route for google to redirect to
router.get(
	'/auth/google/redirect',
	passport.authenticate('google'),
	googleAuth.redirect
);

module.exports = router;
