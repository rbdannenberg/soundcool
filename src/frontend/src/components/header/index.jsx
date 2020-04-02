import React, { Component } from "react";
import { isUserLoggedIn } from "../../actions/common";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      isNavOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  handleLogout() {
    sessionStorage.clear();
    window.location = "/login";
  }

  render() {
    const { dropdownOpen } = this.state;
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
                  <NavLink className="nav-link" to="/project-editor/new">
                    <span className="fa fa-home " /> Create Project
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home " /> Home
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/about">
                    <span className="fa fa-info " /> About us
                  </NavLink>
                </NavItem>
                {isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link" to="/projects">
                      <span className="fa fa-list " /> Projects
                    </NavLink>
                  </NavItem>
                )}
                {isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link" to="/sounds">
                      <span className="fa fa-list " /> Sounds
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    <span className="fa fa-address-card " /> Contact us
                  </NavLink>
                </NavItem>

                {!isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link" to="/login">
                      <span className="fa fa-address-card " /> Login
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              {isUserLoggedIn() && (
                <Nav className="ml-auto" navbar>
                  <Dropdown
                    nav
                    isOpen={dropdownOpen}
                    toggle={this.toggleDropdown}
                  >
                    <DropdownToggle nav caret>
                      <span className="fa fa-user-circle "></span>&nbsp;
                      {this.props.name}
                    </DropdownToggle>
                    <DropdownMenu tog>
                      <DropdownItem disabled>Edit Profile</DropdownItem>
                      <DropdownItem
                        to="/login"
                        onClick={this.handleLogout}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Nav>
              )}
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}
