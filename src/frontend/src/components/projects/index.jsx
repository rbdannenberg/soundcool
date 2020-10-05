import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Carousel from 'react-multi-carousel';
import { withRouter } from "react-router-dom";
import { Badge, Button, Col, Input, Row } from "reactstrap";
import { isUserLoggedIn, showToastrError, timedifference, updateRecentProjects } from "../../actions/common";
import { fetchUserProjects } from "./actions";


class ProjectHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectsShown: localStorage.getItem('projectsShown') ? localStorage.getItem('projectsShown') : 3,
            recentPSize: localStorage.getItem('recentProjectsSize') ? localStorage.getItem('recentProjectsSize') : 3,
            editorView: localStorage.getItem('editorView') ? localStorage.getItem('editorView') : "Column",
            localProject: !!JSON.parse(localStorage.getItem('localProject')),
        }
        this.openProjectEditor = this.openProjectEditor.bind(this);
    }

    openProjectEditor(projectId, projectName = "Local Project") {
        if (!(!!projectId)) {
            projectId = "new";
        }
        updateRecentProjects(projectId, projectName);
        this.props.history.push('/project-editor/' + projectId);
    }

    componentDidMount() {
        this.loadProject();
    };

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
        var recentP = localStorage.getItem('recentProjects') ? JSON.parse(localStorage.getItem('recentProjects')) : [];
        var { projects } = this.state;
        return (
            <div className="container">
                <Row className="py-1">
                    <Col><Button color="primary" block onClick={() => { localStorage.setItem('localProject', null); this.openProjectEditor() }} > Start New Project </Button></Col>
                    <Col></Col>
                    <Col>{this.state.localProject && <Button color="warning" block onClick={() => this.openProjectEditor()}> Resume Local Project </Button>}</Col>
                </Row>
                <CardDeck className="mt-2">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Recent Projects</Card.Title>
                        </Card.Body>
                        <ListGroup>
                            {recentP.map((o) => {
                                return <ListGroupItem className=" d-flex justify-content-between align-items-center">
                                    <Button color="link" onClick={() => this.openProjectEditor(o.id, o.projectName)}>{o.projectName}</Button>{" "}
                                    <Badge color="primary" pill>
                                        {timedifference(o.lastActive, Date.now() / 1000)}
                                    </Badge>
                                </ListGroupItem>;
                            })}
                        </ListGroup>
                    </Card>

                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Cloud Projects</Card.Title>
                        </Card.Body>
                        {!isUserLoggedIn() && (<Card.Body>Please Login to access</Card.Body>)}

                        {isUserLoggedIn() && (<><ListGroup>
                            {!!projects && projects.map((o) => {
                                return <ListGroupItem className=" d-flex justify-content-between align-items-center">
                                    <Button color="link" onClick={() => this.openProjectEditor(o.project_id, o.name)}>{o.name}</Button>{" "}
                                </ListGroupItem>;
                            })}
                        </ListGroup>
                            <Card.Body>
                                <Card.Link href="/projectsList">Complete Dashboard</Card.Link>
                            </Card.Body></>)}
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Configuration</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem className=" d-flex justify-content-between align-items-center">
                                Default View{" "}
                                <Input onChange={(e) => { localStorage.setItem('editorView', e.target.value); this.setState({ editorView: e.target.value }); }} style={{ width: "120px" }} value={this.state.editorView} type="select" name="select" id="exampleSelect">
                                    <option>Column</option>
                                    <option>Floating</option>
                                </Input>
                            </ListGroupItem>
                            <ListGroupItem className=" d-flex justify-content-between align-items-center">
                                Max Recent Project{" "}
                                <Input onChange={(e) => { localStorage.setItem('recentProjectsSize', e.target.value); this.setState({ recentPSize: e.target.value }); }} style={{ width: "120px" }} type="select" name="select" value={this.state.recentPSize} id="exampleSelect">
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                </Input>
                            </ListGroupItem>
                            <ListGroupItem className=" d-flex justify-content-between align-items-center">
                                Max Cloud Project{" "}
                                <Input onChange={(e) => { localStorage.setItem('projectsShown', e.target.value); this.setState({ projectsShown: e.target.value }, () => this.loadProject()); }} style={{ width: "120px" }} type="select" name="select" value={this.state.projectsShown} id="exampleSelect">
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                </Input>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <Card className="mt-2">
                    <Card.Body>
                        <Card.Title>Guide</Card.Title>
                    </Card.Body>
                    <Carousel itemClass="py-3 px-3" responsive={responsive} showDots={true}>
                        <iframe title="guide1" src="https://www.youtube.com/embed/zoZaVK7ysRM?rel=0" frameborder="0"></iframe>
                        <iframe title="guide2" src="https://www.youtube.com/embed/eobcIXsifdA?rel=0" frameborder="0"></iframe>
                        <iframe title="guide3" src="https://www.youtube.com/embed/ueNVlhKOujw?rel=0" frameborder="0"></iframe>
                    </Carousel>
                </Card>
            </div>
        );
    }
}


export default withRouter(ProjectHome);
