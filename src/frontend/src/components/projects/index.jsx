import React, { Component } from "react";
import { createProject } from "../projectEditor/actions";
import { showToastr, showToastrError } from "../../actions/common";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import {
  removeProject,
  fetchUserProjects,
  addSharedUser,
  removeSharedUser,
  setProjectPublic,
  cloneProject
} from "./actions";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput.jsx";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userEmail: "",
      projects: [],
      search: "",
      isModalOpen: false,
      projectState: null,
      isAddUserModalOpen: false,
      checked: false
    };
    this.toggleProjectVisibility = this.toggleProjectVisibility.bind(this);
  }

  componentDidMount = async () => {
    // case on the user, if there is no user logged in, then no
    // project get displayed
    if (this.props.user) {
      fetchUserProjects()
        .then(data => {
          // console.log(data);
          this.setState({ projects: data });
        })
        .catch(error => {
          showToastrError(error);
        });
    } else {
      return;
    }
  };

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
  toggleUserModal = () =>
    this.setState({ isAddUserModalOpen: !this.state.isAddUserModalOpen });

  removeSharedUser() {
    let { projectState } = this.state;
    let { project_id, sharedUsers } = projectState;
    removeSharedUser({ projectId: project_id, sharedUsers })
      .then(res => {
        // console.log(res);
        showToastr("success", res.message);
        let index = -1;
        this.state.projects.some(project => {
          index++;
          if (project.project_id === project_id) {
            // eslint-disable-next-line
            this.state.projects[index]["sharedUsers"] = sharedUsers;
            return true;
          }
          return false;
        });
        this.setState({
          projects: this.state.projects
        });
      })
      .catch(error => {
        showToastrError(error);
      });
  }

  toggleProjectVisibility(checked) {
    let { projectState } = this.state;
    let { project_id } = projectState;
    setProjectPublic({ projectId: project_id, isPublic: checked })
      .then(res => {
        // console.log(res);
        showToastr("success", res.message);
        let index = -1;
        this.state.projects.some(project => {
          index++;
          if (project.project_id === project_id) {
            // eslint-disable-next-line
            this.state.projects[index]["isPublic"] = checked;
            return true;
          }
          return false;
        });
        this.setState({
          projects: this.state.projects,
          projectState: {
            ...this.state.projectState,
            isPublic: checked
          }
        });
      })
      .catch(error => {
        showToastrError(error);
      });
  }
  cloneProject(projectId) {
    cloneProject({ projectId })
      .then(data => {
        if (data.error) {
          showToastr("success", "Project can't be cloned");
        } else {
          showToastr("success", "Project cloned successfully");
          this.setState({ projects: [...this.state.projects, data] });
          // console.log([...this.state.projects, data]);
        }
      })
      .catch(error => {
        showToastrError(error);
      });
  }
  addSharedUser() {
    let { userId, userEmail, projectState } = this.state;
    let { project_id, sharedUsers } = projectState;
    let duplicate = false;
    if (userId !== "") {
      if (sharedUsers)
        duplicate = JSON.parse(sharedUsers)["users"].some(user => {
          return user.user_id === userId;
        });
    }
    if (userEmail !== "") {
      if (sharedUsers)
        duplicate = JSON.parse(sharedUsers)["users"].some(user => {
          return user.email === userEmail;
        });
    }
    if (!duplicate) {
      addSharedUser({ userId, userEmail, projectId: project_id })
        .then(res => {
          showToastr("success", res.message);
          if (res.data) {
            let index = -1;
            this.state.projects.some(project => {
              index++;
              if (project.project_id === project_id) {
                // eslint-disable-next-line
                this.state.projects[index]["sharedUsers"] = res.data;
                return true;
              }
              return false;
            });
            this.setState({
              projects: this.state.projects,
              projectState: {
                ...this.state.projectState,
                sharedUsers: res.data
              }
            });
          }
          this.toggleUserModal();
          this.toggleModal();
        })
        .catch(error => {
          showToastrError(error);
        });
      this.setState({ userId: "", userEmail: "" });
    } else {
      showToastr("success", "Already Shared");
    }
  }
  removeProject(projectId, index) {
    var r = window.confirm("Do you want to delete project " + projectId);
    if (r === true) {
      removeProject({ projectId })
        .then(res => {
          showToastr("success", res.message);
          let projects = this.state.projects;
          projects.splice(index, 1);
          this.setState({
            projects
          });
        })
        .catch(error => {
          showToastrError(error);
        });
    }
  }
  filterProjects = project => {
    let qry = this.state.search;
    if (qry === "") return true;
    else if (
      project.user
        .toString()
        .toLowerCase()
        .includes(qry.toLowerCase())
    )
      return true;
    else if (project.name.toLowerCase().includes(qry.toLowerCase()))
      return true;
    else if (project.description.toLowerCase().includes(qry.toLowerCase()))
      return true;
    else if (
      project.sharedUsers &&
      project.sharedUsers.toLowerCase().includes(qry.toLowerCase())
    )
      return true;
    else return false;
  };
  handleSharing = project => {
    this.setState({ projectState: project }, () => {
      this.toggleModal();
    });
  };
  renderProjects = projects =>
    projects.map((project, index) => {
      let {
        project_id,
        name,
        description,
        sharedUsers,
        isOwner,
        isPublic
      } = project;
      let sUsers = [],
        multiple = false;
      let countt = 0;
      if (sharedUsers)
        JSON.parse(sharedUsers)["users"].every(user => {
          if (multiple) sUsers.push(", ");
          sUsers.push(user.user_id);
          multiple = true;
          countt++;
          if (countt > 2) {
            sUsers.push(" , ... ");
            return false;
          }
          return true;
        });
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{name}</td>
          <td>{description}</td>
          <td>{isOwner ? isOwner : "You"}</td>
          <td>{isPublic ? "Everyone" : sUsers}</td>
          <td>
            <button
              data-tip="Edit Project"
              className="btn btn-primary"
              onClick={() => {
                window.location = "project-editor/" + project_id;
              }}
            >
              <i className="fas fa-edit" aria-hidden="true"></i>
            </button>
            &nbsp;
            <button
              data-tip="Share Project"
              className="btn btn-info"
              onClick={() => this.handleSharing(project)}
            >
              <i className="fas fa-share-alt" aria-hidden="true"></i>
            </button>
            &nbsp;
            {!isOwner && (
              <button
                data-tip="Delete Project"
                className="btn btn-danger"
                onClick={() => this.removeProject(project_id, index)}
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            )}
            {isOwner !== 0 && isOwner && (
              <button
                data-tip="Clone Project"
                className="btn btn-primary"
                onClick={() => this.cloneProject(project_id)}
              >
                <i className="fas fa-clone" aria-hidden="true"></i>
              </button>
            )}
          </td>

          <ReactTooltip place="top" type="dark" effect="float" />
        </tr>
      );
    });
  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  render() {
    console.log("rendering projects");
    console.log(this.props);
    let fileReader;
    const handleFileRead = e => {
      const content = JSON.parse(fileReader.result);
      let payload = {
        projectName: content.projectName,
        projectDescription: content.projectDescription,
        blocks: content.blocks
      };
      createProject(payload)
        .then(data => {
          showToastr("success", "Project imported successfully");
          this.setState({ projects: [...this.state.projects, data] });
          this.upload.value = "";
        })
        .catch(error => {
          showToastrError(error);
        });
    };
    const handleFileChosen = file => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    };
    const { projects } = this.state;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>ProjectMenu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Projects</h3>
            <input
              style={{ display: "none" }}
              ref={ref => (this.upload = ref)}
              type="file"
              id="projectFile"
              accept=".json"
              onChange={e => handleFileChosen(e.target.files[0])}
              className="btn btn-info float-right"
            />
            <div className="float-right">
              <input
                className="search"
                style={{ marginRight: "10px" }}
                type="text"
                placeholder="Search.."
                onChange={e => {
                  this.setState({ search: e.target.value });
                }}
              ></input>
              <button
                className="btn btn-info"
                onClick={e => this.upload.click()}
              >
                Import project
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created By</th>
                <th scope="col">Shared With</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderProjects(projects.filter(this.filterProjects))}
            </tbody>
            {/* <tbody>{this.renderProjects(projects)}</tbody> */}
          </table>
        </div>
        <Modal centered show={this.state.isModalOpen} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Manage sharing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Set visible to everyone :
              <Switch
                className="float-right"
                onChange={this.toggleProjectVisibility}
                checked={
                  this.state.projectState
                    ? this.state.projectState.isPublic
                      ? true
                      : false
                    : false
                }
              />
            </p>
            <p>
              User List
              <button
                onClick={() => {
                  this.toggleModal();
                  this.toggleUserModal();
                }}
                className="float-right btn btn-primary"
              >
                <i className="fa fa-plus"></i>
              </button>
            </p>
            {this.state.projectState &&
              !this.state.projectState.isPublic &&
              this.state.projectState.sharedUsers && (
                <div>
                  {JSON.parse(this.state.projectState.sharedUsers)["users"].map(
                    (user, index) => {
                      return (
                        <p>
                          User Id : {user.user_id}
                          <button
                            onClick={() => {
                              let arr = JSON.parse(
                                this.state.projectState.sharedUsers
                              )["users"];
                              arr.splice(index, 1);
                              this.setState(
                                {
                                  projectState: {
                                    ...this.state.projectState,
                                    sharedUsers: JSON.stringify({
                                      users: arr
                                    })
                                  }
                                },
                                () => {
                                  this.removeSharedUser();
                                }
                              );
                            }}
                            className="float-right btn btn-danger"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </p>
                      );
                    }
                  )}
                </div>
              )}
          </Modal.Body>
        </Modal>
        <Modal
          centered
          show={this.state.isAddUserModalOpen}
          onHide={this.toggleUserModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.userEmail === "" && (
              <FormInput
                className="form-control"
                type="text"
                name="userId"
                required={true}
                placeholder="User Id"
                onChange={this.handleOnChange}
                autoFocus
              />
            )}
            {this.state.userId === "" && this.state.userEmail === "" && (
              <center>
                <h5>OR</h5>
              </center>
            )}
            {this.state.userId === "" && (
              <FormInput
                className="form-control"
                type="text"
                name="userEmail"
                required={true}
                placeholder="User Email"
                onChange={this.handleOnChange}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-warn"
              onClick={() => {
                this.toggleUserModal();
                this.toggleModal();
              }}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.addSharedUser()}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Projects;
