import React from "react";
import store from "../../../index";

class Spectroscope extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  // render function
  renderAudio = () => {
    let { audioObj } = this.props.blockInfo;
    let renderCtx = audioObj.renderCtx;
    let data = audioObj.getAudioData();
    let length = data.length;
    let fftSize = audioObj.options.fftSize;
    let W = renderCtx.canvas.width;
    let H = renderCtx.canvas.height;
    let minDb = audioObj.analyzerNode.analyzer.minDecibels;
    let maxDb = audioObj.analyzerNode.analyzer.maxDecibels;
    let scaleY = function(y) {
      y = (y - minDb) / (maxDb - minDb);
      return (1 - y) * H;
    };
    renderCtx.clearRect(0, 0, W, H);
    renderCtx.beginPath();
    renderCtx.fillStyle = "rgba(0,0,0,.4)";
    renderCtx.moveTo(0, H);
    let range = fftSize;
    for (let i = 0; i <= fftSize; i++) {
      renderCtx.lineTo(i, scaleY(data[i]));
    }
    renderCtx.lineTo(W, H);
    renderCtx.fill();
  };

  // bindtocanvas
  componentDidMount = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasRef.current;
    let canvasCtx = canvas.getContext("2d");
    audioObj.renderCtx = canvasCtx;
    audioObj.renderer = setInterval(
      this.renderAudio.bind(audioObj),
      audioObj.options.renderRate
    );
  };

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

export default Spectroscope;
