const express = require("express");
const router = express.Router();
const connection = require("../db");

const userAuth = require("../middleware/userAuth");

const SELECT_ALL_SOUNDS_QUERY = "SELECT * FROM sounds ";

router.get("/", (req, res) => {
  const user_id = req.headers.user_id;
  // do the query case on the user
  const QUERY = user_id
    ? SELECT_ALL_SOUNDS_QUERY + `WHERE user = ${user_id}`
    : SELECT_ALL_SOUNDS_QUERY;
  connection.query(QUERY, (err, results) => {
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

module.exports = router;
