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

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { cookies } = this.props;
    console.log(cookies);
    try {
      const jwt = cookies.get("token");
      const user = jwtDecode(jwt);
      this.setState({ user: user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    const { cookies } = this.props;
    return (
      <div>
        <Header user={user} name={cookies.get("name")} />
        <Switch>
          <Route path="/signIn" component={Login} />
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
          <Route
            exact
            path="/about"
            component={() => (
              <About
                leaders={[
                  {
                    id: 1,
                    name: "Roger Dannenberg",
                    description: "description"
                  },
                  {
                    id: 2,
                    name: "Jorge Sastre Martinez",
                    description: "description"
                  },
                  { id: 3, name: "Amit Meena", description: "description" },
                  { id: 4, name: "Ankit Joshi", description: "description" },
                  { id: 5, name: "Manuel Alcañiz", description: "description" },
                  { id: 6, name: "Huan Zhang", description: "description" }
                ]}
              />
            )}
          />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withCookies(Main);
