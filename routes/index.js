const router = require('express').Router();

const cache = require('../middlewares/cachePolicy');
const { URLshorten ,URLredirect}= require('../controllers/url');

<<<<<<< HEAD
const {}=require("../controllers/url");
const { signup, signin, signout } = require('../controllers/auth');


require("../config/passport");


//authentation 
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);


router.post('/shorten',url.shorten);
router.get('/:code',cache,url.redirect);
=======
router.post('/shorten',URLshorten);
router.get('/:code',cache,URLredirect);
>>>>>>> 4d5353899dd212a249c2e18237c871ca02406214

module.exports = router;