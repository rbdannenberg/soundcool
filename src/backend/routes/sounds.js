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
    cb(null, `${cTimeStamp}::-::${file.originalname}`);
  }
});

const upload = multer({ storage });

const SELECT_ALL_SOUNDS_QUERY = "SELECT * FROM sounds ";

router.get("/get", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  // do the query case on the user
  let QUERY = SELECT_ALL_SOUNDS_QUERY + ` WHERE user = ${user_id}`;
  let shared = false;
  connection.query(QUERY, (err, audios) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      let QUERY = `select * from audioSharing where user_id=${user_id}`;
      connection.query(QUERY, (err, sharing) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          if (!sharing[0]) {
            let QUERY = `insert into audioSharing values(${user_id},false)`;
            connection.query(QUERY, (err, sharing) => {});
          } else {
            shared = sharing[0]["sharing"];
          }
          return res.json({ audios: audios, sharing: shared });
        }
      });
    }
  });
});

router.post("/upload", upload.single("file"), (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  const fileLocation =
    "/assets/sounds/" + cTimeStamp + "::-::" + req.file.originalname;
  updateTimeStamp();
  const QUERY = `insert into sounds(user,name,fileLocation) values(${user_id},'${req.file.originalname}','${fileLocation}')`;
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

router.post("/toggleAudioSharing", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const user_id = user.id;
  const { sharing } = req.body;
  const QUERY = `UPDATE audioSharing SET sharing= ${sharing} where user_id=${user_id}`;
  connection.query(QUERY, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      return res.json({
        data: "Audio Sharing Updated Successfully",
        sharing: sharing
      });
    }
  });
});

router.post("/permission", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], "jwtPrivateKey");
  const sUser = req.body.user;
  if (sUser == user.id)
    return res.json({
      sharing: true
    });
  const QUERY = `select sharing from audioSharing where user_id=${sUser}`;
  connection.query(QUERY, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      return res.json({
        sharing: results[0]["sharing"]
      });
    }
  });
});

module.exports = router;
