console.log(process.env.MYSQL_HOST);
if (process.env.MYSQL_HOST) {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  });

  connection.connect(err => {
    console.log('connected')
    if (err) {
      console.log("connection error");
      console.log(err);
      return err;
    }
  });

  module.exports = connection;
} else {
  const sqlite3 = require("sqlite3").verbose();

  let connection = new sqlite3.Database("soundcool.db", err => {
    if (err) {
      return console.error(err.message);
    }
  });

  connection.serialize(() => {
    connection
      .run(
        "CREATE TABLE IF NOT EXISTS users(user_id integer PRIMARY KEY AUTOINCREMENT,name text NOT NULL, password text, email text)"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS audioSharing(user_id integer PRIMARY KEY,sharing BOOLEAN default 0)"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS presets(preset_id integer PRIMARY KEY AUTOINCREMENT, user integer,name text, location text, created_date DATETIME DEFAULT CURRENT_TIMESTAMP)"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS projects(project_id integer PRIMARY KEY AUTOINCREMENT, user integer, name text NOT NULL, created_date DATETIME DEFAULT CURRENT_TIMESTAMP ,description text NOT NULL, content text, sharedUsers text, isPublic BOOLEAN default 0 )"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS performances(performance_id integer PRIMARY KEY AUTOINCREMENT, user integer, name text NOT NULL, created_date DATETIME DEFAULT CURRENT_TIMESTAMP , oscports text NOT NULL, content text, sharedUsers text, isPublic BOOLEAN default 0 )"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS sounds(sound_id integer PRIMARY KEY AUTOINCREMENT, user integer, name text, fileLocation text, created_date DATETIME DEFAULT CURRENT_TIMESTAMP ,type text)"
      );
  });
  module.exports = connection;
}
