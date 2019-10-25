import React, { Component } from "react";
import { isUserLoggedIn } from "../common";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    NavItem,
    Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    handleLogout() {
        sessionStorage.clear();
        window.location = "/login";
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" style={{ padding: "0" }}>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-5" href="/">
                            <img
                                src="/assets/images/logo.jpg"
                                height="42"
                                width="54"
                                alt="SoundCool"
                            />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink
                                        className="nav-link"
                                        to="/project-editor/new"
                                    >
                                        <span className="fa fa-home " /> Create
                                        Project
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home " /> Home
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/about">
                                        <span className="fa fa-info " /> About
                                        us
                                    </NavLink>
                                </NavItem>
                                {isUserLoggedIn() && (
                                    <NavItem>
                                        <NavLink
                                            className="nav-link"
                                            to="/projects"
                                        >
                                            <span className="fa fa-list " />{" "}
                                            Projects
                                        </NavLink>
                                    </NavItem>
                                )}
                                {isUserLoggedIn() && (
                                    <NavItem>
                                        <NavLink
                                            className="nav-link"
                                            to="/sounds"
                                        >
                                            <span className="fa fa-list " />{" "}
                                            Sounds
                                        </NavLink>
                                    </NavItem>
                                )}
                                <NavItem>
                                    <NavLink className="nav-link" to="/contact">
                                        <span className="fa fa-address-card " />{" "}
                                        Contact us
                                    </NavLink>
                                </NavItem>

                                {!isUserLoggedIn() && (
                                    <NavItem>
                                        <NavLink
                                            className="nav-link"
                                            to="/login"
                                        >
                                            <span className="fa fa-address-card " />{" "}
                                            Login
                                        </NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                            {isUserLoggedIn() && (
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink
                                            className="nav-link btn btn-secondary"
                                            to="/login"
                                            onClick={this.handleLogout}
                                        >
                                            <span className="fa fa-sign-out-alt ">
                                                &nbsp;Logout
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            )}
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}
