require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const sounds = require("./routes/sounds.js");
const projects = require("./routes/projects.js");
const presets = require("./routes/presets.js");
var auth = require("./routes/auth.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
// static middleware, serve the static files and  render the index.html
app.use(express.static(__dirname + "/public"));
app.use(helmet());
app.use("/api/v1/sounds", sounds);
app.use("/api/v1/projects", projects);
app.use("/api/v1/presets", presets);
app.use("/api/v1/user", auth);

app.get("/api", (req, res) => {
  res.send("Go to /sounds to see sounds, go to /projects to see projects ");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

app.listen(PORT);
