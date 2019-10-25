import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-table/react-table.css";
import "bootstrap-social/bootstrap-social.css";
import "./index.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
