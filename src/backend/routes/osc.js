const express = require("express");
const router = express.Router();

const utils = require("../utils");
const dgram = require("dgram");
const oscHelper = require("../oscHelper.js");
const osc = require("osc-min");

router.post("/openPort", (req, res) => {
  let portNumber = req.body.portNumber;
  portNumber = Number.isInteger(portNumber) ? portNumber : parseInt(portNumber);
  if (portNumber < 1024) {
    res.json({ message: "Please use port number greater than 1023" });
  }
  if (initPort(portNumber)) res.json({ message: "Port opened successfully" });
  else res.json({ err: "Port is already open" });
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
              component: "Player",
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
              component: "Player",
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
              component: "Player",
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
              component: "Player",
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
              component: "Player",
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
              component: "Player",
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
              component: "Player",
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
    } else if (baseAddress == 2) {
      switch (buttonType) {
        case "fader1":
        case "fader2":
        case "fader3":
        case "fader4":
        case "fader5":
        case "fader6":
        case "fader7":
        case "fader8":
          if (socket) {
            socket.emit("oscData", {
              component: "Mixer",
              type: "playerVolume",
              value: [parseInt(buttonType.substring(5)), value],
              portNumber
            });
          }
          // console.log("playbackSpeed " + value);
          break;
        case "fader9":
          if (socket) {
            socket.emit("oscData", {
              component: "Mixer",
              type: "mainVolume",
              value,
              portNumber
            });
          }
          // console.log("seek " + value);
          break;
        default:
          console.log(buttonType + " not registered");
      }
    } else if (baseAddress == 4) {
      switch (buttonType) {
        case "fader1":
          if (socket) {
            socket.emit("oscData", {
              component: "SamplePlayer",
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
              component: "SamplePlayer",
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
              component: "SamplePlayer",
              type: "random",
              value,
              portNumber
            });
          }
          // console.log("Loop " + value);
          break;
        case "toggle2":
          if (socket) {
            socket.emit("oscData", {
              component: "SamplePlayer",
              type: "loop",
              value,
              portNumber
            });
          }
          // console.log("Loop " + value);
          break;
        case "push1":
        case "push2":
        case "push3":
        case "push4":
        case "push5":
        case "push6":
        case "push7":
        case "push8":
        case "push9":
        case "push10":
          if (socket) {
            socket.emit("oscData", {
              component: "SamplePlayer",
              type: "playPause",
              value: [parseInt(buttonType.substring(4)), value],
              portNumber
            });
          }
          // console.log("Play/Pause " + value);
          break;
        case "push11":
        case "push12":
        case "push13":
        case "push14":
        case "push15":
        case "push16":
        case "push17":
        case "push18":
        case "push19":
        case "push20":
          if (socket) {
            socket.emit("oscData", {
              component: "SamplePlayer",
              type: "stop",
              value: [parseInt(buttonType.substring(4)), value],
              portNumber
            });
          }
          // console.log("Stop " + value);
          break;
        case "push21":
          if (socket) {
            socket.emit("oscData", {
              component: "SamplePlayer",
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
