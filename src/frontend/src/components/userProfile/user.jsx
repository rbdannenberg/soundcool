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
import { BASE_URL } from "../../constants.js";
import Cookies from "universal-cookie";
import { showToastr, showToastrError } from "../../actions/common";

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const cookies = new Cookies();

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      username: "",
      email: "",
      pass: "",
      isValid: null,
    };
  }
  componentDidUpdate(){
		document.addEventListener('keydown',this.onkeydown);
	}
  
  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  handleSubmit = () => {
    const { username, email, pass } = this.state;
    if (username != "" && email != "" && pass != "" && emailRegexp.test(email) && pass.length >= 6) {
      fetch(`${BASE_URL}/user/edit_user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': cookies.get('token')
        },
        body: JSON.stringify({
          user: {
            name: username,
            password: pass,
            email,
            user_id: localStorage.getItem('user_id')
          }
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        cookies.set('name', response.user.name)
        localStorage.setItem("userName", response.user.name)
        localStorage.setItem("userEmail", response.user.email)
        showToastr("success", "User updated successfully.");
        window.location = "/home";
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
      .catch((err) => {
        showToastrError(err);
      })
    } else {
      // If empty fields or Email invalid or password too short
      this.setState({
        ...this.state,
        isValid: false,
      })
    }
  };
  onkeydown = (e)=>{         
		if (e.keyCode === 13) {   
			this.handleSubmit()
		}
	}

  render() {
    const { username, email, pass, isValid } = this.state;

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
                  {isValid === false && 'Form not valid'}
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
