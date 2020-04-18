const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connection = require("../db");
const multer = require("multer");
const utils = require("../utils");
var cTimeStamp = new Date().getTime();
var fs = require("fs");

const database = process.env.MYSQL_HOST ? "mysql" : "sqlite";

function updateTimeStamp() {
  cTimeStamp = new Date().getTime();
}

const storage = multer.diskStorage({
  destination: "./assets/presets/",
  filename(req, file, cb) {
    cb(null, `${cTimeStamp}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/load/:presetId", function(req, res) {
  const token = req.headers["x-auth-token"];
  const presetId = req.params.presetId;
  utils.verifyToken(token, user => {
    if (user) {
      const QUERY = `select location from presets where preset_id = ${presetId} and (user = ${user.id} or ISNULL(user));`;
      if (database == "mysql") {
        connection.query(QUERY, (err, results) => {
          if (err) {
            return res.json({ err: err });
          } else {
            if (results[0]) {
              var music = "." + results[0]["location"];
              var myArrayBuffer = fs.readFileSync(music, null);
              res.json(myArrayBuffer);
            } else {
              res.json({ message: "Invalid Preset Id" });
            }
          }
        });
      } else if (database == "sqlite") {
        connection.all(QUERY, [], (err, results) => {
          if (err) {
            return res.json({ err: err });
          } else {
            if (results[0]) {
              var music = "." + results[0]["location"];
              var myArrayBuffer = fs.readFileSync(music, null);
              res.json(myArrayBuffer);
            } else {
              res.json({ message: "Invalid Preset Id" });
            }
          }
        });
      }
    } else {
      return res.status(401).json({ message: "Token Not Valid" });
    }
  });
});

router.get("/get", function(req, res) {
  const token = req.headers["x-auth-token"];
  const presetId = req.params.presetId;
  utils.verifyToken(token, user => {
    if (user) {
      const QUERY = `select preset_id,user,name from presets where  user = ${user.id} or ISNULL(user);`;
      if (database == "mysql") {
        connection.query(QUERY, (err, results) => {
          if (err) {
            return res.json({ err: err });
          } else {
            res.json({ presets: results });
          }
        });
      } else if (database == "sqlite") {
        connection.all(QUERY, [], (err, results) => {
          if (err) {
            return res.json({ err: err });
          } else {
            res.json({ presets: results });
          }
        });
      }
    } else {
      return res.status(401).json({ message: "Token Not Valid" });
    }
  });
});

router.post("/upload", upload.single("file"), (req, res) => {
  const token = req.headers["x-auth-token"];
  const fileLocation =
    "/assets/presets/" + cTimeStamp + "-" + req.file.originalname;
  updateTimeStamp();
  utils.verifyToken(token, user => {
    if (user) {
      const QUERY = `insert into presets(user,name,location) values(${user.id},'${req.file.originalname}','${fileLocation}')`;
      if (database == "mysql") {
        connection.query(QUERY, (err, results) => {
          if (err) {
            return res.json({ err: err });
          } else {
            const presetId = results.insertId;
            return res.json({
              presetId: presetId,
              user: user.id,
              name: req.file.originalname
            });
          }
        });
      } else if (database == "sqlite") {
        connection.run(QUERY, [], function(err){
          if (err) {
            return res.json({ err: err });
          } else {
            const presetId = this.lastID;
            return res.json({
              presetId: presetId,
              user: user.id,
              name: req.file.originalname
            });
          }
        });
      }
    } else {
      return res.status(401).json({ message: "Token Not Valid" });
    }
  });
});

module.exports = router;
