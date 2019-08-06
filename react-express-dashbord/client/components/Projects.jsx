import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function RenderProjectMenuItem({ project }) {
  const setContent = () => {
    localStorage.setItem("project" + project.project_id, project.content);
  };
  const url = "http://localhost:5000/project-editor/" + project.project_id;
  console.log(url);
  return (
    <Card>
      {/* <Link to={`/project/${project_id}`}> */}
      {/* <Link to={`/project-editor`}> */}
      {/* Issue with open window in new tab */}
      <a href={url} onClick={setContent}>
        <CardImg
          width="100%"
          src={"/assets/images/sampleproject.jpg"}
          alt={project.name}
        />
        <CardImgOverlay>
          <CardTitle>{project.name}</CardTitle>
        </CardImgOverlay>
        {/* </Link> */}
      </a>
    </Card>
  );
}

const apiEndpoint = "http://localhost:5000/api/projects";

class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount = async () => {
    // case on the user, if there is no user logged in, then no
    // project get displayed
    if (this.props.user) {
      const { data } = await axios.get(apiEndpoint, {
        headers: { user_id: this.props.user.id }
      });
      this.setState({ projects: data.data });
    } else {
      return;
    }
  };

  projectmenu = projects =>
    projects.map(project => {
      console.log(project);
      return (
        <div key={project.project_id} className="col-12 col-md-5 m-1">
          <RenderProjectMenuItem project={project} />
        </div>
      );
    });

  render() {
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
            <h3>ProjectMenu</h3>
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
