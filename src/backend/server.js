require('dotenv').config()
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

// get the mysql connection from db file
const connection = require("./db");
const sounds = require("./routes/sounds.js");
const projects = require("./routes/projects.js");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");

const PORT = process.env.PORT || 5000;
const app = express();

// a middleware function, that checks json objects in request body
// then set the req.body
app.use(express.json());
app.use(cors());
// static middleware, serve the static files and  render the index.html
app.use(express.static(__dirname + "/public"));
app.use(helmet());
app.use("/api/sounds", sounds);
app.use("/api/v1/projects/get", projects.getProject);
app.use("/api/v1/projects/updateContent", projects.updateContent);
app.use("/api/users", users);
app.use("/api/v1/users/sign_in", auth);


if (app.get("env") === "development") {
}

app.get("/api", (req, res) => {
  res.send("Go to /sounds to see sounds, go to /projects to see projects ");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.listen(PORT);