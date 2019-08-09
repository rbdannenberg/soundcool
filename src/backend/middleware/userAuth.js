const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied, no token provided.");

  try {
    // decoded is {id : xx}, since we only encoded the user id
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
