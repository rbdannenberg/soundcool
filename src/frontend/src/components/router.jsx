import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Header from "./header";
import Projects from "./projects";
import Sounds from "./sounds";
import Contact from "./contact";
import jwtDecode from "jwt-decode";
import About from "./about";
import ProjectEditor from "./projectEditor";

class Main extends Component {
    state = {};

    componentDidMount() {
        try {
            const jwt = sessionStorage.getItem("jwtToken");
            const user = jwtDecode(jwt);
            this.setState({ user: user });
        } catch (ex) {}
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <Header user={user} />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route
                        path="/project-editor/:id"
                        component={ProjectEditor}
                    />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route
                        exact
                        path="/projects"
                        component={() => <Projects user={user} />}
                    />
                    <Route
                        exact
                        path="/sounds"
                        component={() => <Sounds user={user} />}
                    />
                    <Route exact path="/contact" component={Contact} />
                    <Route
                        exact
                        path="/about"
                        component={() => <About leaders={[]} />}
                    />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default Main;
