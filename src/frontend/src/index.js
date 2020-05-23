import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { CookiesProvider } from "react-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-table/react-table.css";
import "bootstrap-social/bootstrap-social.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
