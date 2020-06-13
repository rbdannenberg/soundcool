import React from "react";

class LogInput extends React.Component {
  constructor(props) {
    super(props);
    this.minLRange = Math.log(this.props.minrange);
    this.maxLRange = Math.log(this.props.maxrange);
    this.scale = (this.maxLRange - this.minLRange) / (this.props.maxrange - this.props.minrange);
  }

  handleChange(event) {
    let value = parseFloat(event.target.value);
    let expValue = Math.exp(this.minLRange + this.scale * (value - this.props.minrange));
    this.props.changeBlock(this.props.blockID, "frequency", expValue);
  }

  handlePosition(value) {
    value = parseFloat(value);
    let linValue = this.props.minrange + (Math.log(value) - this.minLRange) / this.scale;
    linValue = Math.min(Math.max(linValue, this.props.minrange), this.props.maxrange);
    return linValue;
  }

  render() {
    return (
      <input id="frequency" 
      type={this.props.type} 
      onChange={this.handleChange.bind(this)} 
      min={this.props.minrange} 
      max={this.props.maxrange} 
      style={this.props.style}
      value={this.handlePosition(this.props.frequency)}
      />
    );
  }
}

export default LogInput;
