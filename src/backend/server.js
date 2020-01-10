require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const sounds = require("./routes/sounds.js");
const projects = require("./routes/projects.js");
const presets = require("./routes/presets.js");
var auth = require("./routes/auth.js");

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

const osc = require("osc-min"),
  dgram = require("dgram");

let sockett;
io.on("connection", socket => {
  // console.log("New client connected");
  sockett = socket;
  socket.on("disconnect", () => {
    // console.log("Client disconnected");
  });
});

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

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

var udp_server = dgram.createSocket("udp4", function(msg, rinfo) {
  var osc_message;
  try {
    osc_message = osc.fromBuffer(msg);
    const osc_message_splitted = osc_message.address.split("/");
    const baseAddress = osc_message_splitted[1];
    const buttonType = osc_message_splitted[2];
    const value = osc_message.args[0]["value"];

    if (baseAddress == 1) {
      switch (buttonType) {
        case "fader1":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "playbackSpeed", value });
          }
          // console.log("playbackSpeed " + value);
          break;
        case "fader2":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "seek", value });
          }
          // console.log("seek " + value);
          break;
        case "fader3":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "volume", value });
          }
          // console.log("volume " + value);
          break;
        case "toggle1":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "loop", value });
          }
          // console.log("Loop " + value);
          break;
        case "push1":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "playPause", value });
          }
          // console.log("Play/Pause " + value);
          break;
        case "push2":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "stop", value });
          }
          // console.log("Stop " + value);
          break;
        case "push3":
          if (sockett) {
            sockett.emit("oscData", {component:"player", type: "reverse", value });
          }
          // console.log("Reverse " + value);
          break;

        default:
          console.log(buttonType + " not registered");
      }
    }
  } catch (err) {
    console.log(err);
    return console.log("Could not decode OSC message");
  }
});

udp_server.bind(9998);
