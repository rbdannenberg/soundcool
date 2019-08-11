import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form.jsx";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

const apiEndpoint = "/api/users";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("password"),
    name: Joi.string()
      .required()
      .label("name")
  };

  doSubmit = async () => {
    // call the server
    const { data } = await axios.post(apiEndpoint, this.state.data);
    alert("Successfully registered");
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Register</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
