import React from "react";
import FormField from "./FormField";

class FormInput extends FormField {
  render() {
    const {
      placeholder = "",
      required = false,
      maxLength,
      disabled = false,
      name,
      type,
      autoFocus,
      step = "any"
    } = this.props;
    const { value } = this.state;
    const attrs = {
      placeholder,
      maxLength,
      required,
      disabled,
      value,
      name,
      type,
      autoFocus,
      step
    };
    return (
      <input
        className="form-control"
        {...attrs}
        onChange={this.handleChange}
        onBlur={this.handleOnBlur}
      />
    );
  }
}

export default FormInput;
