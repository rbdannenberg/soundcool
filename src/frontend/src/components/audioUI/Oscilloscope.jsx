import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

class Oscilloscope extends React.Component {
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
    let length = data.length;
    let W = renderCtx.canvas.width;
    let H = renderCtx.canvas.height;
    let scaleY = function(y) {
      return (y / 128.0) * (H / 2);
    };
    renderCtx.clearRect(0, 0, W, H);
    renderCtx.beginPath();
    renderCtx.strokeStyle = "rgba(93,168,60,0.8)";
    renderCtx.moveTo(0, scaleY(data[0]));
    for (let i = 0; i < length; ++i) {
      renderCtx.lineTo((W * i) / length, scaleY(data[i]));
    }
    renderCtx.stroke();
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
            width: "234px",
            height: "150px",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "11.8125rem",
              height: "136px",
              top: "8px",
              left: "8px",
              backgroundColor: "#DCDEE0"
            }}
          >
            <canvas
              ref={this.canvasRef}
              style={{
                position: "absolute",
                width: "11.8125rem",
                height: "136px"
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
)(Oscilloscope);
