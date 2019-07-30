const express = require("express");
const router = express.Router();
const connection = require("../db");

const SELECT_ALL_PROJECTS_QUERY = "SELECT * FROM projects ";

router.get("/", (req, res) => {
  const user_id = req.headers.user_id;
  console.log(req.headers.user_id);
  // do the query case on the user
  const QUERY = user_id
    ? SELECT_ALL_PROJECTS_QUERY + `WHERE user = ${user_id}`
    : SELECT_ALL_PROJECTS_QUERY;
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
