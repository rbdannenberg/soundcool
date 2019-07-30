import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Header from "./Header.jsx";
import Projects from "./Projects.jsx";
import Sounds from "./Sounds.jsx";
import Contact from "./Contact.jsx";
import jwtDecode from "jwt-decode";
import About from "./About.jsx";

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
