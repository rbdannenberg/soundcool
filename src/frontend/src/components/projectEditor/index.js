import React from "react";
import { connect } from "react-redux";

import WithHeader from "./Components/WithHeader";
import RegisterForm from "../register/form";
import AddBlock from "./Components/AddBlock";
import { StoreX as Store } from "../../storeX";
import {
  isUserLoggedIn,
  showToastr,
  showToastrError
} from "../../actions/common";
import { updateProject, createProject, fetchUserProject } from "./actions";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput";

const BlockList = ({ blocks, nowOut }) => {
  // let rBlocks = blocks.reverse();
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} />
        // <ExampleWrapper />
      ))}
    </React.Fragment>
  );
};

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.id,
      projectName: "",
      projectDescription: "",
      isModalOpen: false,
      isRegisterModalOpen: false
    };
    this.canvasRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id)
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
    if (this.state.projectId !== "new") {
      fetchUserProject(this.state.projectId)
        .then(res => {
          let { name, description, content } = res;

          this.props.dispatch({
            type: "LOAD_STATE",
            content
          });

          this.setState({
            projectName: name,
            projectDescription: description
          });
        })
        .catch(err => {
          showToastrError(err);
        });
    } else {
      this.props.dispatch({
        type: "LOAD_STATE",
        content: undefined
      });

      this.setState({
        projectName: "",
        projectDescription: ""
      });
    }
  }

  afterRegister = res => {
    const { token, error } = res;

    if (error) {
      showToastrError(res);
    } else {
      sessionStorage.setItem("jwtToken", token);
      Store.populateFromProps({
        userToken: { email: undefined, token: token }
      });
      showToastr("success", "Please enter project details");
      this.toggleRegisterModal();
      this.toggleModal();
    }
  };

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  saveProject = () => {
    if (isUserLoggedIn())
      if (this.state.projectId !== "new")
        this.updateProject({
          projectId: this.state.projectId,
          content: JSON.stringify(this.props.blocks)
        });
      else this.toggleModal();
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
    let isFormValid = true,
      error = "";

    const { projectName, projectDescription, blocks } = this.state;

    if (blocks["bs"].length === 0) {
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

  render() {
    const { projectName, projectDescription } = this.state;
    
    return (
      <div className="container">
        <button className="btn btn-success m-2" onClick={this.saveProject}>
          {isUserLoggedIn()
            ? this.state.projectId === "new"
              ? "Create"
              : "Save"
            : "Register to save"}
        </button>
        {isUserLoggedIn() && this.state.projectId !== "new" && (
          <button
            className="btn btn-warning m-2 float-right"
            onClick={this.exportProject}
          >
            Export Project
          </button>
        )}
        <AddBlock />
        <BlockList
          blocks={this.props.blocks.bs}
          nowOut={this.props.blocks.nowOut}
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

const mapStateToProps = state => ({
  blocks: state.blocks
});

export default connect(mapStateToProps)(ProjectEditor);
