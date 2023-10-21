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
        res.json(handleLoginUser(err, results, password));
      });
    } else if (database == "sqlite") {
      connection.all(FIND_USER_QUERY, [], (err, results) => {
        res.json(handleLoginUser(err, results, password));
      });
    }
  }
});

function handleLoginUser(err, results, password) {
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
      console.log(password, user.password);
      if (bcrypt.compareSync(password, user.password)) {
        // JSON web token

        const token = utils.generateToken(user);
        return {
          name: user["name"],
          token,
          user_id: user.user_id
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
    const CHECK_NAME_QUERY = `SELECT * from users WHERE name = ${'"' + name + '"'} `;

    if (database == "mysql") {
      connection.query(CHECK_NAME_QUERY, (err, results) => {
        if (results && results.length > 0) {
          res.json({ error: "Username already exists. Please choose a different username." });
        } else {
          // Your user creation code starts here
          name = name.trim();
          password = password.trim();
          email = email.trim();
          const hash_password = bcrypt.hashSync(password, saltRounds);
          const CREATE_NEW_USER = `INSERT INTO users(name,password,email) values('${name}','${hash_password}','${email}')`;

          connection.query(CREATE_NEW_USER, (err, results) => {
            console.log(err, results);
            res.json(handleRegister(err, results.insertId, name));
          });
          // Your user creation code ends here
        }
      });
    } else if (database == "sqlite") {
      connection.all(CHECK_NAME_QUERY, [], (err, results) => {
        if (results && results.length > 0) {
          res.json({ error: "Username already exists. Please choose a different username." });
        } else {
          // Your user creation code starts here
          name = name.trim();
          password = password.trim();
          email = email.trim();
          const hash_password = bcrypt.hashSync(password, saltRounds);
          const CREATE_NEW_USER = `INSERT INTO users(name,password,email) values('${name}','${hash_password}','${email}')`;

          connection.run(CREATE_NEW_USER, function(err) {
            res.json(handleRegister(err, this.lastID, name));
          });
          // Your user creation code ends here
        }
      });
    }
  }
});

function handleRegister(err, user_id, name) {
  if (err) {
    console.log(err.message);
    return {
      error: "Account exist or invalid entry"
    };
  } else {
    const token = utils.generateToken({
      name,
      user_id
    });
    return {
      name: name,
      token,
      user_id,
    };
  }
}

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

router.patch("/edit_user", function(req, res) {
  const token = req.headers["x-auth-token"];
  const { user } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Must pass token" });
  }
  utils.verifyToken(token, cb => {
    if (cb) {
      const hash_password = bcrypt.hashSync(user.password, saltRounds);
      const UPDATE_USER =
        "UPDATE users SET name = ?, password = ?, email = ? WHERE user_id = ?";
      if (database === "mysql") {
        connection.query(
          UPDATE_USER,
          [user.name, hash_password, user.email, user.user_id],
          (err, results) => {
            if (err) {
              return res.json({ err });
            }
            const GET_USER =
              "SELECT name, email, user_id FROM users WHERE user_id = ?";
            connection.query(GET_USER, [user.user_id], (err, results) => {
              if (err) {
                return res.json({ err });
              }
              return res.json({
                user: results[0]
              });
            });
          }
        );
      }
      if (database === "sqlite") {
        connection.run(
          UPDATE_USER,
          [user.name, hash_password, user.email, user.user_id],
          (err, results) => {
            if (err) {
              return res.json({ err });
            }
            const GET_USER =
              "SELECT name, email, user_id FROM users WHERE user_id = ?";
            connection.all(GET_USER, [user.user_id], (err, results) => {
              if (err) {
                return res.json({ err });
              }
              return res.json({
                user: results[0]
              });
            });
          }
        );
      }
    } else {
      return res.status(401).json({ message: "Token Not Valid" });
    }
  });
});

module.exports = router;