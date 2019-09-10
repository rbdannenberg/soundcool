import React, { Component } from "react";
import Form from "../Form.jsx";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { loginUser, redirectToHome } from './actions';
import { Link } from "react-router-dom";
import { showToastr, showToastrError } from '../common';
import Cookies from 'universal-cookie';
import LoginForm from "./form"
class Login extends Form {
  
  signInUser = (data) => {
    event.preventDefault();

    const { email, password } = data;
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
    redirectToHome();
  };
  render() {
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
        <LoginForm
          handleSubmit={this.signInUser}
        />
        <Link to="/register">New user? Register</Link>
      </div>
    );
  }
}

export default Login;
