import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import RegisterForm from "./form";
import { redirectToRoot } from "./actions";
import { showToastr, showToastrError } from "../../actions/common";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
class Register extends Component {
  //
  afterRegister = res => {
    const { token, error, name, user_id } = res;

    if (error) {
      showToastrError(res);
    } else {
      showToastr("success", "User registered successfully");
      cookies.set('name', name, { path: '/' });
      cookies.set('token', token, { path: '/' });
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("userName", name);
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
        <Link to="/signIn">Already a user? Login</Link>
      </div>
    );
  }
}

export default Register;