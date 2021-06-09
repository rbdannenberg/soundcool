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
    let datai = audioObj.analyzerNode.i;
    // let length = data.length;
    let fftSize = audioObj.options.fftSize;
    let fftCount = audioObj.options.fftCount;
    let W = renderCtx.canvas.width;
    let H = renderCtx.canvas.height;
    let minDb = -130;//audioObj.analyzerNode.analyzer.minDecibels;
    let maxDb = 0;//audioObj.analyzerNode.analyzer.maxDecibels;
    let scaleDb = function(y) {
      y = (y - minDb) / (maxDb - minDb);
      return y;
    };
    renderCtx.clearRect(0, 0, W, H);
    renderCtx.beginPath();
    var startin = Date.now();
    if (audioObj.options.history){
      let dx = W/fftCount;
      let dy = H/fftSize;
      for (var i = 0; i < fftCount; i++){
        for (var j = 0; j <= fftSize/2; j++) {
          //240 - 60
          let x = Math.ceil(scaleDb(data[(i+datai)%fftCount][j])*180);
          x = (x+240)%360;
          //let x = Math.ceil(Math.abs(scaleY(data[i][j])));
          let g = 'hsl('+ x +',100%,50%)';
          //renderCtx.fillStyle = "hsla("+0.8+", 0.8, 0.8, 1)";
          renderCtx.fillStyle = 'hsl('+ x +',100%,50%)';
          renderCtx.fillRect(dx*i, H - dy*2*j, dx, dy*2);
        }
      }
    }else{
      console.log(minDb);
      console.log(maxDb);
      renderCtx.fillStyle = "rgba(0,0,0,.4)";
      renderCtx.moveTo(0, H);
      let dx = W/fftSize*2;
      for (let i = 0; i <= fftSize/2; i++) {
        renderCtx.lineTo(dx*i, (1 - scaleDb(data[(datai-1)%fftCount][i])) * H);
      }
      renderCtx.lineTo(W, H);
    }
    renderCtx.fill();
    var finishin = Date.now();
    console.log("timin");
    console.log(finishin - startin);
  };

  // bindtocanvas
  componentDidMount = () => {
    let { audioObj, renderRate } = this.props.blockInfo;
    this.renderer = setInterval(this.renderAudio.bind(audioObj), renderRate);
  };

  render() {
    let {
      id,
      audioObj
    } = this.props.blockInfo;

    return (
      <React.Fragment>
        <div
          className=""
          style={{
            height: "170px",
            position: "relative"
          }}
        >
          <label
            htmlFor="history"
            style={{
              fontSize: "0.64rem",
              position: "absolute",
              left: "0.5rem",
              top: "0.25rem"
            }}
          >
            History
          </label>
          <input
            checked={audioObj.options.history}
            type="checkbox"
            className=""
            id="history"
            style={{
              position: "absolute",
              left: "3rem",
              top: "0.25rem"
            }}
            onClick={() =>
              this.props.changeBlock(id, "history", !audioObj.options.history)
            }
          />
          <div
            style={{
              position: "absolute",
              width: "11.8125rem",
              height: "136px",
              top: "28px",
              left: "8px",
              backgroundColor: "#DCDEE0"
            }}
          >
            <canvas
              ref={this.canvasRef}
              style={{
                position: "absolute",
                height: "136px",
                width: "11.8125rem"
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
