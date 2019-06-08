import React, { Component } from "react";
// import Slider from "react-rangeslider";
// import InputRange from "react-input-range";
// import ReactBootstrapSlider from "react-bootstrap-slider";

class Delay extends Component {
  type = "delay";
  color = "pink";
  state = {
    delayTime: 76,
    feedback: 0.119,
    kinect: false,
    osc: 0
  };

  handleChangeDelay = e => {
    this.setState({
      delayTime: e.target.value
    });
  };

  handleChangeFeedback = e => {
    this.setState({
      feedback: e.target.value
    });
  };

  handleKinect = e => {
    const k = this.state.kinect;
    this.setState({
      kinect: !k
    });
  };

  handleOsc = e => {
    this.setState({
      osc: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-body">
          <input
            className="slider m-1"
            type="range"
            onChange={this.handleChangeDelay}
            min={0}
            max={100}
            value={this.state.delayTime}
            id="delayTime"
          />
          <label htmlFor="delayTime">
            {"delay(ms): " + this.state.delayTime}
          </label>
          <input
            className="slider m-1"
            type="range"
            onChange={this.handleChangeFeedback}
            step={0.001}
            min={0}
            max={1}
            value={this.state.feedback}
            id="feedback"
          />
          <label htmlFor="feedback">{"feedback: " + this.state.feedback}</label>
        </div>
        <div className="card-footer">
          <label htmlFor="kinect">Kinect</label>
          <input
            type="checkbox"
            className="m-1"
            id="kinect"
            onClick={this.handleKinect}
          />
          <label htmlFor="osc">OSC port:</label>
          <input type="text" id="osc" onChange={this.handleOsc} />
        </div>
      </React.Fragment>
    );
  }
}

export default Delay;
