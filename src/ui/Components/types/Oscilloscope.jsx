import React from "react";
import store from "../../../index";

class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  // render function
  renderAudio = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasRef.current;
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let data = audioObj.getAudioData();
    let length = data.length;
    let W = renderCtx.canvas.width;
    let H = renderCtx.canvas.height;
    let scaleY = function(y) {
      return (y / 128.0) * (H / 2);
    };
    renderCtx.clearRect(0, 0, W, H);
    renderCtx.beginPath();
    renderCtx.strokeStyle = "rgba(0,255,0,0.8)";
    renderCtx.moveTo(0, scaleY(data[0]));
    for (let i = 0; i < length; ++i) {
      renderCtx.lineTo((W * i) / length, scaleY(data[i]));
    }
    renderCtx.stroke();
  };

  // bindtocanvas
  componentDidMount = () => {
    let { audioObj, renderRate } = this.props.blockInfo;
    audioObj.renderer = setInterval(
      this.renderAudio.bind(audioObj),
      renderRate
    );
  };

  // Stop the setInterval process
  unbindCanvas() {
    let { audioObj } = this.props.blockInfo;
    // let W = audioObj.renderCtx.canvas.width;
    // let H = audioObj.renderCtx.canvas.height;
    // audioObj.renderCtx.clearRect(0,0,W,H);
    clearInterval(audioObj.renderer);
  }

  render() {
    return (
      <React.Fragment>
        <div
          className=""
          style={{
            width: "288px",
            height: "188px",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "293px",
              height: "168px",
              top: "10px",
              left: "10px",
              backgroundColor: "#DCDEE0"
            }}
          >
            <canvas ref={this.canvasRef} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Oscilloscope;
