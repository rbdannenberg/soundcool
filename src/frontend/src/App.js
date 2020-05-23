import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { instanceOf } from 'prop-types';

import Main from "./router";
import "./App.css";

import { StoreX as Store } from "./storeX";
import { ToastContainer } from "react-toastify";
import { validateUser } from "./actions/validation";
import { showToastrError } from "./actions/common";
import { withCookies, Cookies } from "react-cookie";
import store from "./store";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
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
    const { cookies } = this.props;
    console.log(cookies.get("token"));
    let token = cookies.get("token") || "";
    if (!token || token === "") {
      //if there is no token, dont bother
      return;
    }
    validateUser(token)
      .then(res => {
        cookies.set("token", res.token);
      })
      .catch(err => {
        cookies.remove("token");
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

export default withCookies(App);
