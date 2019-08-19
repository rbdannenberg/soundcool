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

function RenderProjectMenuItem({ project }) {
  const setContent = () => {
    localStorage.setItem(
      "project" + project.project_id,
      JSON.stringify(project)
    );
  };
  const url = "/project-editor/" + project.project_id;
  // console.log(url);
  return (
    <Card>
      {/* <Link to={`/project/${project_id}`}> */}
      {/* <Link to={`/project-editor`}> */}
      {/* Issue with open window in new tab */}
      <NavLink onClick={setContent} to={url}>
        <CardImg
          width="100%"
          src={"/assets/images/sampleproject.jpg"}
          alt={project.name}
        />
        <CardImgOverlay>
          <CardTitle>{project.name}</CardTitle>
        </CardImgOverlay>
        {/* </Link> */}
      </NavLink>
    </Card>
  );
}

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

  projectmenu = projects =>
    projects.map(project => {
      // console.log(project);
      return (
        <div key={project.project_id} className="col-12 col-md-5 m-1">
          <RenderProjectMenuItem project={project} />
        </div>
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
              Project Menu
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
            <hr />
          </div>
        </div>
        <div className="row">{this.projectmenu(projects)}</div>
        {/* <div className="row">{projects.map(<div>HELLLLo</div>)}</div> */}
      </div>
    );
  }
}

export default Projects;
