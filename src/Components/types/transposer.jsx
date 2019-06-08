import React, { Component } from "react";

class Transposer extends Component {
  type = "transposer";
  color = "purple";
  state = {
    cents: 0,
    osc: 0
  };

  handleChangeCents = e => {
    this.setState({
      cents: e.target.value
    });
  };

  handleOsc = e => {
    this.setState({
      osc: e.target.value
    });
  };

  handleFlat = () => {
    const c = this.state.cents;
    this.setState({
      cents: c - 100
    });
  };

  handleNatural = () => {
    const c = this.state.cents;
    this.setState({
      cents: 0
    });
  };

  handleSharp = () => {
    const c = this.state.cents;
    this.setState({
      cents: c + 100
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-body">
          <input
            className="slider"
            type="range"
            onChange={this.handleChangeCents}
            min={-50}
            max={50}
            value={this.state.cents}
            id="cents"
          />
          <label for="cents">{"cents: " + this.state.cents}</label>
          <button
            className="btn btn-outline-warning m-1"
            onClick={this.handleFlat}
          >
            b
          </button>
          <button
            className="btn btn-outline-warning m-1"
            onClick={this.handleNatural}
          >
            H
          </button>
          <button
            className="btn btn-outline-warning m-1"
            onClick={this.handleSharp}
          >
            #
          </button>
        </div>
        <div className="card-footer">
          <label htmlFor="osc">OSC port:</label>
          <input type="text" id="osc" onChange={this.handleOsc} />
        </div>
      </React.Fragment>
    );
  }
}

export default Transposer;
