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
  updateRecentProjects,
} from "../../actions/common";
import { fetchUserProjects } from "./actions";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput.jsx";

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    this.loadProject();
  }
  toggleJoinPerformanceModal = () =>
    this.setState({
      isJoinPerformanceModalOpen: !this.state.isJoinPerformanceModalOpen,
    });

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

  loadProject = async () => {
    // case on the user, if there is no user logged in, then no
    // project get displayed
    var projectsShown = this.state.projectsShown;
    if (isUserLoggedIn() && this.props.user) {
      fetchUserProjects(projectsShown)
        .then((data) => {
          this.setState({ projects: data });
        })
        .catch((error) => {
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

  render() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    var recentP = localStorage.getItem("recentProjects")
      ? JSON.parse(localStorage.getItem("recentProjects"))
      : [];
    var { projects } = this.state;
    return (
      <div className="container">
        <Row className="py-1">
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
                  <Card.Title>Getting Started</Card.Title>
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
              </Card>
              <Row className="py-1">
                <Card style={{ width: "35rem", marginRight: "4rem" }}>
                  <Card.Body>
                    <Card.Title>Recent Projects</Card.Title>
                  </Card.Body>
                  <ListGroup>
                    {recentP.map((o) => {
                      return (
                        <ListGroupItem
                          key={o.id} // <-- Add a unique key here
                          className=" d-flex justify-content-between align-items-center"
                        >
                          <Button
                            color="link"
                            onClick={() =>
                              this.openProjectEditor(o.id, o.projectName)
                            }
                          >
                            {o.projectName}
                          </Button>{" "}
                          <Badge color="primary" pill>
                            {timedifference(o.lastActive, Date.now() / 1000)}
                          </Badge>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </Card>
              </Row>
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
                  <Card.Title>Cloud Projects</Card.Title>
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
                    {/* <Card.Body>
                      <Card.Link href="/projectsList">Projects Menu</Card.Link>
                    </Card.Body> */}
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
        </Modal>
      </div>
    );
  }
}

export default withRouter(DashboardHome);
