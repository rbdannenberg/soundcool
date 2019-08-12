import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import WithHeader from "./ui/Components/WithHeader";
import AddBlock from "./ui/Components/AddBlock";
import { isUserLoggedIn, showToastr, showToastrError } from "../common";
import { updateProject, createProject } from "./actions";
import blocks from "./ui/reducers/blocks";
import { createStore, combineReducers } from "redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
const blockApp = combineReducers({
  blocks
});
import { FormInput } from '../form';
// #endregion

export const store = createStore(blockApp);
const BlockList = ({ blocks, nowOut , handleShow, handleClose,isModalOpen}) => {
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
toggleModal = () => this.setState({isModalOpen:!this.state.isModalOpen});
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setState({ ...store.getState() });
    });
    this.state = { ...store.getState(), projectId: this.props.match.params.id,projectName: "",projectDescription:"",isModalOpen:false};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id)
      this.setState({ projectId: nextProps.match.params.id }, () => {
        this.loadState();
      });
  }

  loadState() {
    store.dispatch({
      type: "LOAD_STATE",
      id: this.state.projectId
    });
    let project = localStorage.getItem("project" + this.state.projectId)
    console.log(JSON.parse(project));
    if(project)
      this.setState({
        projectName:JSON.parse(project).name,
        projectDescription:JSON.parse(project).description
      })
  }
  componentDidMount() {
    this.loadState();
  }

  updateProject(payload){
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
  saveProject = () => {
    if (isUserLoggedIn())
    if(this.state.projectId != "new")
      this.updateProject({
        projectId: this.state.projectId,
        content: JSON.stringify(this.state.blocks)
      })
    else
    this.toggleModal()
  }

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };
  createProject = event => {
    this.toggleModal()
    event.preventDefault();

    const { projectName, projectDescription, blocks } = this.state;
    let payload = {
      projectName,
      projectDescription,
      content: JSON.stringify(blocks)
    };

    createProject(payload)
      .then(data=>{
        showToastr('success', 'Project created successfully');
        localStorage.setItem("project" + data.project_id,JSON.stringify(data));
        window.location = "/project-editor/"+data.project_id;
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

      <button
        className="btn btn-info m-2"
        onClick={this.saveProject}
      >
        {this.state.projectId=="new"?"Create":"Save"}
      </button>
        <AddBlock />
        <BlockList
        blocks={this.state.blocks.bs}
          nowOut={this.state.blocks.nowOut}
        />

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
                  <br/>
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
