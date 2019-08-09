const mysql = require("mysql");

// TODO: all of them should be environment variable and
// should be inside and .env file that's not being distributed!
// it's very dangerous to expose all these informations here!
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "5WA8C1XE",
  database: "soundcool"
});

connection.connect(err => {
  if (err) {
    console.log("connection error");
    console.log(err);
    return err;
  }
});

module.exports = connection;
