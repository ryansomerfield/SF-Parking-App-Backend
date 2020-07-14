const express = require("express");
const User = require("../models/User");
const router = express.Router();

//If no user, redirect to login
router.get("/*", (req, res, next) => {
  if (!req.user) {
    res.redirect("./auth/");
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  res.json({
    endpoints: {
      homePage: "/",
      allUsers: "/users",
    },
  });
});

router.get("/users", async (req, res) => {
  let data = await User.find({});
  res.json(data);
});

module.exports = router;
