require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const ip = require("ip");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const sounds = require("./routes/sounds.js");
const projects = require("./routes/projects.js");
const presets = require("./routes/presets.js");
const oscRoute = require("./routes/osc.js");
var auth = require("./routes/auth.js");

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server);
const oscHelper = require("./oscHelper.js");

io.on("connection", socket => {
  socket.emit("openPort", oscHelper.getPortList());
  // console.log("New client connected");
  oscHelper.setName(socket);
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
app.use("/api/v1/osc", oscRoute);

app.get("/api", (req, res) => {
  res.send("Go to /sounds to see sounds, go to /projects to see projects ");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

server.on("error", err => {
  if (err.code == "EADDRINUSE") {
    console.log(
      `Failed to allocate server port ${PORT}.\nPerhaps you are already running a Soundcool server or some other process is using it.\n  - To quit, type return\n  - To start the soundcool server with a different port, type the port number`
    );
    readline.question(`Enter port number or return to quit:  `, portNumber => {
      readline.close();
      if (portNumber == "return") {
        console.log(`Exiting server`);
      } else {
        startServer(server, portNumber);
      }
    });
  } else {
    console.log(err);
  }
});

server.on("listening", function() {
  console.log(
    `Starting server, you can visit the server locally at http://localhost:${
      server.address().port
    } and remotely at http://${ip.address()}:${server.address().port}`
  );
});

function startServer(server, portNumber) {
  portNumber = Number.isInteger(portNumber)
    ? portNumber
    : parseInt(portNumber, 10);

  if (portNumber && portNumber >= 1023 && portNumber < 65536) {
    server.listen(portNumber, () => {});
  } else {
    console.log("Exiting Server\nWarning: Port should be >= 1023 and < 65536");
  }
}

startServer(server, PORT);
