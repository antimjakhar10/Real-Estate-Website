const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    const token = jwt.sign(
      { role: "admin" },
      "SECRET_KEY_123",
      { expiresIn: "1d" }
    );

    return res.json({ success: true, token });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Password"
  });
});

module.exports = router;