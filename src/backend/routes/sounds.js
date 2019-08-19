const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connection = require("../db");
const multer = require("multer");
var cTimeStamp = new Date().getTime();
var fs = require("fs");

function updateTimeStamp() {
  cTimeStamp = new Date().getTime();
}
const storage = multer.diskStorage({
  destination: "./public/assets/sounds/",
  filename(req, file, cb) {
    cb(null, `${cTimeStamp}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const SELECT_ALL_SOUNDS_QUERY = "SELECT * FROM sounds ";

router.get("/get", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  // do the query case on the user
  const QUERY = user_id
    ? SELECT_ALL_SOUNDS_QUERY + `WHERE user = ${user_id}`
    : SELECT_ALL_SOUNDS_QUERY;
  connection.query(QUERY, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

router.post("/upload", upload.single("file"), (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  const fileLocation =
    "/assets/sounds/" + cTimeStamp + "-" + req.file.originalname;
  updateTimeStamp();
  const QUERY = `insert into sounds(user,name,fileLocation) values(${user_id},'${
    req.file.originalname
  }','${fileLocation}')`;
  connection.query(QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      const QUERY =
      SELECT_ALL_SOUNDS_QUERY + `WHERE sound_id = ${results.insertId}`;
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

router.post("/remove", upload.single("file"), (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  const { soundId, fileLocation } = req.body;
  fs.unlinkSync("./public" + fileLocation);
  const QUERY = `delete from sounds where user = ${user_id} and sound_id = ${soundId}`;
  connection.query(QUERY, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

module.exports = router;
