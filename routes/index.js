const router = require("express").Router();

const main = require("./api/main");
const url = require("./api/url");

router.use('/',main);
router.use('/',url);

module.exports = router;
