const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const connection = require("../db");

const SELECT_ALL_PROJECTS_QUERY = "SELECT * FROM projects ";
const UPDATE_PROJECT_CONTENT = "UPDATE projects SET content = ";

exports.getProject = router.get("/", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
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

exports.update = router.patch("/", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  const { content, projectId } = req.body;
  const UPDATE_PROJECT_CONTENT = `UPDATE projects SET content = '${content}' WHERE user = ${user_id} and project_id = ${projectId}`;
  // do the query case on the user
  const QUERY = UPDATE_PROJECT_CONTENT;
  connection.query(QUERY, (err, results) => {
    if (err) {
      console.log("come to error");
      return res.send(err);
    } else {
      return res.json({
        message: "Project Updated successfully"
      });
    }
  });
});

exports.new = router.post("/", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  const { projectName, projectDescription, content } = req.body;
  const CREATE_NEW_PROJECT = `INSERT INTO projects(user,name,description,content) values(${user_id},${projectName},${projectDescription},'${content}')`;
  // do the query case on the user
  const QUERY = CREATE_NEW_PROJECT;
  connection.query(QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      const QUERY =
        SELECT_ALL_PROJECTS_QUERY + `WHERE project_id = ${results.insertId}`;
      connection.query(QUERY, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json(results[0]);
        }
      });
    }
  });
});
