const express = require("express");
const passport = require("passport");
const router = express.Router();

//If user already logged in, redirect to API home
router.get("/*", (req, res, next) => {
  if (req.user) {
    res.redirect(process.env.CORS_ORIGIN + `/auth/${req.user._id}`);
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  res.render("auth");
});

//Google Authentication
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.CORS_ORIGIN + `/auth/${req.user._id}`);
  }
);

//Facebook Authentication
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.CORS_ORIGIN + `/auth/${req.user._id}`);
  }
);

//Twitter Authentication
router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.CORS_ORIGIN + `/auth/${req.user._id}`);
  }
);

module.exports = router;
