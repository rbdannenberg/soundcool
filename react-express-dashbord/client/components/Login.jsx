import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form.jsx";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };

  doSubmit = async e => {
    // call the server
    const { data: jwt } = await axios.post(
      "http://localhost:5000/api/auth",
      this.state.data
    );
    localStorage.setItem("token", jwt);
    // this.props.history.push("/home");
    window.location = "/home";
    console.log("submitted");
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
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
          <Link to="/register">New user? Register</Link>
        </div>
      </div>
    );
  }
}

export default Login;
