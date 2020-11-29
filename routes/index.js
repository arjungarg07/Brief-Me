const router = require('express').Router();

const url = require('../controllers/url');

router.post('/shorten',url.shorten);
router.get('/:code',url.redirect);

module.exports = router;