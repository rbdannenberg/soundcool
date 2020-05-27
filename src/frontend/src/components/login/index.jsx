import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { redirectToHome } from "./actions";
import { Link } from "react-router-dom";
import { showToastr, showToastrError } from "../../actions/common";
import LoginForm from "./form";

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  afterSignin = res => {
    const { cookies } = this.props;
    const { token, error, name } = res;
    if (error) {
      showToastrError(res);
    } else {
      showToastr("success", "Logged in successfully.");
      cookies.set("name", name);
      cookies.set("token", token);
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

export default withCookies(Login);
