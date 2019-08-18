const express = require("express");
const router = express.Router();
const connection = require("../db");
const multer =  require('multer');
var cTimeStamp = new Date().getTime();

function updateTimeStamp(){
cTimeStamp = new Date().getTime();
}
const storage = multer.diskStorage({
  destination: './public/assets/sounds/',
  filename(req, file, cb) {
    cb(null, `${cTimeStamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

router.post('/upload', upload.single('file'), (req, res) => {
  const user_id = 71;
  const fileLocation = "/assets/sounds/"+cTimeStamp+"-"+req.file.originalname;
  updateTimeStamp();
  const QUERY = `insert into sounds(user,name,fileLocation) values(${user_id},'${req.file.originalname}','${fileLocation}')`;
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
