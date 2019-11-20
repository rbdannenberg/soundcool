import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/header";
import Projects from "./components/projects";
import Sounds from "./components/sounds";
import Contact from "./components/contact";
import jwtDecode from "jwt-decode";
import About from "./components/about";
import ProjectEditor from "./components/projectEditor";

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
          <Route path="/project-editor/:id" component={ProjectEditor} />
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
          <Route exact path="/about" component={() => <About leaders={[]} />} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Main;
