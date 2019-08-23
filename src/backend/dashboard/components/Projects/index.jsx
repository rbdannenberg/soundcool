import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { createProject } from "../projectEditor/actions";
import { showToastr, showToastrError } from "../common";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { fetchUserProjects } from "./actions";

class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount = async () => {
    // case on the user, if there is no user logged in, then no
    // project get displayed
    if (this.props.user) {
      fetchUserProjects()
        .then(data => this.setState({ projects: data.data }))
        .catch(error => {
          showToastrError(error);
        });
    } else {
      return;
    }
  };

  renderProjects = projects =>
    projects.map((project,index) => {
      localStorage.setItem(
        "project" + project.project_id,
        JSON.stringify(project)
      );
      return (
        <tr>
      <th scope="row">{index+1}</th>
      <td>{project.project_id}</td>
      <td>{project.name}</td>
      <td>{project.description}</td>
      <td></td>
      <td><button className="btn btn-primary" onClick={()=>{window.location="project-editor/"+project.project_id}}><i class="fas fa-edit" aria-hidden="true"></i></button>&nbsp;<button className="btn btn-info"><i class="fas fa-share-alt" aria-hidden="true"></i></button>&nbsp;<button className="btn btn-danger"><i class="fas fa-trash" aria-hidden="true"></i></button></td>
    </tr>
      );
    });

  render() {
    let fileReader;
    const handleFileRead = e => {
      const content = JSON.parse(fileReader.result); 
      let payload = {
        projectName:content.projectName,
        projectDescription:content.projectDescription,
        content: JSON.stringify(content.blocks)
      };
      createProject(payload)
        .then(data => {
          showToastr("success", "Project imported successfully");
          localStorage.setItem(
            "project" + data.project_id,
            JSON.stringify(data)
          );
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
            <h3>
              Projects
              <input
                style={{ display: "none" }}
                ref={ref => (this.upload = ref)}
                type="file"
                id="projectFile"
                accept=".json"
                onChange={e => handleFileChosen(e.target.files[0])}
                className="btn btn-info float-right"
              />
              <button
                className="btn btn-info float-right"
                onClick={e => this.upload.click()}
              >
                Import project
              </button>
            </h3>
          </div>
        </div>
        <div class="table-responsive">
        <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Shared With</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {this.renderProjects(projects)}
  </tbody>
</table>
</div>
      </div>
    );
  }
}

export default Projects;
