import React from "react";
import { changeBlock, connectBlock } from "./actions";
import { connect } from "react-redux";
import { getCssPropById, focusElementById, setCssPropById } from "../../actions/common";

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
      this.rendererMasterMeter.bind(this, this.canvasMasterLRef),
      200
    );
    this.rendererCMR = setInterval(
      this.rendererMasterMeter.bind(this, this.canvasMasterRRef),
      200
    );
    this.renderer0L = setInterval(
      this.rendererNode0Meter.bind(this, this.canvasGain0LRef),
      200
    );
    this.renderer0R = setInterval(
      this.rendererNode0Meter.bind(this, this.canvasGain0RRef),
      200
    );
    this.renderer1L = setInterval(
      this.rendererNode1Meter.bind(this, this.canvasGain1LRef),
      200
    );
    this.renderer1R = setInterval(
      this.rendererNode1Meter.bind(this, this.canvasGain1RRef),
      200
    );
    this.renderer2L = setInterval(
      this.rendererNode2Meter.bind(this, this.canvasGain2LRef),
      200
    );
    this.renderer2R = setInterval(
      this.rendererNode2Meter.bind(this, this.canvasGain2RRef),
      200
    );
    this.renderer3L = setInterval(
      this.rendererNode3Meter.bind(this, this.canvasGain3LRef),
      200
    );
    this.renderer3R = setInterval(
      this.rendererNode3Meter.bind(this, this.canvasGain3RRef),
      200
    );
    this.renderer4L = setInterval(
      this.rendererNode4Meter.bind(this, this.canvasGain4LRef),
      200
    );
    this.renderer4R = setInterval(
      this.rendererNode4Meter.bind(this, this.canvasGain4RRef),
      200
    );
    this.renderer5L = setInterval(
      this.rendererNode5Meter.bind(this, this.canvasGain5LRef),
      200
    );
    this.renderer5R = setInterval(
      this.rendererNode5Meter.bind(this, this.canvasGain5RRef),
      200
    );
    this.renderer6L = setInterval(
      this.rendererNode6Meter.bind(this, this.canvasGain6LRef),
      200
    );
    this.renderer6R = setInterval(
      this.rendererNode6Meter.bind(this, this.canvasGain6RRef),
      200
    );
    this.renderer7L = setInterval(
      this.rendererNode7Meter.bind(this, this.canvasGain7LRef),
      200
    );
    this.renderer7R = setInterval(
      this.rendererNode7Meter.bind(this, this.canvasGain7RRef),
      200
    );
  };

  rendererMasterMeter = ref => {
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
    let x = audioObj.getMasterAudioData()[0] * 4.65;
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

  rendererNode0Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer0L);
      clearInterval(this.renderer0R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode0AudioData()[0] * 1.82;

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

  rendererNode1Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer1L);
      clearInterval(this.renderer1R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode1AudioData()[0] * 1.82;

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

  rendererNode2Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer2L);
      clearInterval(this.renderer2R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode2AudioData()[0] * 1.82;

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

  rendererNode3Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer3L);
      clearInterval(this.renderer3R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode3AudioData()[0] * 1.82;

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

  rendererNode4Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer4L);
      clearInterval(this.renderer4R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode4AudioData()[0] * 1.82;

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

  rendererNode5Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer5L);
      clearInterval(this.renderer5R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode5AudioData()[0] * 1.82;

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

  rendererNode6Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer6L);
      clearInterval(this.renderer6R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode6AudioData()[0] * 1.82;

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

  rendererNode7Meter = ref => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer7L);
      clearInterval(this.renderer7R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = audioObj.getNode7AudioData()[0] * 1.82;

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
    let connectBlock = this.props.connectBlock;
    let backgroundColor= [];
    for(let i = 0;i< 8;i++){
      if(inNode[i]){
        backgroundColor[i] =  getCssPropById(inNode[i][0], "background-color"); 
      }else{
        backgroundColor[i] = "white";
      }
    }
    // #endregion
    return (
      <React.Fragment>
        <div style={{ position: "relative", height: "280px" }}>
          <div style={{ position: "absolute", left: "10px" }}>
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{1}</span>
              <button
                id={"inButton" + 1}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[0]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 0, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[0]) {
                    focusElementById(inNode[0][0]);
                    setCssPropById({ id: inNode[0][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[0] === undefined ? "In" : inNode[0][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain0LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + "0" + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node0Gain}
                  id={"node" + "0" + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", left: "62px" }}>
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{2}</span>
              <button
                id={"inButton" + 2}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[1]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 1, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[1]) {
                    focusElementById(inNode[1][0]);
                    setCssPropById({ id: inNode[1][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[1] === undefined ? "In" : inNode[1][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain1LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
                  }}
                  onChange={e => {
                    changeBlock(id, "node" + "1" + "Gain", e.target.value);
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={node1Gain}
                  id={"node" + "1" + "Gain"}
                />
              </div>
            </React.Fragment>
          </div>
          <div style={{ position: "absolute", left: "114px" }}>
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{3}</span>
              <button
                id={"inButton" + 3}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[2]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 2, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[2]) {
                    focusElementById(inNode[2][0]);
                    setCssPropById({ id: inNode[2][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[2] === undefined ? "In" : inNode[2][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain2LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
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
          <div style={{ position: "absolute", left: "166px" }}>
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{3}</span>
              <button
                id={"inButton" + 3}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[3]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 3, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[3]) {
                    focusElementById(inNode[3][0]);
                    setCssPropById({ id: inNode[3][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[3] === undefined ? "In" : inNode[3][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain3LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
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
          <div style={{ position: "absolute", top: "140px", left: "10px" }}>
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{4}</span>
              <button
                id={"inButton" + 4}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[4]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 4, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[4]) {
                    focusElementById(inNode[4][0]);
                    setCssPropById({ id: inNode[4][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[4] === undefined ? "In" : inNode[4][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain4LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
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
          <div style={{ position: "absolute", top: "140px", left: "62px" }}>
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{5}</span>
              <button
                id={"inButton" + 5}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[5]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 5, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[5]) {
                    focusElementById(inNode[5][0]);
                    setCssPropById({ id: inNode[5][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[5] === undefined ? "In" : inNode[5][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain5LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
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
              top: "140px",
              left: "114px"
            }}
          >
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{6}</span>
              <button
                id={"inButton" + 6}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[6]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 6, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[6]) {
                    focusElementById(inNode[6][0]);
                    setCssPropById({ id: inNode[6][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[6] === undefined ? "In" : inNode[6][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain6LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
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
              top: "140px",
              left: "166px"
            }}
          >
            <React.Fragment>
              <span style={{ position: "absolute", left: "8px" }}>{7}</span>
              <button
                id={"inButton" + 7}
                className="btn btn-light btn-sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0px",
                  position: "absolute",
                  left: "20px",
                  border: "0px",
                  backgroundColor: backgroundColor[7]
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 7, id, audioObj]);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  if (inNode[7]) {
                    focusElementById(inNode[7][0]);
                    setCssPropById({ id: inNode[7][0], prop: "boxShadow", temp: true });
                  }
                }}
              >
                {inNode[7] === undefined ? "In" : inNode[7][0]}
              </button>
              <div className="">
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "7px",
                    top: "30px"
                  }}
                >
                  <canvas height="100" ref={this.canvasGain7LRef} />
                </div>
                <div
                  className="progress progress-bar-vertical"
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    left: "20px",
                    top: "30px"
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
                    height: "102px",
                    position: "absolute",
                    left: "32px",
                    top: "28px"
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

          <div className="" style={{ position: "absolute", left: "220px" }}>
            <div className="">
              <div
                className="progress progress-bar-vertical"
                style={{
                  position: "absolute",
                  backgroundColor: "black",
                  height: "200px",
                  width: "10px",
                  left: "7px",
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
                  height: "200px",
                  width: "10px",
                  left: "20px",
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
                  height: "200px",
                  position: "absolute",
                  left: "32px",
                  top: "28px"
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
          style={{ height: "30px", backgroundColor: "grey" }}
        >
          <div className="col-md-12">
            <label htmlFor="osc" style={{ fontSize: "0.8rem" }}>
              OSC port:
            </label>
            <input
              type="text"
              className="m-1"
              style={{ height: "1.5rem", width: "3rem" }}
              id="osc"
              onChange={e => changeBlock(id, "osc", e.target.value)}
            />
          </div>
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
export default connect(
  mapStateToProps,
  { changeBlock, connectBlock }
)(Mixer);
