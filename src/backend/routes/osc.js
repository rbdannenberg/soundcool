const express = require("express");
const router = express.Router();

const utils = require("../utils");
const dgram = require("dgram");
const oscHelper = require("../oscHelper.js");
const osc = require("osc-min");

router.post("/openPort", (req, res) => {
  let portNumber = req.body.portNumber;
  portNumber = Number.isInteger(portNumber) ? portNumber : parseInt(portNumber);
  if (portNumber < 2000) {
    res.json({ message: "Please use port number greater than 2000" });
  }
  if (initPort(portNumber)) res.json({ message: "Port opened successfully" });
  else res.json({ err: "Port already in use" });
});

module.exports = router;

function initPort(portNumber) {
  let portInUse = oscHelper.getPortList();
  if (portInUse.indexOf(portNumber) === -1) {
    oscHelper.addPort(portNumber);
    var udp_server = dgram.createSocket("udp4", function(msg, rinfo) {
      sendMessage(msg, oscHelper.getName(), portNumber);
    });
    udp_server.bind(portNumber);
    console.log("port opened: " + portNumber);
    return true;
  } else return false;
}

function sendMessage(msg, socket, portNumber) {
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
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "playbackSpeed",
              value,
              portNumber
            });
          }
          // console.log("playbackSpeed " + value);
          break;
        case "fader2":
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "seek",
              value,
              portNumber
            });
          }
          // console.log("seek " + value);
          break;
        case "fader3":
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "volume",
              value,
              portNumber
            });
          }
          // console.log("volume " + value);
          break;
        case "toggle1":
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "loop",
              value,
              portNumber
            });
          }
          // console.log("Loop " + value);
          break;
        case "push1":
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "playPause",
              value,
              portNumber
            });
          }
          // console.log("Play/Pause " + value);
          break;
        case "push2":
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "stop",
              value,
              portNumber
            });
          }
          // console.log("Stop " + value);
          break;
        case "push3":
          if (socket) {
            socket.emit("oscData", {
              component: "player",
              type: "reverse",
              value,
              portNumber
            });
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
}
