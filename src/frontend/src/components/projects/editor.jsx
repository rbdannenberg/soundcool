import React, { Component } from "react";
import { createProject } from "../projectEditor/actions";
import {
  createPerformance,
  fetchPerformance,
  getPorts,
} from "../performance/actions";
import {
  showToastr,
  showToastrError,
  updateRecentProjects,
} from "../../actions/common";
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
  cloneProject,
} from "./actions";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput.jsx";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      projects: [],
      search: "",
      currentProjectName: "",
      isModalOpen: false,
      projectState: null,
      isAddUserModalOpen: false,
      isPerformanceModalOpen: false,
      isJoinPerformanceModalOpen: false,
      checked: false,
      oscModuleList: [],
      filters: {
        private: true,
        shared: true,
        public: true,
      },
    };
    this.toggleProjectVisibility = this.toggleProjectVisibility.bind(this);
  }

  componentDidMount = async () => {
    // case on the user, if there is no user logged in, then no
    // project get displayed
    if (this.props.user) {
      fetchUserProjects()
        .then((data) => {
          // console.log(data);
          this.setState({ projects: data });
        })
        .catch((error) => {
          showToastrError(error);
        });
    } else {
      return;
    }
  };

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
  toggleUserModal = () =>
    this.setState({ isAddUserModalOpen: !this.state.isAddUserModalOpen });
  togglePerformanceModal = () =>
    this.setState({
      isPerformanceModalOpen: !this.state.isPerformanceModalOpen,
    });
  toggleJoinPerformanceModal = () =>
    this.setState({
      isJoinPerformanceModalOpen: !this.state.isJoinPerformanceModalOpen,
    });

  removeSharedUser() {
    let { projectState, userNameToRemove } = this.state;
    let { project_id } = projectState;

    removeSharedUser({ projectId: project_id, userName: userNameToRemove })
      .then((res) => {
        // console.log(res);
        showToastr("success", res.message);

        let updatedProjects = this.state.projects.map((project) => {
          if (project.project_id === project_id) {
            // Parse the sharedUsers from string to object
            let sharedUsersList = JSON.parse(project.sharedUsers).users;

            // Remove the user by filtering out the user with the given userNameToRemove
            sharedUsersList = sharedUsersList.filter(
              (user) => user.name !== userNameToRemove
            );

            // Convert the updated sharedUsers back to string and set it to the project
            project.sharedUsers = JSON.stringify({ users: sharedUsersList });
          }
          return project;
        });

        this.setState({
          projects: updatedProjects,
        });
      })
      .catch((error) => {
        showToastrError(error);
      });
  }

  toggleProjectVisibility(checked) {
    let { projectState } = this.state;
    let { project_id } = projectState;
    setProjectPublic({ projectId: project_id, isPublic: checked })
      .then((res) => {
        // console.log(res);
        showToastr("success", res.message);
        let index = -1;
        this.state.projects.some((project) => {
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
            isPublic: checked,
          },
        });
      })
      .catch((error) => {
        showToastrError(error);
      });
  }
  cloneProject(projectId) {
    cloneProject({ projectId })
      .then((data) => {
        if (data.error) {
          showToastr("success", "Project can't be cloned");
        } else {
          showToastr("success", "Project cloned successfully");
          this.setState({ projects: [...this.state.projects, data] });
          // console.log([...this.state.projects, data]);
        }
      })
      .catch((error) => {
        showToastrError(error);
      });
  }
  handlePerformanceJoin() {
    let { performanceName } = this.state;

    fetchPerformance(performanceName)
      .then((res) => {
        showToastr("success", "Joined performance successfully");
        window.location = "/performance/" + res.name;
      })
      .catch((err) => {
        showToastr("error", "The performance doesn't exist!");
      });
  }
  handlePerformanceCreate() {
    let { projectState, performanceName, oscModuleList } = this.state;
    // test if name already exists
    if (!performanceName.match("^([^0-9]*)$")) {
      showToastr("error", "Performance name cannot contain integer");
      return;
    }
    fetchPerformance(performanceName)
      .then((res) => {
        console.log("already exists");
        showToastr("error", "Performance name already exists!");
      })
      .catch((err) => {
        // if not, ask server to assign random ports and create new performance
        let newOscModuleList = oscModuleList;
        getPorts({ N: oscModuleList.length })
          .then((data) => {
            if (data.err) {
              showToastrError(data);
            } else {
              let portsList = data.portsList;
              newOscModuleList.map((module, i) => {
                module["oscPort"] = portsList[i];
              });
              let { content } = projectState;
              content = JSON.parse(content);
              newOscModuleList = JSON.stringify(newOscModuleList);
              let payload = {
                performanceName: performanceName,
                oscModuleList: newOscModuleList,
                blocks: { bs: content.bs },
              };
              createPerformance(payload)
                .then((data) => {
                  showToastr("success", "Performance created successfully");
                  window.location = "/performance/" + data.name;
                })
                .catch((error) => {
                  showToastrError(error);
                });
            }
          })
          .catch((error) => {
            showToastrError(error);
          });
      });
  }

  getOscModules = (content) => {
    let modules = content["bs"];
    let oscModules = [];
    modules.forEach((module) => {
      if (module["osc"] !== undefined) {
        oscModules = [
          ...oscModules,
          {
            givenName: module["givenName"],
            oscPort: "",
            id: module["id"],
            name: module["name"],
          },
        ];
      }
    });
    return oscModules;
  };
  addSharedUser() {
    let { userName, userEmail, projectState } = this.state;
    let { project_id, sharedUsers } = projectState;
    let duplicate = false;
    if (userName !== "") {
      if (sharedUsers)
        duplicate = JSON.parse(sharedUsers)["users"].some((user) => {
          return user.name === userName;
        });
    }
    if (userEmail !== "") {
      if (sharedUsers)
        duplicate = JSON.parse(sharedUsers)["users"].some((user) => {
          return user.email === userEmail;
        });
    }
    // if (!duplicate) {
    addSharedUser({ userName, userEmail, projectId: project_id })
      .then((res) => {
        showToastr("success", res.message);
        if (res.data) {
          let index = -1;
          this.state.projects.some((project) => {
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
              sharedUsers: res.data,
            },
          });
        }
        // this.toggleUserModal();
        // this.toggleModal();
      })
      .catch((error) => {
        showToastrError(error);
      });
    this.setState({ userName: "", userEmail: "" });
    // }
    // else {
    //   showToastr("success", "Already Shared");
    // }
  }
  removeProject(projectId, index) {
    var r = window.confirm("Do you want to delete project " + projectId);
    if (r === true) {
      removeProject({ projectId })
        .then((res) => {
          showToastr("success", res.message);
          let projects = this.state.projects;
          projects.splice(index, 1);
          this.setState({
            projects,
          });
        })
        .catch((error) => {
          showToastrError(error);
        });
    }
  }

  filterProjects = (project) => {
    const {
      private: privateFilter,
      shared: sharedFilter,
      public: publicFilter,
    } = this.state.filters;

    if (
      privateFilter &&
      !project.isOwner &&
      !project.sharedUsers &&
      !project.isPublic
    ) {
      return true;
    }

    if (
      sharedFilter &&
      !project.isOwner &&
      (project.sharedUsers || project.isPublic)
    ) {
      return true;
    }

    if (publicFilter && project.isOwner) {
      return true;
    }

    return false;
  };
  searchProjects = (project) => {
    let qry = this.state.search;
    if (qry === "") return true;
    else if (project.user.toString().toLowerCase().includes(qry.toLowerCase()))
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
  handleSharing = (project) => {
    this.setState(
      { currentProjectName: project.name, projectState: project },
      () => {
        this.toggleModal();
      }
    );
  };
  handlePerformance = (project) => {
    this.setState(
      {
        currentProjectName: project.name,
        projectState: project,
        oscModuleList: this.getOscModules(JSON.parse(project.content)),
      },
      () => {
        this.togglePerformanceModal();
      }
    );
  };

  handleCheckboxChange = (filterName) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [filterName]: !prevState.filters[filterName],
      },
    }));
  };
  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  renderProjects = (projects) =>
    projects.map((project, index) => {
      let { project_id, name, description, sharedUsers, isOwner, isPublic } =
        project;
      let sUsers = [],
        multiple = false;
      let countt = 0;
      if (sharedUsers)
        JSON.parse(sharedUsers)["users"].every((user) => {
          if (multiple) sUsers.push(", ");
          sUsers.push(user.name);
          multiple = true;
          countt++;
          if (countt > 5) {
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
                updateRecentProjects(project_id, name);
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
            <button
              data-tip="Perform Project"
              className="btn btn-warning"
              onClick={() => this.handlePerformance(project)}
            >
              <i className="fas fa-music" aria-hidden="true"></i>
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

  render() {
    let fileReader;
    const handleFileRead = (e) => {
      const content = JSON.parse(fileReader.result);
      let payload = {
        projectName: content.projectName,
        projectDescription: content.projectDescription,
        blocks: content.blocks,
      };
      createProject(payload)
        .then((data) => {
          showToastr("success", "Project imported successfully");
          this.setState({ projects: [...this.state.projects, data] });
          this.upload.value = "";
        })
        .catch((error) => {
          showToastrError(error);
        });
    };
    const handleFileChosen = (file) => {
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
            <BreadcrumbItem active>Project</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Projects</h3>
            <input
              style={{ display: "none" }}
              ref={(ref) => (this.upload = ref)}
              type="file"
              id="projectFile"
              accept=".json"
              onChange={(e) => handleFileChosen(e.target.files[0])}
              className="btn btn-info float-right"
            />
            <div className="float-right">
              <label style={{ marginRight: "15px" }}>
                <input
                  type="checkbox"
                  checked={this.state.filters.private}
                  onChange={() => this.handleCheckboxChange("private")}
                />
                Private
              </label>
              <label style={{ marginRight: "15px" }}>
                <input
                  type="checkbox"
                  checked={this.state.filters.shared}
                  onChange={() => this.handleCheckboxChange("shared")}
                />
                Shared
              </label>
              <label style={{ marginRight: "15px" }}>
                <input
                  type="checkbox"
                  checked={this.state.filters.public}
                  onChange={() => this.handleCheckboxChange("public")}
                />
                Public
              </label>
              <input
                className="search"
                style={{ marginRight: "10px" }}
                type="text"
                placeholder="Search.."
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
              ></input>
              <button
                className="btn btn-info"
                onClick={(e) => this.upload.click()}
              >
                Import project
              </button>
              {/* <button
                className="btn btn-warning"
                onClick={this.toggleJoinPerformanceModal}
              >
                Show Performances
              </button> */}
              <Link to="/performancesList" className="btn btn-warning">
                Show Performances
              </Link>
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
              {this.renderProjects(
                projects.filter(this.filterProjects).filter(this.searchProjects)
              )}
            </tbody>
            {/* <tbody>{this.renderProjects(projects)}</tbody> */}
          </table>
        </div>
        <Modal centered show={this.state.isModalOpen} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Manage sharing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Project Name: {this.state.currentProjectName} </p>
            {this.state.projectState &&
              this.state.projectState.isOwner === 0 &&
              !this.state.projectState.isOwner && (
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
              )}
            {this.state.projectState &&
              this.state.projectState.isOwner === 0 &&
              !this.state.projectState.isOwner && (
                <p>
                  Add Sharer
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
              )}
            <p>Sharer List:</p>
            <div className="sharer-list">
              {this.state.projectState &&
              !this.state.projectState.isPublic &&
              this.state.projectState.sharedUsers ? (
                <div>
                  {JSON.parse(this.state.projectState.sharedUsers)["users"].map(
                    (user, index) => (
                      <div
                        className="sharer-item"
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                          borderRadius: "15px",
                          border: "1px solid #ccc",
                          padding: "10px",
                        }}
                      >
                        <span style={{ flex: 1 }}>{user.name}</span>
                        {this.state.projectState &&
                          this.state.projectState.isOwner === 0 &&
                          !this.state.projectState.isOwner && (
                            <button
                              style={{
                                marginLeft: "10px",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                background: "#e44d3a",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                this.setState(
                                  { userNameToRemove: user.name },
                                  () => {
                                    this.removeSharedUser();
                                  }
                                );
                              }}
                            >
                              Delete
                            </button>
                          )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p>This is a public project</p>
              )}
            </div>
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
                name="userName"
                required={true}
                placeholder="Username"
                onChange={this.handleOnChange}
                autoFocus
              />
            )}
            {this.state.userName === "" && this.state.userEmail === "" && (
              <center>
                <h5>OR</h5>
              </center>
            )}
            {this.state.userName === "" && (
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
        <Modal
          centered
          show={this.state.isPerformanceModalOpen}
          onHide={this.togglePerformanceModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Perform this project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Create a new performance:</p>
            <p>Project Name: {this.state.currentProjectName} </p>
            <FormInput
              className="form-control"
              type="text"
              name="performanceName"
              required={true}
              placeholder="Performance Name"
              onChange={this.handleOnChange}
              autoFocus
            />
            <br></br>
            {/* Added the following lines for the Description input */}
            <FormInput
              className="form-control"
              type="text"
              name="performanceDescription"
              required={true} // Remove this if description is optional
              placeholder="Performance Description"
              value={this.state.performanceDescription}
              onChange={this.handleOnChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.handlePerformanceCreate();
              }}
            >
              Go
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          centered
          show={this.state.isJoinPerformanceModalOpen}
          onHide={this.toggleJoinPerformanceModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Join an existing performance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormInput
              className="form-control"
              type="text"
              name="performanceName"
              required={true}
              placeholder="Performance Name"
              onChange={this.handleOnChange}
              autoFocus
            />
            <br></br>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={() => this.handlePerformanceJoin()}
            >
              Go
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Projects;
