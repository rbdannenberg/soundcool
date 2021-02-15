import React from "react";
import { Provider } from "react-redux";

import Main from "./router";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-table/react-table.css";

import { StoreX as Store } from "./storeX";
import { ToastContainer } from "react-toastify";
import { validateUser } from "./actions/validation";
import { showToastrError } from "./actions/common";
import store from "./store";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = cookies.get("token") || "";
    if (token)
      Store.populateFromProps({
        userToken: { email: undefined, token: token }
      });
  }

  componentDidMount() {
    this.validateToken();
  }

  validateToken = () => {
    let token = cookies.get("token") || "";
    if (!token || token === "") {
      //if there is no token, dont bother
      return;
    }
    validateUser(token)
      .then(res => {
        cookies.set("token", token, { path: "/" });
      })
      .catch(err => {
        cookies.remove("token", { path: "/" });
        cookies.remove("token", { path: "/project-editor" });
        showToastrError({ error: "Session expired" });
      });
  };

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
