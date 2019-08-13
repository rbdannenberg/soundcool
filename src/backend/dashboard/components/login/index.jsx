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
    redirectToRoot();
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
