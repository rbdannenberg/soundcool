const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  // console.log(req);
  const { email, password } = req.body;

  const FIND_USER_QUERY = `SELECT * from users WHERE email = ${'"' +
    email +
    '"'} `;

  connection.query(FIND_USER_QUERY, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (results.length === 0) {
        console.log("Invalid email and password combination.");
        res.send("hello2");
      } else {
        const user = results[0];
        // the password is encrypted, so we need to compare it.
        if (bcrypt.compare(password, user.password)) {
          // JSON web token
          const token = jwt.sign({ id: user.user_id }, "jwtPrivateKey");
          res.send(token);
          console.log("Login successful");
        } else {
          console.log("Invalid email and password combination.");
        }
      }
    }
  });
});

module.exports = router;
