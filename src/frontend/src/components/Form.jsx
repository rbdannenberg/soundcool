import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input.jsx";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!result.error) return undefined;

    const errors = {};
    result.error.details.map(item => (errors[item.path[0]] = item.message));
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.doSubmit();
  };

  handleChange = e => {
    let { id, value } = e.currentTarget;
    const data = { ...this.state.data };
    data[id] = value;
    this.setState({ data });
  };

  renderInput = (name, label, type = "text") => {
    let { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = label => {
    return (
      <button
        disabled={this.validate()}
        onClick={this.handleSubmit}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };
}

export default Form;
