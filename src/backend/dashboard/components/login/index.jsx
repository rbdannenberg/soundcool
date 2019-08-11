import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../Form.jsx";
import axios from "axios";
import { FormInput } from '../form';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { loginUser, redirectToRoot } from './actions';
import { Link } from "react-router-dom";
import { showToastr, showToastrError } from '../common';
import { Store } from '../store';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Login extends Form {

  state = {
    email: "",
    password: ""
  };


  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };
  
  signInUser = event => {
    event.preventDefault();

    const { email, password } = this.state;
    let payload = {
      user: {
        email,
        password
      }
    };

    loginUser(payload)
      .then(this.afterSignin)
      .catch(error => {
        showToastrError(error);
      });
  };
  
  afterSignin = ({token}) => {
    showToastr('success', 'Logged in successfully.');
    localStorage.setItem("token", token);
    redirectToRoot();
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Login</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <form id="user_login" method="post">
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
                  <br/>
           <FormInput
                    className="form-control"
                    type="password"
                    name="password"
                    required={true}
                    placeholder="Password"
                    value={password}
                    onChange={this.handleOnChange}
                  />
                  <br/>
            <button onClick={this.signInUser} className="btn btn-primary">
              Login
            </button>
          </form>
          <Link to="/register">New user? Register</Link>
        </div>
      </div>
    );
  }
}

export default Login;
