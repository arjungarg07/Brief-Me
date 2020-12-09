const router = require("express").Router();

const passport = require("passport");
const cache = require("../middlewares/cachePolicy");
const url = require("../controllers/url");

router.post("/shorten", url.shorten);
router.get("/:code", cache, url.redirect);

// auth logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/");
  }
);

module.exports = router;
