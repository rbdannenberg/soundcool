import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
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
import Modal from "react-bootstrap/Modal";
import RegisterForm from "../register/form";
import FormInput from "../form/FormInput";
import projectEditor from "../projectEditor/index";

import { updateProject, createProject } from "../projectEditor/actions";
import {
  showToastr,
  showToastrError,
  cleanPayload
} from "../../actions/common";

import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      isNavOpen: false,
      // endpoint: baseAddress(),
      projectId: this.props.projectControl.projectId,
      items: [[], [], []],
      // prevItems: this.props.blocks.bs,
      projectName: this.props.projectControl.projectName,
      projectDescription: "",
      isModalOpen: false,
      isRegisterModalOpen: false
      // openPorts: []
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
  }

  isUserLoggedIn() {
    // console.log(cookies.getAll());
    return cookies.get("token") || "";
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  handleLogout() {
    cookies.remove("name", { path: "/" });
    cookies.remove("token", { path: "/" });
    cookies.remove("token", { path: "/project-editor" });
    this.props.history.push("/signIn");
  }

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  saveProject = () => {
    if (this.isUserLoggedIn())
      if (this.props.projectControl.projectId !== "new") {
        this.updateProject({
          projectId: this.props.projectControl.projectId,
          content: JSON.stringify(this.props.blocks)
        });
        console.log("done");
        // console.log(JSON.stringify(this.props.blocks.bs[0]));
      } else this.toggleModal();
    else {
      console.log("here 1");
      this.toggleRegisterModal();
    }
  };

  updateProject(payload) {
    updateProject(payload)
      .then(() => {
        showToastr("success", "Project successfully updated");
      })
      .catch(error => {
        showToastrError(error);
      });
  }

  createProject = event => {
    event.preventDefault();
    let isFormValid = true,
      error = "";
    const { projectName, projectDescription } = this.state;
    const blocks = this.props.blocks;

    if (blocks.length === 0) {
      error = "Project is Empty";
      isFormValid = false;
    } else if (projectName === "") {
      error = "Project name is required";
      isFormValid = false;
    }

    if (isFormValid) {
      let payload = {
        projectName,
        projectDescription,
        blocks
      };

      createProject(payload)
        .then(data => {
          this.setState({ projectName: "", projectDescription: "" });
          showToastr("success", "Project created successfully");
          window.location = "/project-editor/" + data.project_id;
        })
        .catch(error => {
          showToastrError(error);
        });
    } else {
      showToastrError({ error });
    }
  };

  exportProject = () => {
    const { projectName, projectDescription } = this.props.projectControl;
    // let bs = items.reduce((a, b) => {
    //   return a.concat(b);
    // });
    let bs = this.props.blocks.bs;
    let nowOut = this.props.blocks.nowOut;
    let blocks = {
      bs,
      nowOut
    };
    console.log(projectName);
    this.downloadFile({
      projectName,
      projectDescription,
      blocks
    });
  };

  downloadFile = async myData => {
    const fileName = myData.projectName;
    const json = JSON.stringify(myData, null, "\t");
    let readData = JSON.parse(json);
    readData.blocks = cleanPayload(readData.blocks);
    const updatedJson = JSON.stringify(readData, null, "\t");
    const blob = new Blob([updatedJson], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  toggleRegisterModal = () => {
    console.log("here?");
    this.setState({ isRegisterModalOpen: !this.state.isRegisterModalOpen });
  };

  render() {
    const { dropdownOpen } = this.state;
    return (
      <React.Fragment>
        <Navbar dark expand="md" style={{ padding: "0", zIndex: 10 }}>
          <div
            className="container"
          >
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
                {/* <NavItem>
                  <NavLink className="nav-link" to="/project-editor/new">
                    <span className="fa fa-home " /> Create Project
                  </NavLink>
                </NavItem> */}

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
                <NavItem>
                  <div className="nav-link dropdown" style={{ color: "white" }}>
                    <span
                      className="dropdown-toggle"
                      id="proj dropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="fa fa-list" /> Project
                    </span>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="proj dropdown"
                    >
                      <NavLink className="nav-link" to="/project-editor/new">
                        <div className="dropdown-item">New</div>
                      </NavLink>

                      {this.isUserLoggedIn() && (
                        <NavLink className="nav-link" to="/projects">
                          <div className="dropdown-item">Open</div>
                        </NavLink>
                      )}
                      <div className="nav-link">
                        <div
                          className="dropdown-item"
                          onClick={() => {
                            console.log("trying?");
                            this.props.dispatch({
                              type: "FLOATING_VIEW",
                              value: undefined
                            });
                          }}
                        >
                          {this.props.projectControl.floatingView ? (
                            <div>
                              <b> &#9744;</b> Column View
                            </div>
                          ) : (
                            <div>
                              <b>&#9745;</b> Column View
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="nav-link">
                        <div
                          className="dropdown-item"
                          onClick={() => {
                            console.log("trying to save");
                            console.log(
                              projectEditor.WrappedComponent.prototype
                                .saveProject
                            );
                            this.saveProject();
                            // projectEditor.WrappedComponent.prototype.saveProject(
                            //   this.props.projectControl.projectId,
                            //   this.props.blocks
                            // );
                          }}
                        >
                          Save
                        </div>
                      </div>
                      <div className="nav-link">
                        <div
                          className="dropdown-item"
                          onClick={() => {
                            console.log("trying to export");
                            // let {
                            //   projectName,
                            //   projectDescription
                            // } = this.props.projectControl;

                            this.exportProject();
                            // projectEditor.WrappedComponent.prototype.exportProject(
                            //   projectName,
                            //   projectDescription,
                            //   this.props.blocks
                            // );
                          }}
                        >
                          Export
                        </div>
                      </div>
                    </div>
                  </div>
                </NavItem>

                {this.isUserLoggedIn() && (
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

                {!this.isUserLoggedIn() && (
                  <NavItem>
                    <NavLink className="nav-link" to="/signIn">
                      <span className="fa fa-address-card " /> Login
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              {this.isUserLoggedIn() && (
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
        <Modal
          centered
          show={this.state.isRegisterModalOpen}
          onHide={this.toggleRegisterModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create new account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm afterRegister={this.afterRegister} />
          </Modal.Body>
        </Modal>
        <Modal centered show={this.state.isModalOpen} onHide={this.toggleModal}>
          <form id="project_create" method="post">
            <Modal.Header closeButton>
              <Modal.Title>Create new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormInput
                className="form-control"
                type="text"
                name="projectName"
                required={true}
                placeholder="Project Name"
                value={this.state.projectName}
                onChange={this.handleOnChange}
                autoFocus
              />
              <br />
              <FormInput
                className="form-control"
                type="text"
                name="projectDescription"
                required={true}
                placeholder="Project Description"
                value={this.state.projectDescription}
                onChange={this.handleOnChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-warn" onClick={this.toggleModal}>
                Close
              </button>
              <button onClick={this.createProject} className="btn btn-primary">
                Create
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projectControl: state.projectControl,
  blocks: state.blocks
});

export default withRouter(connect(mapStateToProps)(Header));
