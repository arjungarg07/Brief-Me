<<<<<<< HEAD
const router = require("express").Router();

const passport = require("passport");
const cache = require("../middlewares/cachePolicy");
const url = require("../controllers/url");
//const googleAuth = require("../controllers/googleAuth");
const auth = require('../controllers/auth');
=======
const router = require('express').Router();
const cache = require('../middlewares/cachePolicy');
const url=require("../controllers/url");
const auth = require('../controllers/auth');


require("../config/passport");


//authentation 
router.post("/signup",auth.signup);
router.post("/signin",auth.signin);
router.get("/signout",auth.signout);

>>>>>>> 2b2d7ef6ae4d5222457c00e1d4b36ab69e632a2b


require("../config/passport-setup");


//authentation 
router.post("/signup",auth.signup);
router.post("/signin",auth.signin);
router.get("/signout",auth.signout);


router.post("/shorten", url.shorten);
router.get("/:code", cache, url.redirect);

// auth logout
//router.get("/auth/logout", googleAuth.logout);

// auth with google+
// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// callback route for google to redirect to
// router.get(
//   "/auth/google/redirect",
//   passport.authenticate("google"),
//   googleAuth.redirect
// );

module.exports = router;
