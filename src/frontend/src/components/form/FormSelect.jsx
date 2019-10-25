import React from "react";
import FormField from "./FormField";

class FormSelect extends FormField {
  render() {
    const { list, defaultText, name, disabled = false, id } = this.props;
    const { value } = this.state;
    return (
      <select
        className="form-control"
        disabled={disabled}
        value={value}
        onChange={this.handleChange}
        autoComplete="off"
        name={name}
        id={id}
      >
        {!!defaultText && (
          <option value="" disabled>
            {defaultText}
          </option>
        )}
        {list.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
}

export default FormSelect;
