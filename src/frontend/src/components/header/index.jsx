import React, { Component } from "react";
import { connect } from "react-redux";
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
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput";

import {
  updateProject,
  createProject,
  fetchUserProject,
  openPort
} from "../projectEditor/actions";
import {
  showToastr,
  showToastrError,
  baseAddress,
  cleanPayload
} from "../../actions/common";

import { NavLink } from "react-router-dom";

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

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  saveProject = () => {
    if (isUserLoggedIn())
      if (this.props.projectControl.projectId !== "new") {
        console.log("here ?");
        this.updateProject({
          projectId: this.props.projectControl.projectId,
          content: JSON.stringify(this.props.blocks)
        });
        console.log("done");
        // console.log(JSON.stringify(this.props.blocks.bs[0]));
      } else this.toggleModal();
    else this.toggleRegisterModal();
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
    const { projectName, projectDescription, items } = this.state;
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

  toggleRegisterModal = () =>
    this.setState({ isRegisterModalOpen: !this.state.isRegisterModalOpen });

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
                {isUserLoggedIn() && (
                  <NavItem>
                    <div
                      className="nav-link dropdown"
                      style={{ color: "white" }}
                    >
                      <span
                        className="fa fa-list dropdown-toggle"
                        id="proj dropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      Project
                      <div
                        className="dropdown-menu"
                        aria-labelledby="proj dropdown"
                      >
                        <NavLink className="nav-link" to="/project-editor/new">
                          <div className="dropdown-item">New</div>
                        </NavLink>
                        <NavLink className="nav-link" to="/projects">
                          <div className="dropdown-item">Open</div>
                        </NavLink>
                        <div className="nav-link">
                          <div
                            className="dropdown-item"
                            onClick={() => {
                              console.log("hi");
                              this.props.dispatch({
                                type: "FLOATING_VIEW",
                                value: undefined
                              });
                            }}
                          >
                            Floating View:
                            {this.props.projectControl.floatingView
                              ? " On"
                              : " Off"}
                          </div>
                        </div>
                        <div className="nav-link">
                          <div
                            className="dropdown-item"
                            onClick={() => {
                              console.log("trying to save");
                              this.saveProject();
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
                              this.exportProject();
                            }}
                          >
                            Export
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <DropdownItem to="/login" onClick={this.handleLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Nav>
              )}
            </Collapse>
          </div>
        </Navbar>
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

export default connect(mapStateToProps)(Header);
