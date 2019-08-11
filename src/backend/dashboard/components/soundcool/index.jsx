import React from "react";
import  Main  from "../router";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { Store } from "../store"
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    if(token)
      Store.populateFromProps({userToken:{email:undefined,token:token}})
  }
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
