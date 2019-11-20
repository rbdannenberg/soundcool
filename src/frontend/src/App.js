import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Main from "./router";
import "./App.css";

import { StoreX as Store } from "./storeX";
import { ToastContainer } from "react-toastify";
import { validateUser } from "./actions/validation";
import { showToastrError } from "./actions/common";

import store from "./store";

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
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
