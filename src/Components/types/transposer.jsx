import React, { Component } from "react";

const circleStyle = {
  width: "2rem",
  height: "2rem",
  textAlign: "center",
  fontSize: "12px",
  lineHeight: 1.428571429,
  borderRadius: "1rem"
};

class Transposer extends Component {
  type = "transposer";
  color = "purple";
  state = {
    buttonCents: 0,
    sliderCents: 0,
    osc: 0
  };

  handleChangeCents = e => {
    this.setState({
      sliderCents: e.target.value
    });
  };

  handleOsc = e => {
    this.setState({
      osc: e.target.value
    });
  };

  handleFlat = () => {
    const c = this.state.buttonCents;
    this.setState({
      buttonCents: c - 100
    });
  };

  handleNatural = () => {
    this.setState({
      buttonCents: 0
    });
  };

  handleSharp = () => {
    const c = this.state.buttonCents;
    this.setState({
      buttonCents: c + 100
    });
  };

  render() {
    const c =
      parseInt(this.state.buttonCents) + parseInt(this.state.sliderCents);
    return (
      <React.Fragment>
        <div className="card-body">
          <label htmlFor="cents" className="float-right">
            {c}
          </label>
          <div className="text-center">
            <input
              className="slider m-2"
              type="range"
              style={{ width: "20rem" }}
              onChange={this.handleChangeCents}
              min={-50}
              max={50}
              value={this.state.ChangeCents}
              id="cents"
            />
            <span className="float-left"> -50 </span>
            <span className="float-center"> 0 </span>
            <span className="float-right"> +50 </span>
          </div>
          <div className="text-center">
            <button
              className="btn btn-light mx-4 my-2"
              style={circleStyle}
              onClick={this.handleFlat}
            >
              &#9837;
            </button>
            <button
              className="btn btn-light btn-circle mx-4 my-2"
              style={circleStyle}
              onClick={this.handleNatural}
            >
              &#9838;
            </button>
            <button
              className="btn btn-light btn-circle mx-4 my-2"
              style={circleStyle}
              onClick={this.handleSharp}
            >
              &#9839;
            </button>
          </div>
        </div>
        <div className="card-footer">
          <div className="col-md-8 row">
            <label htmlFor="osc">OSC port:</label>
            <input
              type="text"
              className="m-2"
              style={{ height: "1.5rem", width: "4rem" }}
              id="osc"
              onChange={this.handleOsc}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Transposer;
