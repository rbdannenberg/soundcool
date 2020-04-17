const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcrypt");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const saltRounds = 10;

const utils = require("../utils");

const database = process.env.MYSQL_HOST ? "mysql" : "sqlite";

router.post("/sign_in", (req, res) => {
  let { email, password } = req.body.user;
  if (email == "" || password == "") {
    res.json({
      error: "Please fill all required fields"
    });
  } else if (!emailRegexp.test(email)) {
    res.json({
      error: "Please enter a valid email address"
    });
  } else if (password.length < 6) {
    res.json({
      error: "Password length must be atleast 6 character long"
    });
  } else {
    password = password.trim();
    email = email.trim();
    const FIND_USER_QUERY = `SELECT * from users WHERE email = ${'"' +
      email +
      '"'} `;
    if (database == "mysql") {
      connection.query(FIND_USER_QUERY, (err, results) => {
        res.json(handleLoginUser(err, results, email, password));
      });
    } else if (database == "sqlite") {
      connection.all(FIND_USER_QUERY, [], (err, results) => {
        res.json(handleLoginUser(err, results, email, password));
      });
    }
  }
});

function handleLoginUser(err, results, email, password) {
  if (err) {
    return {
      error: err
    };
  } else {
    if (results.length === 0) {
      return {
        error: "User does not exist"
      };
    } else {
      const user = results[0];
      // the password is encrypted, so we need to compare it.
      if (bcrypt.compareSync(password, user.password)) {
        // JSON web token

        const token = utils.generateToken(user);
        return {
          name: user["name"],
          token
        };
      } else {
        return {
          error: "Invalid Password"
        };
      }
    }
  }
}

router.post("/register", (req, res) => {
  let { name, password, email } = req.body.user;
  if (email == "" || password == "" || name == "") {
    res.json({
      error: "Please fill all required fields"
    });
  } else if (!emailRegexp.test(email)) {
    res.json({
      error: "Please enter a valid email address"
    });
  } else if (password.length < 6) {
    res.json({
      error: "Password length must be atleast 6 character long"
    });
  } else {
    name = name.trim();
    password = password.trim();
    email = email.trim();
    const hash_password = bcrypt.hashSync(password, saltRounds);
    const CREATE_NEW_USER = `INSERT INTO users(name,password,email) values('${name}','${hash_password}','${email}')`;

    connection.query(CREATE_NEW_USER, (err, results) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY")
          res.json({
            error: "Account already exist"
          });
        else
          res.json({
            error: "Unable to register with provided credentials"
          });
      } else {
        const token = utils.generateToken({
          name,
          user_id: results.insertId
        });
        res.json({
          name: name,
          token
        });
      }
    });
  }
});

router.get("/validateToken", function(req, res) {
  var token = req.query.token;
  if (!token) {
    return res.status(401).json({ message: "Must pass token" });
  }
  utils.verifyToken(token, cb => {
    if (cb) {
      res.json({ token });
    } else {
      return res.status(401).json({ message: "Token Not Valid" });
    }
  });
});

module.exports = router;
