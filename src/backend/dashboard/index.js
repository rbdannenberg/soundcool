import React, { Component } from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-table/react-table.css' 
// import 'font-awesome/css/font-awesome.min.css';
import "bootstrap-social/bootstrap-social.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/soundcool";
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
