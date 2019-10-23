import React, { Component } from "react";
import FormInput from "../form/FormInput.jsx";
import { registerUser } from "./actions";
import { showToastrError } from "../common";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
    }
    handleOnChange = (name, value) => {
        const params = { [name]: value };
        this.setState(params);
    };
    handleSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        let payload = {
            user: {
                name,
                email,
                password
            }
        };

        registerUser(payload)
            .then(res => {
                if (this.props.afterRegister) this.props.afterRegister(res);
            })
            .catch(error => {
                showToastrError(error);
            });
    };
    render() {
        const { name, email, password } = this.state;
        return (
            <form id="user_register" method="post">
                <FormInput
                    className="form-control"
                    type="text"
                    name="name"
                    required={true}
                    placeholder="Name"
                    value={name}
                    onChange={this.handleOnChange}
                    autoFocus
                />
                <br />
                <FormInput
                    className="form-control"
                    type="email"
                    name="email"
                    required={true}
                    placeholder="Email Address"
                    value={email}
                    onChange={this.handleOnChange}
                    autoFocus
                />
                <br />
                <FormInput
                    className="form-control"
                    type="password"
                    name="password"
                    required={true}
                    placeholder="Password"
                    value={password}
                    onChange={this.handleOnChange}
                />
                <br />
                <button onClick={this.handleSubmit} className="btn btn-primary">
                    Register
                </button>
            </form>
        );
    }
}
export default RegisterForm;
