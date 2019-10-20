import React from "react";
import Form from "../Form.jsx";
import FormInput from "../form/FormInput.jsx";
import { showToastr, showToastrError } from "../common";
import { loginUser } from "./actions";

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  handleSubmit = () => {

    const { email, password } = this.state;
    let payload = {
      user: {
        email,
        password
      }
    };

    loginUser(payload)
      .then(res => {
        if (this.props.afterSignin) this.props.afterSignin(res);
      })
      .catch(error => {
        showToastrError(error);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div id="user_login" method="post">
        <FormInput
          className="form-control"
          type="email"
          name="email"
          required={true}
          placeholder="Email Address"
          value={email}
          onChange={this.handleOnChange}
          autoFocus
        />
        <br />
        <FormInput
          className="form-control"
          type="password"
          name="password"
          required={true}
          placeholder="Password"
          value={password}
          onChange={this.handleOnChange}
        />
        <br />
        <button onClick={() => this.handleSubmit()} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}
export default LoginForm;
