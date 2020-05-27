import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import RegisterForm from "./form";
import { redirectToRoot } from "./actions";
import { showToastr, showToastrError } from "../../actions/common";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Register extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  afterRegister = res => {
    const { cookies } = this.props;
    const { token, error, name } = res;

    if (error) {
      showToastrError(res);
    } else {
      showToastr("success", "User registered successfully");
      cookies.set('name', name);
      cookies.set('token', token);
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

export default withCookies(Register);
