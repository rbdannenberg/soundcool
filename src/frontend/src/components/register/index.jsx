import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import RegisterForm from "./form";
import { redirectToRoot } from "./actions";
import { showToastr, showToastrError } from "../common";

class Register extends Component {
  afterRegister = res => {
    const { token, error } = res;

    if (error) {
      showToastrError(res);
    } else {
      showToastr("success", "User registered successfully");
      sessionStorage.setItem("jwtToken", token);
      redirectToRoot();
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
            <BreadcrumbItem active>Register</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <RegisterForm afterRegister={this.afterRegister} />
        <Link to="/login">Already a user? Login</Link>
      </div>
    );
  }
}

export default Register;
