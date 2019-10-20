import React, { Component } from "react";
import Form from "../Form.jsx";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { redirectToHome } from "./actions";
import { Link } from "react-router-dom";
import { showToastr, showToastrError } from "../common";
import LoginForm from "./form";

class Login extends Form {
  afterSignin = res => {
    const { token, error } = res;
    if (error) {
      showToastrError(res);
    } else {
      showToastr("success", "Logged in successfully.");
      localStorage.setItem("token", token);
      redirectToHome();
    }
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
        <LoginForm afterSignin={this.afterSignin} />
        <Link to="/register">New user? Register</Link>
      </div>
    );
  }
}

export default Login;
