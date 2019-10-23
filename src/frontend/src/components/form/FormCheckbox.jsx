import React from "react";
import FormField from "./FormField";

class FormCheckbox extends FormField {
    handleChange = ({ target }) => {
        const { onChange, name } = this.props;
        const value = target.checked;
        this.updateValue(name, value, onChange, target.value);
    };

    render() {
        const {
            className,
            selectedValue,
            name,
            disabled = false,
            id = "",
            label_text
        } = this.props;

        const { value } = this.state;
        const attrs = {
            className,
            disabled,
            name,
            id
        };
        return (
            <label className="control control--checkbox d-flex align-items-center">
                <input
                    type="checkbox"
                    {...attrs}
                    checked={value}
                    value={selectedValue}
                    onChange={this.handleChange}
                />
                <div className="control__indicator" />
                <div className="p-2">{this.props.label_text}</div>
            </label>
        );
    }
}

export default FormCheckbox;
