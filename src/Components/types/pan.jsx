import React, { Component } from "react";

class Pan extends Component {
  type = "pan";
  color = "green";
  state = {
    direction: 0,
    kinect: false,
    osc: 0
  };

  handleChangeDirection = e => {
    this.setState({
      direction: e.target.value
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
        <div class="text-center card-body">
          {/* <div className="row"> */}
          <span>L</span>
          <input
            className="slider m-2"
            type="range"
            style={{ width: "18rem" }}
            onChange={this.handleChangeDirection}
            min={-50}
            max={50}
            value={this.state.direction}
            id="direction"
          />
          <span>R</span>
          {/* </div> */}
        </div>
        <div className="card-footer row">
          <span className="col-md-4">
            <label htmlFor="kinect">Kinect</label>
            <input
              type="checkbox"
              className="m-1"
              id="kinect"
              onClick={this.handleKinect}
            />
            <label htmlFor="osc">OSC port:</label>
            <input
              type="text"
              className="col-md-6 m-2"
              style={{ height: "1.5rem", width: "4rem" }}
              id="osc"
              onChange={this.handleOsc}
            />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Pan;
