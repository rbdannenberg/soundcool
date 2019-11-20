import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

class Spectroscope extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderer = undefined;
  }

  // render function
  renderAudio = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasRef.current;
    if (canvas === null) {
      clearInterval(this.renderer);
      return;
    }
    let canvasCtx = canvas.getContext("2d");
    let renderCtx = canvasCtx;
    let data = audioObj.getAudioData();
    // let length = data.length;
    let fftSize = audioObj.options.fftSize;
    let W = renderCtx.canvas.width - 6;
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
    // let range = fftSize;
    for (let i = 0; i <= fftSize; i++) {
      renderCtx.lineTo(i, scaleY(data[i]));
    }
    renderCtx.lineTo(W, H);
    renderCtx.fill();
  };

  // bindtocanvas
  componentDidMount = () => {
    let { audioObj, renderRate } = this.props.blockInfo;
    this.renderer = setInterval(this.renderAudio.bind(audioObj), renderRate);
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
            <canvas
              ref={this.canvasRef}
              style={{
                position: "absolute",
                height: "168px",
                width: "293px"
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
}
export default connect(
  mapStateToProps,
  { changeBlock }
)(Spectroscope);
