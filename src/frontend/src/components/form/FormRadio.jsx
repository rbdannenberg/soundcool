import React from "react";
import FormField from "./FormField";

class FormRadio extends FormField {
  handleClick = event => {
    this.props.stateToUpdate
      ? // To change the state value in parent component
        this.props.onChange(this.props.stateToUpdate, event.target.value)
      : // To run custom function from parent component
        this.props.onChange();
  };

  render() {
    const {
      list,
      className,
      name,
      disabled = false,
      value,
      id = "",
      labeltext = ""
    } = this.props;

    const attrs = {
      className,
      disabled,
      name,
      id
    };
    return (
      <div className="radio-select">
        {list.map((item, index) => (
          <label
            className="control control--radio d-flex align-items-center"
            key={index}
          >
            <input
              type="radio"
              disabled={disabled}
              value={item.id}
              onChange={this.handleClick}
              name={this.props.name}
              id={item.id}
              checked={item.id == value}
            />
            <div className="control__indicator" />
            <div className="p-2">{item.name}</div>
          </label>
        ))}
      </div>
    );
  }
}

export default FormRadio;
