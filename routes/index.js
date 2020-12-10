const router = require('express').Router();
const cache = require('../middlewares/cachePolicy');
const url = require('../controllers/url');
const { check, validationResult } = require('express-validator');
const {signin,signout,signup}=require("../controllers/auth");


require("../config/passport");

router.post("/signup",[
    check('name','name should be min 3 char')
    .isLength({ min: 3 }),
    check('email','email should be a valid one')
    .isEmail(),
    check('password','password should be min 3 char')
    .isLength({ min: 3 }),

],signup)
router.post("/signin",[
    
    check('email','email should be a valid one')
    .isEmail(),
    check('password','password is required')
    .isLength({ min: 1 }),

],signin)

router.get("/signout",signout);

router.post('/shorten',url.shorten);
router.get('/:code',cache,url.redirect);

module.exports = router;






