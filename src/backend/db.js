if (process.env.MYSQL_HOST) {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });

  connection.connect(err => {
    if (err) {
      console.log("connection error");
      console.log(err);
      return err;
    }
  });

  module.exports = connection;
} else {
  const sqlite3 = require("sqlite3").verbose();
  const fs = require("fs");

  const path = "./soundcool.db";
  let firstTime = false;
  try {
    if (!fs.existsSync(path)) {
      firstTime = true;
    }
  } catch (err) {
    console.error(err);
  }
  let connection = new sqlite3.Database("soundcool.db", err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  });

  if (firstTime) {
    connection.serialize(() => {
      connection
        .run(
          "CREATE TABLE users(user_id integer PRIMARY KEY AUTOINCREMENT,name text NOT NULL, password text, email text)"
        )
        .run(
          `INSERT INTO users
              VALUES(100,'User 1','$2b$10$zoD.V4IYLhWmwz5Kld3gAu/jhYsPZYDYAWamQToQeC4tenQ1p1wwS','user1@welcome.com'),
              (101,'User 2','$2b$10$9nG9wvklANoTJIlO.WBrzu0wh6oTHHjh8hviJQ0pj7eEcY3aN4mMC','user2@welcome.com')`
        )
        .run(
          "CREATE TABLE audioSharing(user_id integer PRIMARY KEY,sharing BOOLEAN default 0)"
        )
        .run(
          "CREATE TABLE presets(preset_id integer PRIMARY KEY AUTOINCREMENT, user integer,name text, location text, created_date DATETIME DEFAULT CURRENT_TIMESTAMP)"
        )
        .run(
          "CREATE TABLE projects(project_id integer PRIMARY KEY AUTOINCREMENT, user integer, name text NOT NULL, created_date DATETIME DEFAULT CURRENT_TIMESTAMP ,description text NOT NULL, content text, sharedUsers text, isPublic BOOLEAN default 0 )"
        )
        .run(
          "CREATE TABLE sounds(sound_id integer PRIMARY KEY AUTOINCREMENT, user integer, name text, fileLocation text, created_date DATETIME DEFAULT CURRENT_TIMESTAMP ,type text)"
        );
    });
  }
  module.exports = connection;
}
