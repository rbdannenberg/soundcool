import React, { Component } from 'react';

// This is base class for input, number input, select
class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (this.isValidValue(nextProps.value)) {
        this.setState({ value: nextProps.value });
      }
    }
  }

  updateValue(name, value, callback, data = null) {
    if (this.isValidValue(value)) {
      const newValue = this.props.resetAfterChange ? '' : value;
      this.setState(
        {
          value: newValue,
        },
        () => {
          callback && callback(name, value, data);
        }
      );
    }
  }

  isValidValue(value) {
    return true;
  }

  handleChange = ({ target }) => {
    const { onChange, name } = this.props;
    const { value } = target;
    this.updateValue(name, value, onChange);
  };

  handleOnBlur = ({ target }) => {
    const { onBlur, name } = this.props;
    const { value } = target;
    this.updateValue(name, value, onBlur);
  };

  render() {
    return <div />;
  }
}

export default FormField;
