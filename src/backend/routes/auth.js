const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcrypt");

exports.singIn = router.post("/sign_in", (req, res) => {
  const { email, password } = req.body.user;
  if (email == "" || password == "" || password.length < 6) {
    res.json({
      error: "Please Fill All Required Fields"
    });
  } else {
    const FIND_USER_QUERY = `SELECT * from users WHERE email = ${'"' +
      email +
      '"'} `;

    connection.query(FIND_USER_QUERY, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (results.length === 0) {
          res.json({
            error: "User does not exist"
          });
        } else {
          const user = results[0];
          // the password is encrypted, so we need to compare it.
          if (bcrypt.compareSync(password, user.password)) {
            // JSON web token
            const token = jwt.sign({ id: user.user_id }, "jwtPrivateKey");
            console.log("hello");
            res.json({
              token
            });
          } else {
            res.json({
              error: "Invalid Password"
            });
          }
        }
      }
    });
  }
});

router.post("/register", (req, res) => {
  const { name, password, email } = req.body.user;

  const CREATE_NEW_USER = `INSERT INTO users(name,password,email) values('${name}','${password}','${email}')`;

  connection.query(CREATE_NEW_USER, (err, results) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY")
        res.json({ res: "error", error: "User already exist" });
      else
        res.json({
          non_field_errors: ["Unable to register with provided credentials."]
        });
    } else {
      const token = jwt.sign({ id: results.insertId }, "jwtPrivateKey");
      res.json({
        token
      });
    }
  });
});

module.exports = router;
