import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
  Collapse,
} from "reactstrap";
import home from "../../assets/images/house.png";
import contact from "../../assets/images/contact.png";
import dashboard from "../../assets/images/dashboard.png";
import login from "../../assets/images/login.png";
import about from "../../assets/images/about.png";
import media from "../../assets/images/media.png";
import projects from "../../assets/images/project.png";

import { clearData, isUserLoggedIn } from "../../actions/common";

import { NavLink } from "react-router-dom";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      isNavOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  handleLogout() {
    clearData();
    this.props.history.push("/signIn");
  }

  render() {
    const { dropdownOpen } = this.state;

    return (
      <React.Fragment>
        <Navbar dark expand="md" id="header-container">
          <div className="container-fluid">
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
                  <NavLink className="nav-link text" to="/home">
                    <img src={home} alt="logo" className="projects-logo" />
                    HOME
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link text" to="/about">
                    <img src={about} alt="logo" className="projects-logo" />
                    ABOUT US
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/dashboard">
                    <img src={dashboard} alt="logo" className="projects-logo" />
                    DASHBOARD
                  </NavLink>
                </NavItem>
                {isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link" to="/projectsList">
                      <img
                        src={projects}
                        alt="logo"
                        className="projects-logo"
                      />
                      PROJECTS
                    </NavLink>
                  </NavItem>
                )}

                {isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link" to="/medias">
                      <img src={media} alt="logo" className="projects-logo" />
                      MEDIA
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink className="nav-link text" to="/contact">
                    <img src={contact} alt="logo" className="projects-logo" />
                    CONTACT US
                  </NavLink>
                </NavItem>

                {!isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link text" to="/signIn">
                      <img src={login} alt="logo" className="projects-logo" />
                      LOGIN
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
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink className="text-black" to="/user-profile">
                          <span className="fa fa-address-card " /> Edit Profile
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem onClick={this.handleLogout}>
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

const mapStateToProps = (state) => ({
  blocks: state.blocks,
});

export default withRouter(connect(mapStateToProps)(Header));
