import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home.jsx";
import Login from "../login";
import Register from "../register";
import Header from "../Header.jsx";
import Projects from "../Projects";
import Sounds from "../sounds";
import Contact from "../Contact.jsx";
import jwtDecode from "jwt-decode";
import About from "../About.jsx";
import ProjectEditor from "../projectEditor"

class Main extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
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
          <Route path="/project-editor/:id" component={ProjectEditor}/>
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
        </Switch>
      </div>
    );
  }
}

export default Main;
