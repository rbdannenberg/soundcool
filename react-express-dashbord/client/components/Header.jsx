import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleLogin(evt) {
    this.toggleModal();

    alert(this.username.value + " " + this.password.value);

    evt.preventDefault();
  }

  handleLogout() {
    localStorage.removeItem("token");
    window.location = "/login";
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-5" href="/">
              <img
                src="assets/images/logo.jpg"
                height="42"
                width="54"
                alt="SoundCool"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <span className="nav-link">
                    <a
                      href="http://localhost:5000/project-editor"
                      className="fa fa-home fa-lg"
                    >
                      Create!
                    </a>
                  </span>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/about">
                    <span className="fa fa-info fa-lg" /> About us
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/projects">
                    <span className="fa fa-list fa-lg" /> Projects
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/sounds">
                    <span className="fa fa-list fa-lg" /> Sounds
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    <span className="fa fa-address-card fa-lg" /> Contact us
                  </NavLink>
                </NavItem>

                {!user && (
                  <NavItem>
                    <NavLink className="nav-link" to="/login">
                      <span className="fa fa-address-card fa-lg" /> Login
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button>
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={this.handleLogout}
                    >
                      <span className="fa fa-sign-out fa-lg">Logout</span>
                    </NavLink>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>SoundCool</h1>
                <p>We take inspiration from the knowledge shared</p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}
