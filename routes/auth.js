const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

// Display Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login Logic
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(400).send("User not found.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid password.");
  }

  req.session.userId = user._id;
  res.redirect("/");
});

// Logout and destroy session
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Home Gallery Page (only accessible if logged in)
router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("index");
});

module.exports = router;
