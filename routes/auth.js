const express = require("express");
const passport = require("passport");
const router = express.Router();

//If user already logged in, redirect to API home
router.get("/*", (req, res, next) => {
  if (req.user) {
    res.redirect(process.env.API_BASE);
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
    res.redirect(process.env.API_BASE);
  }
);

//Facebook Authentication
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.API_BASE);
  }
);

//Twitter Authentication
router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.API_BASE);
  }
);

module.exports = router;
