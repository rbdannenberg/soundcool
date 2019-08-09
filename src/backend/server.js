const config = require("config");
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
app.use("/api/projects", projects);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static files from the React frontend app
app.use(
  express.static(path.join(__dirname, "../frontend/project-editor/build"))
);

app.listen(PORT);

if (app.get("env") === "development") {
}

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/sounds", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.get("/api", (req, res) => {
  res.send("Go to /sounds to see sounds, go to /projects to see projects ");
});

// for project-editor, send out the project app from project-editor
app.get("/project-editor*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/project-editor/build/index.html")
  );
});
