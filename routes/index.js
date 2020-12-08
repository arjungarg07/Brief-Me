const router = require('express').Router();

const cache = require('../middlewares/cachePolicy');
const { URLshorten ,URLredirect}= require('../controllers/url');

router.post('/shorten',URLshorten);
router.get('/:code',cache,URLredirect);

module.exports = router;