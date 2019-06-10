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

  handleKinect = () => {
    const k = this.props.blocks.kinect;
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
            className="slider m-2"
            type="range"
            style={{ width: "12rem" }}
            onChange={() => this.props.handleChangeDelay(this.props.block)}
            min={0}
            max={100}
            value={this.props.block.delayTime}
            id="delayTime"
          />
          <label htmlFor="delayTime">
            {"delay(ms): " + this.props.block.delayTime}
          </label>
          <input
            className="slider m-2"
            type="range"
            style={{ width: "12rem" }}
            onChange={() => this.props.handleChangeFeedback(this.props.block)}
            step={0.001}
            min={0}
            max={1}
            value={this.props.block.feedback}
            id="feedback"
          />
          <label htmlFor="feedback">
            {"feedback: " + this.props.block.feedback}
          </label>
        </div>
        <div className="card-footer row">
          <span className="col-md-4">
            <label htmlFor="kinect">Kinect</label>
            <input
              type="checkbox"
              className="m-2 "
              id="kinect"
              onClick={() => this.props.handleKinect(this.props.block)}
            />
            <label htmlFor="osc">OSC port:</label>
            <input
              type="text"
              className="m-2"
              style={{ height: "1.5rem", width: "4rem" }}
              id="osc"
              onChange={() => this.props.handleOsc(this.props.block)}
            />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Delay;
