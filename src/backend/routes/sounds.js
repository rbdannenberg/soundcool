const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connection = require("../db");
const multer = require("multer");
var cTimeStamp = new Date().getTime();
var fs = require("fs");
const ytdl = require("ytdl-core");

const jwtToken = process.env.JWT_SECRET ? process.env.JWT_SECRET : "soundcool";
const database = process.env.MYSQL_HOST ? "mysql" : "sqlite";

function updateTimeStamp() {
  cTimeStamp = new Date().getTime();
}
const storage = multer.diskStorage({
  destination: "./uploads/sounds/",
  filename(req, file, cb) {
    cb(null, `${cTimeStamp}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/get", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  // do the query case on the user
  let QUERY = `select sound_id,user,name,type from sounds WHERE user = ${user_id}`;
  let shared = false;
  if (database == "mysql") {
    connection.query(QUERY, (err, audios) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        let QUERY = `select * from audioSharing where user_id=${user_id}`;
        connection.query(QUERY, (err, sharing) => {
          if (err) {
            console.log(err);
            return res.json({ err: err });
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
  } else if (database == "sqlite") {
    connection.all(QUERY, [], (err, audios) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        let QUERY = `select * from audioSharing where user_id=${user_id}`;
        connection.all(QUERY, [], (err, sharing) => {
          if (err) {
            console.log(err);
            return res.json({ err: err });
          } else {
            if (!sharing[0]) {
              let QUERY = `insert into audioSharing values(${user_id},false)`;
              connection.run(QUERY);
            } else {
              shared = sharing[0]["sharing"];
            }
            return res.json({ audios: audios, sharing: shared });
          }
        });
      }
    });
  }
});

router.post("/upload", upload.single("file"), (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const fileLocation =
    "/uploads/sounds/" + cTimeStamp + "-" + req.file.originalname;
  updateTimeStamp();
  const QUERY = `insert into sounds(user,name,type,fileLocation) values(${user_id},'${req.file.originalname}','upload','${fileLocation}')`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        return res.json({ err: err });
      } else {
        const soundId = results.insertId;
        return res.json({
          sound_id: soundId,
          user: user_id,
          name: req.file.originalname
        });
      }
    });
  } else if (database == "sqlite") {
    connection.run(QUERY, [], function(err) {
      if (err) {
        return res.json({ err: err });
      } else {
        const soundId = this.lastID;
        return res.json({
          sound_id: soundId,
          user: user_id,
          name: req.file.originalname
        });
      }
    });
  }
});

router.post("/remove", upload.single("file"), (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const { soundId } = req.body;
  const QUERY = `select fileLocation from sounds where sound_id = ${soundId}`;
  if (database == "mysql") {
    connection.query(QUERY, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        const QUERY = `delete from sounds where user = ${user_id} and sound_id = ${soundId}`;
        connection.query(QUERY, (err, results) => {
          if (err) {
            console.log(err);
            return res.json({ err: err });
          } else {
            let filePath = "." + result[0]["fileLocation"];
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            return res.json({
              message: "Media Removed successfully"
            });
          }
        });
      }
    });
  } else if (database == "sqlite") {
    connection.all(QUERY, [], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        const QUERY = `delete from sounds where user = ${user_id} and sound_id = ${soundId}`;
        connection.run(QUERY, [], function(err) {
          if (err) {
            console.log(err);
            return res.json({ err: err });
          } else {
            let filePath = "." + result[0]["fileLocation"];
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            return res.json({
              message: "Media Removed successfully"
            });
          }
        });
      }
    });
  }
});

router.post("/addSoundLink", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const fileLocation = req.body["audioLink"];
  const QUERY = `insert into sounds(user,name,type,fileLocation) values(${user_id},'Sound Link','Sound Link','${fileLocation}')`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        return res.json({ err: err });
      } else {
        const soundId = results.insertId;
        return res.json({
          sound_id: soundId,
          user: user_id,
          name: "Sound Link",
          type: "Sound Link"
        });
      }
    });
  } else if (database == "sqlite") {
    connection.run(QUERY, [], function(err) {
      if (err) {
        return res.json({ err: err });
      } else {
        const soundId = this.lastID;
        return res.json({
          sound_id: soundId,
          user: user_id,
          name: "Sound Link",
          type: "Sound Link"
        });
      }
    });
  }
});

router.post("/addYoutubeLink", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const fileLocation = req.body["youtubeLink"];
  const name = req.body["name"]?req.body["name"]:"Youtube";
  const QUERY = `insert into sounds(user,name,type,fileLocation) values(${user_id},'${name}','Youtube','${fileLocation}')`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        return res.json({ err: err });
      } else {
        const soundId = results.insertId;
        return res.json({
          sound_id: soundId,
          user: user_id,
          name: name,
          type: "Youtube"
        });
      }
    });
  } else if (database == "sqlite") {
    connection.run(QUERY, [], function(err) {
      if (err) {
        return res.json({ err: err });
      } else {
        const soundId = this.lastID;
        return res.json({
          sound_id: soundId,
          user: user_id,
          name: name,
          type: "Youtube"
        });
      }
    });
  }
});

router.post("/toggleAudioSharing", (req, res) => {
  var user = jwt.verify(req.headers["x-auth-token"], jwtToken);
  const user_id = user.id;
  const { sharing } = req.body;
  const QUERY = `UPDATE audioSharing SET sharing= ${sharing} where user_id=${user_id}`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        return res.json({
          data: "Audio Sharing Updated Successfully",
          sharing: sharing
        });
      }
    });
  } else if (database == "sqlite") {
    connection.run(QUERY, [], function(err) {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        return res.json({
          data: "Audio Sharing Updated Successfully",
          sharing: sharing
        });
      }
    });
  }
});

router.get("/getAudio/:audioId/:token", function(req, res) {
  var audioId = req.params.audioId;
  var user = jwt.verify(req.params.token, jwtToken);

  const QUERY = `select fileLocation from sounds where sound_id= ${audioId};`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        console.log({
          location: results[0]["fileLocation"]
        });
        res.json({
          location: results[0]["fileLocation"]
        });
      }
    });
  } else if (database == "sqlite") {
    connection.all(QUERY, [], (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        console.log({
          location: results[0]["fileLocation"]
        });
        res.json({
          location: results[0]["fileLocation"]
        });
      }
    });
  }
});

router.get("/youtubeAudio/:audioId/:token", function(req, res) {
  var audioId = req.params.audioId;

  const QUERY = `select fileLocation from sounds where sound_id= ${audioId};`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        var requestUrl = results[0]["fileLocation"];
        try {
          res.header({
            "Content-Type": "audio/mpeg"
          });
          ytdl(requestUrl, {
            filter: format => format.container === "mp4"
          }).pipe(res);
        } catch (exception) {
          res.status(500).send(exception);
        }
      }
    });
  } else if (database == "sqlite") {
    connection.all(QUERY, [], (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        var requestUrl = results[0]["fileLocation"];
        try {
          res.header({
            "Content-Type": "audio/mpeg"
          });
          ytdl(requestUrl, {
            filter: format => format.container === "mp4"
          }).pipe(res);
        } catch (exception) {
          res.status(500).send(exception);
        }
      }
    });
  }
});

router.get("/serveAudio/:audioId/:token", function(req, res) {
  var audioId = req.params.audioId;

  const QUERY = `select fileLocation from sounds where sound_id= ${audioId};`;
  if (database == "mysql") {
    connection.query(QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        var music = "." + results[0]["fileLocation"];

        var stat = fs.statSync(music);
        range = req.headers.range;
        var readStream;

        if (range !== undefined) {
          var parts = range.replace(/bytes=/, "").split("-");

          var partial_start = parts[0];
          var partial_end = parts[1];

          if (
            (isNaN(partial_start) && partial_start.length > 1) ||
            (isNaN(partial_end) && partial_end.length > 1)
          ) {
            return res.sendStatus(500);
          }

          var start = parseInt(partial_start, 10);
          var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
          var content_length = end - start + 1;

          res.status(206).header({
            "Content-Type": "audio/mpeg",
            "Content-Length": content_length,
            "Content-Range": "bytes " + start + "-" + end + "/" + stat.size
          });

          readStream = fs.createReadStream(music, {
            start: start,
            end: end
          });
        } else {
          res.header({
            "Content-Type": "audio/mpeg",
            "Content-Length": stat.size
          });
          readStream = fs.createReadStream(music);
        }
        readStream.pipe(res);
      }
    });
  } else if (database == "sqlite") {
    connection.all(QUERY, [], (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ err: err });
      } else {
        var music = "." + results[0]["fileLocation"];

        var stat = fs.statSync(music);
        range = req.headers.range;
        var readStream;

        if (range !== undefined) {
          var parts = range.replace(/bytes=/, "").split("-");

          var partial_start = parts[0];
          var partial_end = parts[1];

          if (
            (isNaN(partial_start) && partial_start.length > 1) ||
            (isNaN(partial_end) && partial_end.length > 1)
          ) {
            return res.sendStatus(500);
          }

          var start = parseInt(partial_start, 10);
          var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
          var content_length = end - start + 1;

          res.status(206).header({
            "Content-Type": "audio/mpeg",
            "Content-Length": content_length,
            "Content-Range": "bytes " + start + "-" + end + "/" + stat.size
          });

          readStream = fs.createReadStream(music, {
            start: start,
            end: end
          });
        } else {
          res.header({
            "Content-Type": "audio/mpeg",
            "Content-Length": stat.size
          });
          readStream = fs.createReadStream(music);
        }
        readStream.pipe(res);
      }
    });
  }
});

function serveAudio(err, results, audioId) {}

module.exports = router;
