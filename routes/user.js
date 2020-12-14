const express = require("express");
const {getUserById, getUser} = require("../controllers/user");
const passport = require('passport');
const router = express.Router();


router.param("userId",getUserById);

//Get user by its id
router.get("/user/:userId",passport.authenticate('jwt', { session: false }), getUser);


module.exports = router;
