import React from "react";

class PiecewiseLogInput extends React.Component {

  constructor(props) {
    super(props);
    this.minLRange = Math.log(this.props.minrange);
    this.maxLRange = Math.log(this.props.maxrange);
    this.logLowValue = Math.log(this.props.lowValue);
    this.logHighValue = Math.log(this.props.highValue);
    this.scale = (this.maxLRange - this.minLRange) /
      (this.props.maxrange - this.props.minrange);
    this.inLinZone = this.props.value < this.props.lowValue;
  }

  scaleInput(x) {
    return (x - this.props.minrange) / (this.props.maxrange - this.props.minrange);
  }

  handleChange(event) {
    let value = this.scaleInput(parseFloat(event.target.value));
    let changeValue;
    if (value < this.props.linearZone) {
      changeValue = (value / this.props.linearZone) *
        (this.props.lowValue - this.props.minrange) + this.props.minrange;
      this.inLinZone = true;
    } else {
      changeValue = Math.exp(this.logLowValue + (this.logHighValue - this.logLowValue) *
        (value - this.props.linearZone) / (1 - this.props.linearZone))
      this.inLinZone = false;
    }
    changeValue = changeValue.toFixed(3);
    this.props.onChange(changeValue);
  }

  handlePosition(value) {
    value = parseFloat(value);
    let linValue;
    if (this.inLinZone) {
      linValue = this.props.linearZone * (value - this.props.minrange) /
        (this.props.lowValue - this.props.minrange);
      linValue = linValue * (this.props.maxrange - this.props.minrange) +
        this.props.minrange;
    } else {
      linValue = this.props.linearZone + (Math.log(value) - this.logLowValue) *
        (1 - this.props.linearZone) / (this.logHighValue - this.logLowValue);
      linValue = linValue * (this.props.maxrange - this.props.minrange) +
        this.props.minrange;
    }
    linValue = Math.min(Math.max(linValue, this.props.minrange), this.props.maxrange);
    return linValue;
  }

  render() {
    return (
      <input
        type={this.props.type}
        onChange={this.handleChange.bind(this)}
        min={this.props.minrange}
        max={this.props.maxrange}
        style={this.props.style}
        value={this.handlePosition.bind(this)(this.props.value)}
        step={this.props.step}
      />
    );
  }
}

export default PiecewiseLogInput;
