import React from "react";
import Main from "./router";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateUser } from "./actions";
import { showToastrError } from "./common";

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem("jwtToken");
    if (token)
      Store.populateFromProps({
        userToken: { email: undefined, token: token }
      });
  }

  componentDidMount() {
    this.validateToken();
  }

  validateToken = () => {
    let token = sessionStorage.getItem("jwtToken");
    if (!token || token === "") {
      //if there is no token, dont bother
      return;
    }
    validateUser(token)
      .then(res => {
        sessionStorage.setItem("jwtToken", res.token);
      })
      .catch(err => {
        sessionStorage.clear();
        showToastrError({ error: "Session expired" });
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            pauseOnVisibilityChange={true}
            draggable={false}
            pauseOnHover={true}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
