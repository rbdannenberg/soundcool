import React from "react";
import { changeBlock, connectBlock } from "./actions";
import { connect } from "react-redux";

const Channel = ({
  num,
  name,
  id,
  inNode,
  volume,
  audioObj,
  changeBlock,
  connectBlock,
  canvasRef
}) => {
  return (
    <React.Fragment
    // style={{ position: "absolute", width: "40px", height: "120px" }}
    >
      <span style={{ position: "absolute", left: "8px" }}>{num}</span>
      <button
        id={"inButton" + num}
        className="btn btn-light btn-sm"
        style={{
          width: "1.5rem",
          height: "1.5rem",
          fontSize: "0.8rem",
          padding: "0px",
          position: "absolute",
          left: "20px"
        }}
        onClick={() => {
          // dispatch({
          //   type: "CONNECTING_BLOCK",
          //   node: "nowIn",
          //   value: [name, num - 1, id, audioObj]
          // });
          // console.log(connectBlock);
          connectBlock("nowIn", [name, num - 1, id, audioObj]);
        }}
      >
        {inNode[num - 1] === undefined ? "In" : inNode[num - 1][0]}
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
          <canvas ref={canvasRef} />
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
          <canvas height="200" ref={canvasRef} />
          {/* <div
            className="progress-bar "
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: "60%", backgroundColor: "green" }}
          /> */}
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
            changeBlock(id, "node" + (num - 1) + "Gain", e.target.value);
          }}
          min={0}
          max={100}
          step={1}
          value={volume}
          id={"node" + (num - 1) + "Gain"}
        />
      </div>
    </React.Fragment>
  );
};

class Mixer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasMasterLRef = React.createRef();
    this.canvasMasterRRef = React.createRef();
    this.canvasGain0LRef = React.createRef();
    this.canvasGain0RRef = React.createRef();
    // this.canvasGain1LRef = React.createRef();
    // this.canvasGain1RRef = React.createRef();
    // this.canvasGain2LRef = React.createRef();
    // this.canvasGain2RRef = React.createRef();
    // this.canvasGain3LRef = React.createRef();
    // this.canvasGain3RRef = React.createRef();
    // this.canvasGain4LRef = React.createRef();
    // this.canvasGain4RRef = React.createRef();
    // this.canvasGain5LRef = React.createRef();
    // this.canvasGain5RRef = React.createRef();
    // this.canvasGain6LRef = React.createRef();
    // this.canvasGain6RRef = React.createRef();
    // this.canvasGain7LRef = React.createRef();
    // this.canvasGain7RRef = React.createRef();

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
      this.rendererNodeLMeter.bind(this, this.canvasGain0LRef, 0),
      200
    );
    this.renderer0R = setInterval(
      this.rendererNodeRMeter.bind(this, this.canvasGain0RRef, 0),
      200
    );
    this.renderer1L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain1LRef, 1),
      200
    );
    this.renderer1R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain1RRef, 1),
      200
    );
    this.renderer2L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain2LRef, 2),
      200
    );
    this.renderer2R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain2RRef, 2),
      200
    );
    this.renderer3L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain3LRef, 3),
      200
    );
    this.renderer3R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain3RRef, 3),
      200
    );
    this.renderer4L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain4LRef, 4),
      200
    );
    this.renderer4R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain4RRef, 4),
      200
    );
    this.renderer5L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain5LRef, 5),
      200
    );
    this.renderer5R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain5RRef, 5),
      200
    );
    this.renderer6L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain6LRef, 6),
      200
    );
    this.renderer6R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain6RRef, 6),
      200
    );
    this.renderer7L = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain7LRef, 7),
      200
    );
    this.renderer7R = setInterval(
      this.rendererNodeLMeter.bind(this, this.canvasGain7RRef, 7),
      200
    );
  };

  rendererMasterMeter = ref => {
    console.log("hello");
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
    let x = audioObj.getMasterAudioData()[0];
    let data = Math.max(this.oldDb - 7, x, -200);
    let scaledData = 200 + data;
    renderCtx.clearRect(0, 50, 0, 200);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 200 - scaledData, 15, scaledData);
  };

  rendererNodeLMeter = (ref, node) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer0L);
      clearInterval(this.renderer1L);
      clearInterval(this.renderer2L);
      clearInterval(this.renderer3L);
      clearInterval(this.renderer4L);
      clearInterval(this.renderer5L);
      clearInterval(this.renderer6L);
      clearInterval(this.renderer7L);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = 0;
    switch (node) {
      case 0:
        x = audioObj.getNode0AudioData()[0];
        break;
      case 1:
        x = audioObj.getNode1AudioData()[0];
        break;
      case 2:
        x = audioObj.getNode2AudioData()[0];
        break;
      case 3:
        x = audioObj.getNode3AudioData()[0];
        break;
      case 4:
        x = audioObj.getNode4AudioData()[0];
        break;
      case 5:
        x = audioObj.getNode5AudioData()[0];
        break;
      case 6:
        x = audioObj.getNode6AudioData()[0];
        break;
      case 7:
        x = audioObj.getNode7AudioData()[0];
        break;

      default:
        break;
    }

    let data = Math.max(x, -200);
    let scaledData = 100 + data;
    console.log("scaledData is: ");
    console.log(scaledData);
    renderCtx.clearRect(0, 50, 0, 200);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    console.log("fillRect properties: x1: ");
    console.log(0);
    console.log("fillRect properties: y1: ");
    console.log(200 - scaledData);
    console.log("fillRect properties: x2: ");
    console.log(15);
    console.log("fillRect properties: y2: ");
    console.log(scaledData);
    renderCtx.fillRect(0, 200 - scaledData, 15, scaledData);
  };

  rendererNodeRMeter = (ref, node) => {
    let { audioObj } = this.props.blockInfo;
    let canvas = ref.current;
    if (canvas === null) {
      clearInterval(this.renderer0R);
      clearInterval(this.renderer1R);
      clearInterval(this.renderer2R);
      clearInterval(this.renderer3R);
      clearInterval(this.renderer4R);
      clearInterval(this.renderer5R);
      clearInterval(this.renderer6R);
      clearInterval(this.renderer7R);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let x = 0;
    switch (node) {
      case 0:
        x = audioObj.getNode0AudioData()[0];
        break;
      case 1:
        x = audioObj.getNode1AudioData()[0];
        break;
      case 2:
        x = audioObj.getNode2AudioData()[0];
        break;
      case 3:
        x = audioObj.getNode3AudioData()[0];
        break;
      case 4:
        x = audioObj.getNode4AudioData()[0];
        break;
      case 5:
        x = audioObj.getNode5AudioData()[0];
        break;
      case 6:
        x = audioObj.getNode6AudioData()[0];
        break;
      case 7:
        x = audioObj.getNode7AudioData()[0];
        break;

      default:
        break;
    }

    let data = Math.max(x, -200);
    let scaledData = 100 + data;
    console.log("scaledData is: ");
    console.log(scaledData);
    renderCtx.clearRect(0, 50, 0, 200);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
    console.log("fillRect properties: x1: ");
    console.log(0);
    console.log("fillRect properties: y1: ");
    console.log(200 - scaledData);
    console.log("fillRect properties: x2: ");
    console.log(15);
    console.log("fillRect properties: y2: ");
    console.log(scaledData);
    renderCtx.fillRect(0, 200 - scaledData, 15, scaledData);
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
    // #endregion
    return (
      <React.Fragment>
        <div style={{ position: "relative", height: "280px" }}>
          <div style={{ position: "absolute", left: "10px" }}>
            {/* <Channel
              num={1}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node0Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain0Ref}
            /> */}
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 0, id, audioObj]);
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
                  <canvas height="200" ref={this.canvasGain0LRef} />
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
                  <canvas height="200" ref={this.canvasGain0RRef} />
                  {/* <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "60%", backgroundColor: "green" }}
                  /> */}
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 1, id, audioObj]);
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
                  <canvas ref={this.canvasGain1Ref} />
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
                  <canvas height="200" ref={this.canvasGain1Ref} />
                  {/* <div
                    className="progress-bar "
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "60%", backgroundColor: "green" }}
                  /> */}
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 2, id, audioObj]);
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
                  <canvas ref={this.canvasGain2Ref} />
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
                  <canvas height="200" ref={this.canvasGain2Ref} />
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 3, id, audioObj]);
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
                  <canvas ref={this.canvasGain3Ref} />
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
                  <canvas height="200" ref={this.canvasGain3Ref} />
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 4, id, audioObj]);
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
                  <canvas ref={this.canvasGain4Ref} />
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
                  <canvas height="200" ref={this.canvasGain4Ref} />
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 5, id, audioObj]);
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
                  <canvas ref={this.canvasGain5Ref} />
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
                  <canvas height="200" ref={this.canvasGain5Ref} />
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 6, id, audioObj]);
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
                  <canvas ref={this.canvasGain6Ref} />
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
                  <canvas height="200" ref={this.canvasGain6Ref} />
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
                  left: "20px"
                }}
                onClick={() => {
                  connectBlock("nowIn", [name, 7, id, audioObj]);
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
                  <canvas ref={this.canvasGain7Ref} />
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
                  <canvas height="200" ref={this.canvasGain7Ref} />
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
                max={100}
                step={1}
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
