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
    this.canvasGain0Ref = React.createRef();
    this.canvasGain1Ref = React.createRef();
    this.canvasGain2Ref = React.createRef();
    this.canvasGain3Ref = React.createRef();
    this.canvasGain4Ref = React.createRef();
    this.canvasGain5Ref = React.createRef();
    this.canvasGain6Ref = React.createRef();
    this.canvasGain7Ref = React.createRef();
    this.canvasGainRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef()
    ];
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
    console.log(scaledData);
    renderCtx.clearRect(0, 50, 0, 200);

    var grd = renderCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.1, "yellow");
    grd.addColorStop(1, "green");

    renderCtx.fillStyle = grd;
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
            <Channel
              num={1}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node0Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain0Ref}
            />
          </div>
          <div style={{ position: "absolute", left: "62px" }}>
            <Channel
              num={2}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node1Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain1Ref}
            />
          </div>
          <div style={{ position: "absolute", left: "114px" }}>
            <Channel
              num={3}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node2Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain2Ref}
            />
          </div>
          <div style={{ position: "absolute", left: "166px" }}>
            <Channel
              num={4}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node3Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain3Ref}
            />
          </div>
          <div style={{ position: "absolute", top: "140px", left: "10px" }}>
            <Channel
              num={5}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node4Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain4Ref}
            />
          </div>
          <div style={{ position: "absolute", top: "140px", left: "62px" }}>
            <Channel
              num={6}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node5Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain5Ref}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "140px",
              left: "114px"
            }}
          >
            <Channel
              num={7}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node6Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain6Ref}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "140px",
              left: "166px"
            }}
          >
            <Channel
              num={8}
              name={name}
              id={id}
              inNode={inNode}
              audioObj={audioObj}
              volume={node7Gain}
              changeBlock={changeBlock}
              connectBlock={connectBlock}
              canvasRef={this.canvasGain7Ref}
            />
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
