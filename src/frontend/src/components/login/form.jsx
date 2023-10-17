import React from "react";
import FormInput from "../form/FormInput.jsx";
import { showToastrError } from "../../actions/common";
import { loginUser } from "./actions";
import "./login.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidUpdate(){
		document.addEventListener('keydown',this.onkeydown);
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

    localStorage.setItem('userEmail',email);

    loginUser(payload)
      .then(res => {
        if (this.props.afterSignin) this.props.afterSignin(res);
      })
      .catch(error => {
        showToastrError(error);
      });
  };
  onkeydown = (e)=>{         
		if (e.keyCode === 13) {   
			this.handleSubmit()
		}
	}

  render() {
    const { email, password } = this.state;
    const inputStyle = {
      height: '10px', // Adjust the desired height
      marginBottom: '100px', // Adjust the desired margin-bottom
    };
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
          style={inputStyle} 
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
          style={inputStyle} 
        />
        <br />
        <button onClick={() => this.handleSubmit()} className="btn btn-primary login-button">
          Login
        </button>
      </div>
    );
  }
}
export default LoginForm;