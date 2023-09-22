import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { redirectToHome } from "./actions";
import { Link } from "react-router-dom";
import { showToastr, showToastrError } from "../../actions/common";
import LoginForm from "./form";

import Cookies from 'universal-cookie';
import "./login.css";

const cookies = new Cookies();

class Login extends React.Component {


  afterSignin = res => {
    const { token, error, name, user_id } = res;
    if (error) {
      showToastrError(res);
    } else {
      showToastr("success", "Logged in successfully.");
      cookies.set('name', name, { path: '/' });
      cookies.set("token", token, { path: '/' });
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('userName',name);
      redirectToHome();
    }
  };

  render() {
    return (
      <div id="page-container"> 
        <div id="login-container">
          <div className="login-row">
            {/* <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Login</BreadcrumbItem>
            </Breadcrumb> */}
            LOGIN
          </div>
          <LoginForm afterSignin={this.afterSignin} />
          <Link id="register-link" to="/register">New user? Register</Link>
        </div>
      </div>
    );
  }
}

export default Login;
