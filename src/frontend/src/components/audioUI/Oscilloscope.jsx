
import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderer = undefined;
    this.buffer = new Array(3072).fill(0);

    this.state = {
      yZoomLevel: 1,
      xZoomIndex: 0,
      timeWidth: 4,  // Default is 4 (represents 32ms in our zoomLevels array)
      samplesToDisplay: 192 // 32ms at 48kHz
    };

    this.zoomLevels = [
      { factor: 0.125, samples: 192 },  // 4ms
      { factor: 0.25, samples: 384 },   // 8ms
      { factor: 0.5, samples: 768 },    // 16ms
      { factor: 1, samples: 1536 },     // 32ms
      { factor: 2, samples: 3072 }      // 64ms
    ];
  }

  adjustZoomLevel = (operation) => {
    if (operation === '+') {
        this.setState(prevState => ({
            yZoomLevel: Math.max(prevState.yZoomLevel / 2, 0.25),
        }));
    } else if (operation === '-') {
        this.setState(prevState => ({
          yZoomLevel: Math.min(prevState.yZoomLevel * 2, 1),
        }));
    }
}

  adjustXZoom = (operation) => {
    const zoomLevelsSamples = this.zoomLevels.map(level => level.samples);
    const currentIndex = zoomLevelsSamples.indexOf(this.state.samplesToDisplay);
    if (operation === '-' && currentIndex < zoomLevelsSamples.length - 1) {
        this.setState({ 
            xZoomIndex: currentIndex + 1, 
            samplesToDisplay: zoomLevelsSamples[currentIndex + 1],
            timeWidth: zoomLevelsSamples[currentIndex + 1] / 48  // 48kHz
        });
    } else if (operation === '+' && currentIndex > 0) {
        this.setState({ 
            xZoomIndex: currentIndex - 1, 
            samplesToDisplay: zoomLevelsSamples[currentIndex - 1],
            timeWidth: zoomLevelsSamples[currentIndex - 1] / 48
        });
    }
}


  renderAudio = () => {
    let { audioObj } = this.props.blockInfo;
    let canvas = this.canvasRef.current;
    if (canvas === null) {
      clearInterval(this.renderer);
      return;
    }

    let canvasCtx = canvas.getContext("2d");
    let newData = audioObj.getAudioData();
    let renderCtx = canvasCtx;
    let W = renderCtx.canvas.width;
    let H = renderCtx.canvas.height;


    let scaleY = function(y) {
      return (y / (128.0 * this.state.yZoomLevel)) * (H / 2);
  }.bind(this);

    renderCtx.clearRect(0, 0, W, H);
    
  
  canvasCtx.strokeStyle = "rgba(204, 204, 204, 0.5)";
  const gridGap = H / 10;
  canvasCtx.lineWidth = 0.3; // Even thinner line width
  for (let i = 0; i <= 10; i++) {
      canvasCtx.moveTo(0, gridGap * i);
      canvasCtx.lineTo(W, gridGap * i);
      canvasCtx.stroke();
  }
    canvasCtx.strokeStyle = "#000000";
    // canvasCtx.lineWidth = 1;
    canvasCtx.moveTo(0, H / 2);
    canvasCtx.lineTo(W, H / 2);
    canvasCtx.stroke();

    this.buffer = [...this.buffer.slice(newData.length), ...newData];
    let displayData = this.buffer.slice(0, this.state.samplesToDisplay);

   
    renderCtx.strokeStyle = "rgba(93,168,60,0.8)";
    renderCtx.lineWidth = 0.2;
    renderCtx.beginPath();
    renderCtx.moveTo(0, scaleY(displayData[0]));
    for (let i = 0; i < this.state.samplesToDisplay; ++i) {
      renderCtx.lineTo((W * i) / this.state.samplesToDisplay, scaleY(displayData[i]));
    }
    renderCtx.stroke();
  };




  componentDidMount() {
    let { audioObj, renderRate } = this.props.blockInfo;
    this.renderer = setInterval(this.renderAudio.bind(audioObj), renderRate);
}

toggleExpand = () => {
  this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
}


  render() {
    return (
        <React.Fragment>
        
            <div style={{ width: "264px", height: "185px", position: "relative" }}>
                <div style={{ position: "absolute", top: "40%", left: "-4px", transform: "translateY(-50%)", fontSize: "smaller", textAlign: 'center' }}>
                    <div style={{ marginBottom: '16px',fontSize: "12px" }}>{`${this.state.yZoomLevel}`}</div>
                    <button style={{borderRadius: "5px", margin: "2px 1px 1px 4px", fontSize: "x-smaller" }} onClick={() =>this.adjustZoomLevel('+')}>+</button> <br />
                    <button style={{ borderRadius: "5px", margin: "1px 1px 2px 4px",fontSize: "x-smaller" }} onClick={() => this.adjustZoomLevel('-')}>-</button>
                    <div style={{ marginTop: '16px',fontSize: "12px" }}>{`-${this.state.yZoomLevel}`}</div>
                </div>
          
                <div style={{ position: "absolute", top: "40%", left: "42%", transform: "translate(-50%, -50%)", width: "10.8125rem", height: "140px", backgroundColor: "#DCDEE0" }}>
<canvas ref={this.canvasRef} style={{ width: "100%", height: "100%" }} />
</div>




<div style={{ position: "absolute", bottom: "18px", left: "79px", fontSize: "smaller", display: "flex", alignItems: "center" }}>
  <button style={{ borderRadius: "5px", margin: "5px 0 -5px 5px", fontSize: "small" }} onClick={() => this.adjustXZoom('-')}>-</button>
  <button style={{ borderRadius: "5px", margin: "5px 3px -5px 3px", fontSize: "small" }} onClick={() => this.adjustXZoom('+')}>+</button>
  <div style={{ fontSize: "small", margin: "9px 0 0 6px" }}>{this.state.timeWidth} ms</div>
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

 