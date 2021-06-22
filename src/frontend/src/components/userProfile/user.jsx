import React from "react";
import FormInput from "../form/FormInput.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";

import Cookies from "universal-cookie";

const cookies = new Cookies();

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      pass: "",
    };
  }

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  handleSubmit = () => {
    const { username, email, pass } = this.state;

    const QUERY =
      "UPDATE users SET name='" +
      this.state.username +
      "',password='" +
      this.state.pass +
      "',email='" +
      this.state.email +
      "' WHERE name='" +
      localStorage.getItem("userName") +
      "'";

    if (username != "" && email != "" && pass != "") {
      document.getElementById("mensaje").innerHTML = "Query updated: " + QUERY;
    } else {
      document.getElementById("mensaje").innerHTML =
        "Empty fields for update user";
    }
  };

  render() {
    const { username, email, pass } = this.state;

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-12">
            <h3>
              <i className="fa fa-edit"></i> Edit Profile
            </h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    <label>User: {localStorage.getItem("userName")}</label>
                    <FormInput
                      className="form-control"
                      type="text"
                      name="username"
                      required={true}
                      placeholder="Username"
                      value={username}
                      onChange={this.handleOnChange}
                      autoFocus
                    />
                  </div>

                  <div className="col-lg-4">
                    <label>Email: {localStorage.getItem("userEmail")}</label>
                    <FormInput
                      className="form-control"
                      type="email"
                      name="email"
                      required={true}
                      placeholder="Email"
                      value={email}
                      onChange={this.handleOnChange}
                      autoFocus
                    />
                  </div>

                  <div className="col-lg-4">
                    <label>Password</label>
                    <FormInput
                      className="form-control"
                      type="text"
                      name="pass"
                      required={true}
                      placeholder="Password"
                      value={pass}
                      onChange={this.handleOnChange}
                      autoFocus
                    />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-lg-12 text-center">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => this.handleSubmit()}
                    >
                      <i className="fa fa-save"></i> Save
                    </button>
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-lg-12 text-center">
                    <div className="alert alert-warning">
                      <h4 id="mensaje">Query updated: </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
