import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import RegisterForm from "./form"
import { redirectToRoot } from './actions';

class Register extends Component {

  afterRegister(){
    redirectToRoot();
  }
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
        <RegisterForm
        afterRegister={this.afterRegister}
        />
      </div>
    );
  }
}

export default Register;
