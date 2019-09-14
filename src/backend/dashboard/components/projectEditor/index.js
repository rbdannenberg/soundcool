import React from "react";
import WithHeader from "./ui/Components/WithHeader";
import "bootstrap/dist/js/bootstrap.js";
import RegisterForm from "../register/form";
import AddBlock from "./ui/Components/AddBlock";
import { Store } from "../store";
import { isUserLoggedIn, showToastr, showToastrError } from "../common";
import { updateProject, createProject } from "./actions";
import blocks from "./ui/reducers/blocks";
import { createStore, combineReducers } from "redux";
import Modal from "react-bootstrap/Modal";
const blockApp = combineReducers({
  blocks
});
import FormInput from "../form/FormInput";
// #endregion

export const store = createStore(blockApp);
const BlockList = ({ blocks, nowOut }) => {
  console.log(blocks);
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} />
      ))}
    </React.Fragment>
  );
};

class ProjectEditor extends React.Component {
  // { bs, nowOut } = this.props.blocks;
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setState({ ...store.getState() });
    });
    this.state = {
      ...store.getState(),
      projectId: this.props.match.params.id,
      projectName: "",
      projectDescription: "",
      isModalOpen: false,
      isRegisterModalOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id)
      this.setState({ projectId: nextProps.match.params.id }, () => {
        this.loadState();
      });
  }

  componentDidMount() {
    this.loadState();
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
  toggleRegisterModal = () =>
    this.setState({ isRegisterModalOpen: !this.state.isRegisterModalOpen });

  loadState() {
    store.dispatch({
      type: "LOAD_STATE",
      id: this.state.projectId
    });
    let project = localStorage.getItem("project" + this.state.projectId);
    if (project)
      this.setState({
        projectName: JSON.parse(project).name,
        projectDescription: JSON.parse(project).description
      });
  }

  afterRegister = () => {
    const token = localStorage.getItem("token");
    Store.populateFromProps({ userToken: { email: undefined, token: token } });
    showToastr("success", "Please enter project details");
    this.toggleRegisterModal();
    this.toggleModal();
  };

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  saveProject = () => {
    if (isUserLoggedIn())
      if (this.state.projectId != "new")
        this.updateProject({
          projectId: this.state.projectId,
          content: JSON.stringify(this.state.blocks)
        });
      else this.toggleModal();
    else this.toggleRegisterModal();
  };

  updateProject(payload) {
    updateProject(payload)
      .then(() => {
        showToastr("success", "Project successfully updated");
        store.dispatch({
          type: "SAVE_STATE",
          id: this.state.projectId
        });
      })
      .catch(error => {
        showToastrError(error);
      });
  }
  exportProject = event => {
    event.preventDefault();
    const { projectName, projectDescription, blocks } = this.state;
    this.downloadFile({
      projectName,
      projectDescription,
      blocks
    });
  };

  downloadFile = async myData => {
    const fileName = myData.projectName;
    const json = JSON.stringify(myData, null, "\t");
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  createProject = event => {
    event.preventDefault();

    const { projectName, projectDescription, blocks } = this.state;
    let payload = {
      projectName,
      projectDescription,
      content: JSON.stringify(blocks)
    };

    createProject(payload)
      .then(data => {
        this.setState({ projectName: "", projectDescription: "" });
        showToastr("success", "Project created successfully");
        localStorage.setItem("project" + data.project_id, JSON.stringify(data));
        window.location = "/project-editor/" + data.project_id;
      })
      .catch(error => {
        showToastrError(error);
      });
  };

  render() {
    const { projectName, projectDescription } = this.state;
    return (
      <div className="container">
        {/* <SLButton />
      <ProjectPage /> */}

        <button className="btn btn-success m-2" onClick={this.saveProject}>
          {isUserLoggedIn()
            ? this.state.projectId == "new"
              ? "Create"
              : "Save"
            : "Register to save"}
        </button>
        {isUserLoggedIn() && this.state.projectId != "new" && (
          <button
            className="btn btn-warning m-2 float-right"
            onClick={this.exportProject}
          >
            Export Project
          </button>
        )}
        <AddBlock />
        <BlockList
          blocks={this.state.blocks.bs}
          nowOut={this.state.blocks.nowOut}
        />

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
                value={projectName}
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
                value={projectDescription}
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
      </div>
    );
  }
}

export default ProjectEditor;
