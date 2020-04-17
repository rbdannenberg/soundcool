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
      connection.run(
        "CREATE TABLE users(user_id integer,name text, password text, email text)"
      ).run(`INSERT INTO users
              VALUES(100,'User 1','$2b$10$zoD.V4IYLhWmwz5Kld3gAu/jhYsPZYDYAWamQToQeC4tenQ1p1wwS','user1@welcome.com'),
              (101,'User 2','$2b$10$9nG9wvklANoTJIlO.WBrzu0wh6oTHHjh8hviJQ0pj7eEcY3aN4mMC','user2@welcome.com')`);
    });
  }
  module.exports = connection;
}
