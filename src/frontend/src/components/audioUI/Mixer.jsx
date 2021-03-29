import React from "react";
import { changeBlock, connectOrDisconnectBlock } from "./actions";
import { connect } from "react-redux";
import {
  getCssPropById,
  focusElementById,
  setCssPropById
} from "../../actions/common";

class Mixer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasMasterLRef = React.createRef();
    this.canvasMasterRRef = React.createRef();
    this.canvasGain0LRef = React.createRef();
    this.canvasGain0RRef = React.createRef();
    this.canvasGain1LRef = React.createRef();
    this.canvasGain1RRef = React.createRef();
    this.canvasGain2LRef = React.createRef();
    this.canvasGain2RRef = React.createRef();
    this.canvasGain3LRef = React.createRef();
    this.canvasGain3RRef = React.createRef();
    this.canvasGain4LRef = React.createRef();
    this.canvasGain4RRef = React.createRef();
    this.canvasGain5LRef = React.createRef();
    this.canvasGain5RRef = React.createRef();
    this.canvasGain6LRef = React.createRef();
    this.canvasGain6RRef = React.createRef();
    this.canvasGain7LRef = React.createRef();
    this.canvasGain7RRef = React.createRef();

    this.oldDb = -200;
  }

  componentDidMount = () => {
    this.rendererCML = setInterval(
      this.rendererMasterMeter.bind(this, this.canvasMasterLRef, 0),
      200
    );
    this.rendererCMR = setInterval(
      this.rendererMasterMeter.bind(this, this.canvasMasterRRef, 1),
      200
    );
    this.renderer0L = setInterval(
      this.rendererNode0Meter.bind(this, this.canvasGain0LRef, 0),
      200
    );
    this.renderer0R = setInterval(
      this.rendererNode0Meter.bind(this, this.canvasGain0RRef, 1),
      200
    );
    this.renderer1L = setInterval(
      this.rendererNode1Meter.bind(this, this.canvasGain1LRef, 0),
      200
    );
    this.renderer1R = setInterval(
      this.rendererNode1Meter.bind(this, this.canvasGain1RRef, 1),
      200
    );
    this.renderer2L = setInterval(
      this.rendererNode2Meter.bind(this, this.canvasGain2LRef, 0),
      200
    );
    this.renderer2R = setInterval(
      this.rendererNode2Meter.bind(this, this.canvasGain2RRef, 1),
      200
    );
    this.renderer3L = setInterval(
      this.rendererNode3Meter.bind(this, this.canvasGain3LRef, 0),
      200
    );
    this.renderer3R = setInterval(
      this.rendererNode3Meter.bind(this, this.canvasGain3RRef, 1),
      200
    );
    this.renderer4L = setInterval(
      this.rendererNode4Meter.bind(this, this.canvasGain4LRef, 0),
      200
    );
    this.renderer4R = setInterval(
      this.rendererNode4Meter.bind(this, this.canvasGain4RRef, 1),
      200
    );
    this.renderer5L = setInterval(
      this.rendererNode5Meter.bind(this, this.canvasGain5LRef, 0),
      200
    );
    this.renderer5R = setInterval(
      this.rendererNode5Meter.bind(this, this.canvasGain5RRef, 1),
      200
    );
    this.renderer6L = setInterval(
      this.rendererNode6Meter.bind(this, this.canvasGain6LRef, 0),
      200
    );
    this.renderer6R = setInterval(
      this.rendererNode6Meter.bind(this, this.canvasGain6RRef, 1),
      200
    );
    this.renderer7L = setInterval(
      this.rendererNode7Meter.bind(this, this.canvasGain7LRef, 0),
      200
    );
    this.renderer7R = setInterval(
      this.rendererNode7Meter.bind(this, this.canvasGain7RRef, 1),
      200
    );
  };

  rendererMasterMeter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    // console.log(this.canvasGainRefs);
    // let canvas = this.canvasMasterRef.current;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.rendererCML);
      clearInterval(this.rendererCMR);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getMasterAudioData()[c] * 4.65;
    let data = Math.max(x, -200);
    let scaledData = 200 + data;
    renderCtx.clearRect(0, 0, 15, 200);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 200 - scaledData, 15, scaledData);
  };

  rendererNode0Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer0L);
      clearInterval(this.renderer0R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode0AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    renderCtx.clearRect(0, 0, 15, 200);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode1Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer1L);
      clearInterval(this.renderer1R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode1AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode2Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer2L);
      clearInterval(this.renderer2R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode2AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode3Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer3L);
      clearInterval(this.renderer3R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode3AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    // console.log("scaledData is: ");
    // console.log(scaledData);
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode4Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer4L);
      clearInterval(this.renderer4R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode4AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode5Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer5L);
      clearInterval(this.renderer5R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode5AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    // console.log("scaledData is: ");
    // console.log(scaledData);
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode6Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer6L);
      clearInterval(this.renderer6R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode6AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    // console.log("scaledData is: ");
    // console.log(scaledData);
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  rendererNode7Meter = (ref, c) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer7L);
      clearInterval(this.renderer7R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode7AudioData()[c] * 1.82;

    let data = Math.max(x, -100);
    let scaledData = 100 + data;
    renderCtx.clearRect(0, 0, 15, 100);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;

    renderCtx.fillRect(0, 100 - scaledData, 15, scaledData);
  };

  setOpacity(inNode, port, opacity) {
    if (inNode[port] && inNode[port].length > 0) {
      let inId = inNode[port][1];
      var elem = document.getElementById(inId);
      elem.style.opacity = opacity;
    }
  }

  render = () => {
    // #region props
    let {
      id,
      name,
      inNode,
      masterGain,
      node0Gain,
      node1Gain,
      node2Gain,
      node3Gain,
      node4Gain,
      node5Gain,
      node6Gain,
      node7Gain,
      audioObj
    } = this.props.blockInfo;
    let changeBlock = this.props.changeBlock;
    let connectOrDisconnectBlock = this.props.connectOrDisconnectBlock;
    let backgroundColor = [];
    for (let i = 0; i < 8; i++) {
      if (inNode[i] && inNode[i].length > 0) {
        backgroundColor[i] = getCssPropById(inNode[i][1], "background-color");
      } else {
        backgroundColor[i] = "white";
      }
    }
    // #endregion
    return (
      <React.Fragment>
        <div style={{ position: "relative", height: "224px" }}>
          <div style={{ position: "absolute", left: "0rem" }}>
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {1}
              </span>
              <button
                id={"inButton" + 1}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[0]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 0, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 0, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 0, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[0]) {
                    focusElementById(inNode[0][0]);
                    setCssPropById({
                      id: inNode[0][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[0] && inNode[0].length > 0 ? inNode[0][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain0LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain0RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node0Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node0Gain}
                  id={"node0Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", left: "2.625rem" }}>
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {2}
              </span>
              <button
                id={"inButton" + 2}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[1]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 1, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 1, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 1, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[1]) {
                    focusElementById(inNode[1][0]);
                    setCssPropById({
                      id: inNode[1][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[1] && inNode[1].length > 0 ? inNode[1][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain1LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain1RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node1Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node1Gain}
                  id={"node1Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", left: "5.25rem" }}>
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {3}
              </span>
              <button
                id={"inButton" + 3}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[2]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 2, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 2, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 2, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[2]) {
                    focusElementById(inNode[2][0]);
                    setCssPropById({
                      id: inNode[2][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[2] && inNode[2].length > 0 ? inNode[2][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain2LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain2RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + 2 + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node2Gain}
                  id={"node" + 2 + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", left: "7.875rem" }}>
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {4}
              </span>
              <button
                id={"inButton" + 3}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[3]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 3, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 3, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 3, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[3]) {
                    focusElementById(inNode[3][0]);
                    setCssPropById({
                      id: inNode[3][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[3] && inNode[3].length > 0 ? inNode[3][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain3LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain3RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + 3 + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node3Gain}
                  id={"node" + 3 + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", top: "116px", left: "0rem" }}>
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {5}
              </span>
              <button
                id={"inButton" + 4}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[4]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 4, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 4, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 4, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[4]) {
                    focusElementById(inNode[4][0]);
                    setCssPropById({
                      id: inNode[4][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[4] && inNode[4].length > 0 ? inNode[4][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain4LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain4RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + 4 + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node4Gain}
                  id={"node" + 4 + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", top: "116px", left: "2.625rem" }}>
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {6}
              </span>
              <button
                id={"inButton" + 5}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[5]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 5, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 5, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 5, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[5]) {
                    focusElementById(inNode[5][0]);
                    setCssPropById({
                      id: inNode[5][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[5] && inNode[5].length > 0 ? inNode[5][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain5LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain5RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + 5 + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node5Gain}
                  id={"node" + 5 + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div
            style={{
              position: "absolute",
              top: "116px",
              left: "5.25rem"
            }}
          >
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {7}
              </span>
              <button
                id={"inButton" + 6}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[6]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 6, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 6, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 6, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[6]) {
                    focusElementById(inNode[6][0]);
                    setCssPropById({
                      id: inNode[6][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[6] && inNode[6].length > 0 ? inNode[6][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain6LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain6RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + 6 + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node6Gain}
                  id={"node" + 6 + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div
            style={{
              position: "absolute",
              top: "116px",
              left: "7.875rem"
            }}
          >
            <React.Fragment>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  fontSize: "0.64rem"
                }}
              >
                {8}
              </span>
              <button
                id={"inButton" + 7}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  fontSize: "0.64rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[7]
                }}
                onClick={() => {
                  connectOrDisconnectBlock(
                    "nowIn",
                    [name, 7, id, audioObj],
                    inNode
                  );
                }}
                onMouseEnter={() => {
                  this.setOpacity(inNode, 7, 0.5);
                }}
                onMouseLeave={() => {
                  this.setOpacity(inNode, 7, 1);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[7]) {
                    focusElementById(inNode[7][0]);
                    setCssPropById({
                      id: inNode[7][0],
                      prop: "boxShadow",
                      temp: true
                    });
                  }
                }}
              >
                {inNode[7] && inNode[7].length > 0 ? inNode[7][0] : "In"}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "7px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain7LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "8px",
                    left: "20px",
                    top: "24px",
                    minHeight: "80px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain7RRef} />
                </div>
                <input
                  className="slider text-center"
                  orient="vertical"
                  type="range"
                  style={{
                    width: "1rem",
                    height: "84px",
                    position: "absolute",
                    left: "32px",
                    top: "24px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + 7 + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node7Gain}
                  id={"node" + 7 + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>

          <div className="" style={{ position: "absolute", left: "176px" }}>
            <div className="">
              <div
                className="progress progress-bar-vertical"
                style={{
                  position: "absolute",
                  backgroundColor: "black",
                  height: "160px",
                  width: "7px",
                  left: "0px",
                  top: "30px"
                }}
              >
                <canvas height={200} ref={this.canvasMasterLRef}></canvas>
              </div>
              <div
                className="progress progress-bar-vertical"
                style={{
                  position: "absolute",
                  backgroundColor: "black",
                  height: "160px",
                  width: "7px",
                  left: "9px",
                  top: "30px"
                }}
              >
                <canvas height={200} ref={this.canvasMasterRRef}></canvas>
              </div>
              <input
                className="slider "
                orient="vertical"
                type="range"
                style={{
                  width: "1rem",
                  height: "160px",
                  position: "absolute",
                  left: "15px",
                  top: "29px"
                }}
                onChange={e => {
                  changeBlock(id, "masterGain", e.target.value);
                }}
                min={0}
                max={1}
                step={0.01}
                value={masterGain}
                id={"masterGain"}
              />
            </div>
          </div>
        </div>

        <div
          className="text-center"
          style={{ backgroundColor: "grey", height: "24px" }}
        >
          {!this.props.blockInfo.oscPort ? (
            <div>
              <label
                htmlFor="osc"
                style={{ fontSize: "0.64rem", marginBottom: "0" }}
              >
                OSC
              </label>
              <input
                type="checkbox"
                className="m-1"
                id="osc"
                onClick={() => this.props.changeBlock(id, "osc", undefined)}
              />
              <span className="col text-center">
                <label
                  htmlFor="oscPort"
                  style={{ fontSize: "0.64rem", marginBottom: "0" }}
                >
                  OSC port:
                </label>
                <input
                  type="text"
                  className=""
                  style={{
                    height: "1.2rem",
                    width: "2.4rem",
                    fontSize: "0.64rem"
                  }}
                  id="oscPort"
                  onChange={e =>
                    this.props.changeBlock(id, "oscPort", e.target.value)
                  }
                />
              </span>
            </div>
          ) : (
            <div>
              <span className="col text-center">
                <label
                  htmlFor="oscPort"
                  style={{ fontSize: "0.64rem", marginBottom: "0" }}
                >
                  {"osc port: " + this.props.blockInfo.oscPort}
                </label>
              </span>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };
}

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, {
  changeBlock,
  connectOrDisconnectBlock
})(Mixer);
