const router = require('express').Router();

const cache = require('../middlewares/cachePolicy');
const { URLshorten ,URLredirect}= require('../controllers/url');

const {}=require("../controllers/url");
const { signup, signin, signout } = require('../controllers/auth');


require("../config/passport");


//authentation 
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);


router.post('/shorten',url.shorten);
router.get('/:code',cache,url.redirect);

module.exports = router;