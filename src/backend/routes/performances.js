const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../db");
const utils = require("../utils");
var cTimeStamp = new Date().getTime();
var fs = require("fs");

const jwtToken = process.env.JWT_SECRET ? process.env.JWT_SECRET : "soundcool";
const database = process.env.MYSQL_HOS ? "mysql" : "sqlite";

function updateTimeStamp() {
  cTimeStamp = new Date().getTime();
}

const SELECT_ALL_PERFORMANCES_QUERY = "SELECT * FROM performances ";

router.get("/get", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  var QUERY = `select *,(CASE WHEN user=${user_id} THEN 0 ELSE user END)as isOwner from projects where user=${user_id} or sharedUsers like '%"user_id":${user_id}%' or isPublic =true order by project_id desc`;

  // do the query case on the user
  if (!!req.query.limit) {
    QUERY += ` limit ${req.query.limit}`;
  }

  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        return res.json(results);
      }
    });
  } else if (database == "sqlite") {
    connection.all(QUERY, [], (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        return res.json(results);
      }
    });
  }
});

router.get("/performance", (req, res) => {
  // const performanceId = req.query.performanceId;
  const performanceName = req.query.performanceName;
  const token = req.headers["x-auth-token"];
  utils.verifyToken(token, user => {
    if (user) {
      const QUERY = `select *,(CASE WHEN user=${user.id} THEN 0 ELSE user END)as isOwner from performances where (user=${user.id} or sharedUsers like '%"user_id":${user.id}%' or isPublic =true) and name='${performanceName}'`;
      if (database == "mysql") {
        connection.query(QUERY, (err, results) => {
          if (err) {
            console.log(err);
            return res.json({ err: err });
          } else {
            return res.json(results[0]);
          }
        });
      } else if (database == "sqlite") {
        connection.all(QUERY, [], (err, results) => {
          if (err) {
            console.log(err);
            return res.json({ err: err });
          } else {
            if (results.length > 1) {
              console.log("duplicate performance name!");
              return res.json({ err: "duplicate performance name!" });
            } else {
              return res.json(results[0]);
            }
          }
        });
      }
    } else {
      return res.status(401).json({ message: "Token Not Valid" });
    }
  });
});

router.post("/new", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const { performanceName, oscModuleList, blocks } = req.body;
  let error = "";
  if (blocks["bs"].length == 0) {
    error = "Project is Empty";
    return res.json({ error });
  } else if (performanceName == "") {
    return res.json({ error });
  } else {
    let content = JSON.stringify(blocks);
    const QUERY = `INSERT INTO performances(user,name,oscports,content) values('${user_id}','${performanceName}','${oscModuleList}','${content}')`;
    console.log(QUERY);
    if (database == "mysql") {
      connection.query(QUERY, (err, results) => {
        if (err) {
          return res.json({ error: err });
        } else {
          // const QUERY =
          //   SELECT_ALL_PERFORMANCES_QUERY +
          //   `WHERE performance_id = ${results.insertId}`;
          const QUERY =
            SELECT_ALL_PERFORMANCES_QUERY + `WHERE name = ${performanceName}`;
          connection.query(QUERY, (err, results) => {
            if (err) {
              return res.json({ error: err });
            } else {
              return res.json(results[0]);
            }
          });
        }
      });
    } else if (database == "sqlite") {
      connection.run(QUERY, [], function(err) {
        if (err) {
          return res.json({ error: err });
        } else {
          const QUERY =
            SELECT_ALL_PERFORMANCES_QUERY + `WHERE name = '${performanceName}'`;
          connection.all(QUERY, [], (err, results) => {
            if (err) {
              return res.json({ error: err });
            } else {
              return res.json(results[0]);
            }
          });
        }
      });
    }
  }
});

router.patch("/remove", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const performanceName = req.body.performanceName;
  console.log(performanceName);
  const DELETE_PERFORMANCE = `DELETE FROM performances WHERE user = '${user_id}' and name = '${performanceName}'`;
  // do the query case on the user
  const QUERY = DELETE_PERFORMANCE;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        return res.json({
          message: "Performance Removed successfully"
        });
      }
    });
  } else if (database == "sqlite") {
    connection.run(QUERY, [], function(err) {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        // ensure that performance is deleted!
        const QUERY =
          SELECT_ALL_PERFORMANCES_QUERY + `WHERE name = '${performanceName}'`;
        connection.all(QUERY, [], (err, results) => {
          if (err) {
            return res.json({ err: err });
          } else {
            if (results.length < 1) {
              return res.json({ message: "Performance Removed successfully" });
            } else {
              return res.json({ error: "performance not deleted" });
            }
          }
        });
      }
    });
  }
});

module.exports = router;
