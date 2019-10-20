import React from 'react';
import FormInput from './FormInput';

import { VALID_EMAIL_REGEX } from '../constants';

export default class FormEmailInput extends FormInput {
  constructor(props) {
    super(props);
    const value = this.getFormattedValue(props.value);
    this.state = {
      value,
    };
  }

  updateValue = (name, value, callback) => {
    const emailValue = this.getFormattedValue(value);
    if (this.isValidValue(emailValue)) {
      this.setState(
        {
          value: emailValue,
        },
        () => {
          this.props.onError('email', {});
          callback && callback(name, emailValue);
        }
      );
    } else {
      this.setState(
        {
          value: emailValue,
        },
        () => {
          this.props.onError('email', { email: 'Email ID is not valid' });
          callback && callback(name, emailValue);
        }
      );
    }
  };

  isValidValue = value => value == '' || VALID_EMAIL_REGEX.test(value);

  getFormattedValue = value => value.trim();
}
