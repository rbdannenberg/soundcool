import dummy from "./dummyTutorial.png";
import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Carousel from "react-multi-carousel";
import { withRouter } from "react-router-dom";
import { Badge, Button, Col, Input, Row } from "reactstrap";
import { fetchPerformance } from "../performance/actions";
import {
  isUserLoggedIn,
  showToastr,
  showToastrError,
  timedifference,
  updateRecentProjects
} from "../../actions/common";
import { fetchUserProjects } from "./actions";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput.jsx";
import "./projects.css";
import SideNav from "./sideNav";

class ProjectHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wid: "100px",
      projectsShown: localStorage.getItem("projectsShown")
        ? localStorage.getItem("projectsShown")
        : 3,
      recentPSize: localStorage.getItem("recentProjectsSize")
        ? localStorage.getItem("recentProjectsSize")
        : 3,
      editorView: localStorage.getItem("editorView")
        ? localStorage.getItem("editorView")
        : "Column",
      localProject: !!JSON.parse(localStorage.getItem("localProject")),
      isJoinPerformanceModalOpen: false,
      projects : [],
    };
    this.openProjectEditor = this.openProjectEditor.bind(this);
  }


  openProjectEditor(projectId, projectName = "Local Project") {
    if (!!!projectId) {
      projectId = "new";
    }
    updateRecentProjects(projectId, projectName);
    this.props.history.push("/project-editor/" + projectId);
  }

  componentDidMount = async () => {
    this.loadProject();
    if (this.props.user) {
      fetchUserProjects()
        .then(data => {
          // console.log(data);
          this.setState({ projects: data });
          console.log(this.state.projects); 
        })
        .catch(error => {
          showToastrError(error);
        });
    } else {
      return;
    }
  };

  toggleJoinPerformanceModal = () =>
    this.setState({
      isJoinPerformanceModalOpen: !this.state.isJoinPerformanceModalOpen
    });

  handlePerformanceJoin() {
    let { performanceName } = this.state;

    fetchPerformance(performanceName)
      .then(res => {
        showToastr("success", "Joined performance successfully");
        window.location = "/performance/" + res.name;
      })
      .catch(err => {
        showToastr("error", "The performance doesn't exist!");
      });
  }

  loadProject = async () => {
    // case on the user, if there is no user logged in, then no
    // project get displayed
    var projectsShown = this.state.projectsShown;
  if (isUserLoggedIn() && this.props.user) {
      fetchUserProjects(projectsShown)
        .then(data => {
          this.setState({ projects: data });
        })
        .catch(error => {
          showToastrError(error);
        });
    } else {
      return;
    }
  };
  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };
  
  openSidenav = ( ) => {
    this.setState({
      wid: "360px"
    })
  }

  closeSideNav = () => {
    this.setState({
      wid: "100px"
    })
  }

  render() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    var recentP = localStorage.getItem("recentProjects")
      ? JSON.parse(localStorage.getItem("recentProjects"))
      : [];
    var projects = this.state.projects;
    console.log("projects: " + projects)
    return (
      <div id="projects-page-container">
        <div onMouseEnter={()=>{this.openSidenav()}} onMouseLeave={()=>{this.closeSideNav()}}>
          <SideNav width={this.state.wid}></SideNav>
        </div>
        
          <div id="projects-main-container">
            <div id="projects-library-header">
              <p className="text" style={{fontSize: 4 + "rem", fontStyle: "bold"}}>LIBRARY</p>
            </div>
            <div id="projects-create-project-btn-container">
              <Button id="projects-create-project-btn" onClick={() => this.openProjectEditor()}>NEW PROJECT</Button>
            </div>
            <div id="projects-name-label" className="text projects-label">NAME</div>
            <div id="projects-description-label" className="text projects-label">DESCRIPTION</div>
            <div id="projects-collaborator-label" className="text projects-label">COLLABORATORS</div>
            <div id="projects-date-label" className="text projects-label">CREATED</div>
            <div id="projects-launch-label" className="text projects-label">LAUNCH</div>
            
            <div id="projects-project-names" className="projects-column">
              <ListGroup className="projects-lists">
                {projects.map(o => {
                  return (
                    <ListGroupItem className="projects-name-item">
                        {o.name}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </div>
            <div id="projects-project-descriptions" className="projects-column">
              <ListGroup className="projects-lists">
                  {projects.map(o => {
                    return (
                      <ListGroupItem className="projects-name-item">
                          {o.description}
                      </ListGroupItem>
                    );
                  })}
              </ListGroup>
            </div>
            <div id="projects-project-collaborators" className="projects-column">
              <ListGroup className="projects-lists">
                    {projects.map(o => {
                      return (
                        <ListGroupItem className="projects-name-item">
                            {o.sharedUsers}
                        </ListGroupItem>
                      );
                    })}
                </ListGroup>
            </div>
            <div id="projects-project-dates" className="projects-column">
              <ListGroup className="projects-lists">
                  {projects.map(o => {
                    return (
                      <ListGroupItem className="projects-name-item">
                          {/* {timedifference(o.lastActive, Date.now() / 1000)} */}
                          {o.created_date.split("T")[0]}
                      </ListGroupItem>
                    );
                  })}
              </ListGroup>
            </div>
            <div id="projects-project-launch" className="projects-column">
              <ListGroup className="projects-lists">
                    {projects.map(o => {
                      return (
                        <ListGroupItem className="projects-name-item">
                            <Button
                              color="link"
                              onClick={() =>
                                this.openProjectEditor(o.project_id, o.name)
                              }
                              className="projects-launch-btn"
                            >
                              LAUNCH
                          </Button>{" "}
                        </ListGroupItem>
                      );
                    })}
              </ListGroup>
            </div>
          </div>
          
          {/* <Row className="py-1">
            <Col>
            <CardDeck className="mt-2">
              <Card
                className="mt-2"
                style={{
                  width: "35rem",
                  marginBottom: "8rem",
                  marginTop: "2rem",
                }}
              >
                <Card.Body>
                  <Card.Title>Tutorial</Card.Title>
                </Card.Body>
                <Carousel
                  itemClass="py-3 px-3"
                  responsive={responsive}
                  showDots={true}
                >
                  <iframe
                    title="guide1"
                    src="https://www.youtube.com/embed/zoZaVK7ysRM?rel=0"
                    frameBorder="0"
                  ></iframe>
                </Carousel>
                {/* <Card.Body> */}
                {/* <Card.Title>Tutorial</Card.Title> */}
                <div style={{ height: "5rem" }}></div>

                <Card.Img
                  variant="top"
                  src={dummy}
                  alt="Description of Image"
                />
              </Card>
            </CardDeck>
          </Col>
          <Col>
            {isUserLoggedIn() ? (
              <Row className="mb-3">
                <Col md={6}>
                  <Button
                    block
                    onClick={() => {
                      localStorage.setItem("localProject", null);
                      this.openProjectEditor();
                    }}
                    style={{
                      marginTop: "5rem",
                      marginLeft: "2rem",
                      backgroundColor: "#4c9fb5",
                      color: "white",
                    }}
                  >
                    Start New Project
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    block
                    onClick={() => {
                      this.props.history.push("/"); // Redirecting to the homepage
                    }}
                    style={{
                      marginTop: "5rem",
                      marginLeft: "2rem",
                      backgroundColor: "#4c2fa2",
                      color: "white",
                    }}
                  >
                    Back to Home
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row className="mb-3">
                <Col>
                  <Button
                    block
                    onClick={() => {
                      localStorage.setItem("localProject", null);
                      this.openProjectEditor();
                    }}
                    style={{
                      marginTop: "5rem",
                      marginLeft: "2rem",
                      backgroundColor: "#F4D018",
                      color: "black",
                    }}
                  >
                    Start New Project
                  </Button>
                </Col>
              </Row>
            )}
            {isUserLoggedIn() ? (
              <Row className="mb-3">
                <Col md={6}>
                  <Button
                    block
                    onClick={this.toggleJoinPerformanceModal}
                    style={{
                      marginTop: "3rem",
                      marginLeft: "2rem",
                      backgroundColor: "#F4D018",
                      color: "white",
                    }}
                  >
                    Join Performance
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    block
                    onClick={() => {
                      this.props.history.push("/projectsList"); // Redirecting to the projects menu
                    }}
                    style={{
                      marginTop: "3rem",
                      marginLeft: "2rem",
                      backgroundColor: "#3679f6",
                      color: "white",
                    }}
                  >
                    Projects Menu
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row className="mb-3">
                <Col>
                  <Button
                    style={{
                      marginBottom: "5rem",
                      marginLeft: "2rem",
                      marginTop: "3rem",
                      backgroundColor: "#F4D018",
                      color: "black",
                    }}
                    block
                    onClick={this.toggleJoinPerformanceModal}
                  >
                    Share Project
                  </Button>
                </Col>
              </Row>
            )}
            {this.state.localProject && (
              <Button
                color="#FFEB3B"
                block
                onClick={() => this.openProjectEditor()}
              >
                {" "}
                Resume Local Project{" "}
              </Button>
            )}
            <Row className="py-1">
              <Card
                style={{
                  width: "35rem",
                  marginTop: "8rem",
                  marginLeft: "4rem",
                }}
              >
                <Card.Body>
                  <Card.Title>Recent Projects</Card.Title>
                </Card.Body>
                {!isUserLoggedIn() && (
                  <Card.Body>Please Login to access</Card.Body>
                )}

                {isUserLoggedIn() && (
                  <>
                    <ListGroup>
                      {!!projects &&
                        projects.map((o) => {
                          return (
                            <ListGroupItem
                              key={o.project_id} // <-- Add a unique key here
                              className=" d-flex justify-content-between align-items-center"
                            >
                              <Button
                                color="link"
                                onClick={() =>
                                  this.openProjectEditor(o.project_id, o.name)
                                }
                              >
                                {o.name}
                              </Button>{" "}
                            </ListGroupItem>
                          );
                        })}
                    </ListGroup>
                  </>
                )}
              </Card>
            </Row>
            </Col>
          </Row>
          
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
          </Modal> */}
      </div>
    );
  }
}

export default withRouter(ProjectHome);