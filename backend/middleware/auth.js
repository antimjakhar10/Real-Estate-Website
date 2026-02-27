const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({ message: "Access Denied ❌" });

  try {
    const token = authHeader.replace("Bearer ", "");

    const verified = jwt.verify(token, "SECRET_KEY_123");

    req.admin = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token ❌" });
  }
};