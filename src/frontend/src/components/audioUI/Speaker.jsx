import React from "react";
import { connect } from "react-redux";
import { changeBlock } from "./actions";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { Switch, Route, withRouter } from "react-router-dom";

const circleStyle = {
  width: "1.6rem",
  height: "1.6rem",
  textAlign: "center",
  fontSize: "15px",
  lineHeight: 1.428571429,
  borderRadius: "0.5rem"
};

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.oldDb = -100;
    this.canvasLRef = React.createRef();
    this.canvasRRef = React.createRef();
    this.rendererL = undefined;
    this.rendererR = undefined;
  }

  randomMeter = () => {
    let x = Math.random();
    return x;
  };

  // render function
  renderAudioL = () => {
    let { audioObj } = this.props.blockInfo;
    let canvasL = this.canvasLRef.current;
    if (canvasL === null) {
      clearInterval(this.rendererL);
      return;
    }

    let canvasLCtx = canvasL.getContext("2d");
    let renderCtx = canvasLCtx;
    let x = audioObj.getAudioData()[0];
    let data = Math.max(this.oldDb - 7, x, -100);
    let scaledData = 230 + data * 2.3;
    renderCtx.clearRect(0, 0, 230, 140);

    var grd = renderCtx.createLinearGradient(0, 0, 230, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(0.8, "yellow");
    grd.addColorStop(1, "red");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 0, scaledData, 140);
  };

  // render function
  renderAudioR = () => {
    let { audioObj } = this.props.blockInfo;
    let canvasR = this.canvasRRef.current;
    if (canvasR === null) {
      clearInterval(this.rendererR);
      return;
    }
    let canvasRCtx = canvasR.getContext("2d");
    let renderCtx = canvasRCtx;
    let x = audioObj.getAudioData()[1];
    let data = Math.max(this.oldDb - 7, x, -100);
    let scaledData = 230 + data * 2.3;
    renderCtx.clearRect(0, 0, 230, 140);

    var grd = renderCtx.createLinearGradient(0, 0, 230, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(0.8, "yellow");
    grd.addColorStop(1, "red");

    renderCtx.fillStyle = grd;
    renderCtx.fillRect(0, 0, scaledData, 140);
  };

  // bindtocanvas
  componentDidMount = () => {
    let { renderRate } = this.props.blockInfo;
    this.rendererL = setInterval(this.renderAudioL.bind(this), renderRate);
    this.rendererR = setInterval(this.renderAudioR.bind(this), renderRate);
    const unlisten = this.props.history.listen(() => {
      if (this.props.location.pathname.includes('project-editor')) {
        this.props.changeBlock(this.props.blockInfo.id, "suspended", true)
        unlisten()
      }
    });
  };

  render() {
    let { id, suspended } = this.props.blockInfo;

    let playButton;

    if (suspended) {
      playButton = <FaVolumeMute />;
    } else {
      playButton = <FaVolumeUp />;
    }
    return (
      <React.Fragment>
        <div
          className="text-center"
          style={{ position: "relative", height: "38px" }}
        >
          {/* L and R Progress Bars */}
          <div
            className=""
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              top: "0px",
              left: "0.1875rem"
            }}
          >
            L
          </div>
          <div
            className="progress"
            style={{
              width: "10.25rem",
              position: "absolute",
              top: "0.125rem",
              left: "0.75rem",
              backgroundColor: "black",
              height: "0.7rem"
            }}
          >
            <canvas ref={this.canvasLRef} />
            {/* <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={meterL}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: meterL + "%", backgroundColor: "green" }}
            /> */}
          </div>

          <div
            className=""
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              top: "19px",
              left: "0.1875rem"
            }}
          >
            R
          </div>
          <div
            className="progress"
            style={{
              width: "10.25rem",
              position: "absolute",
              top: "19px",
              left: "0.75rem",
              backgroundColor: "black",
              height: "0.7rem"
            }}
          >
            <canvas ref={this.canvasRRef} />
          </div>

          {/* speaker icon button */}
          <button
            className="btn btn-light "
            style={{
              ...circleStyle,
              position: "absolute",
              padding: "0px",
              top: "0.25rem",
              left: "11.0625rem",
              backgroundColor: "transparent",
              border: "1px dotted"
            }}
            onClick={() => {
              this.props.changeBlock(id, "suspended", undefined)
            }}
          >
            {playButton}
          </button>
        </div>

        {/* <div className="text-center" style={{ backgroundColor: "grey" }}>
          <span className="col-md-4">
            <button
              className="badge-pill badge-light badge-sm mx-2 my-1"
              style={{ fontSize: "0.8rem" }}
            >
              Audio Settings
            </button>
          </span>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
export default withRouter(connect(mapStateToProps, { changeBlock })(Speaker));
