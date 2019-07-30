const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcrypt");

const SELECT_ALL_USERS_QUERY = "SELECT * FROM users";

router.get("/", (req, res) => {
  connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
    if (err) {
      console.log("come to error");
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

router.post("/", async (req, res) => {
  const { email, password, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const INSERT_USER_QUERY = `INSERT INTO users (email, password, name) VALUES ('${email}', '${hashed}', '${name}')`;

  console.log(INSERT_USER_QUERY);

  connection.query(INSERT_USER_QUERY, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      const token = jwt.sign({ id: results.insertId }, "jwtPrivateKey");
      res.header("x-auth-token", token).send("successfully added user");
    }
  });
});

module.exports = router;
