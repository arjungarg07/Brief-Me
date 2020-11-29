const router = require('express').Router();

const cache = require('../middlewares/cachePolicy');
const url = require('../controllers/url');

router.post('/shorten',url.shorten);
router.get('/:code',cache,url.redirect);

module.exports = router;