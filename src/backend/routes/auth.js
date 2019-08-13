const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcrypt");

exports.singIn = router.post("/sign_in", (req, res) => {
  const { email, password } = req.body.user;

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
          res.json({
            token
          });
          console.log("Login successful");
        } else {
          console.log("Invalid email and password combination.");
        }
      }
    }
  });
});

router.post("/register", (req, res) => {
  const { name, password, email } = req.body.user;

  const CREATE_NEW_USER = `INSERT INTO users(name,password,email) values('${name}','${password}','${email}')`;

  connection.query(CREATE_NEW_USER, (err, results) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY")
        res.json({res:"error", error: "User already exist" });
      else res.send(err);
    } else {
      const token = jwt.sign({ id: results.insertId }, "jwtPrivateKey");
      res.json({
        token
      });
    }
  });
});

module.exports = router;
