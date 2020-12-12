const router = require('express').Router();
const cache = require('../middlewares/cachePolicy');
const url=require("../controllers/url");
const auth = require('../controllers/auth');


require("../config/passport");


//authentation 
router.post("/signup",auth.signup);
router.post("/signin",auth.signin);
router.get("/signout",auth.signout);


router.post('/shorten',url.shorten);
router.get('/:code',cache,url.redirect);

module.exports = router;