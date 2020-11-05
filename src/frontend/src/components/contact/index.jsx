import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

// const required = val => val && val.length;
// const maxLength = len => val => !val || val.length <= len;
// const minLength = len => val => val && val.length >= len;
// const isNumber = val => !isNaN(Number(val));
// const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    // console.log("current state:", values);
    alert("current state:" + JSON.stringify(values));
  }

  // render() {
  //   return <div>hello</div>;
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Contact us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact us</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h5>Our Address</h5>
            <address>
              Roger B. Dannenberg <br />
              School of Computer Science <br />
              Carnegie Mellon University <br />
              5000 Forbes Avenue <br />
              Pittsburgh, PA <br />
              USA <br />
              <i className="fa fa-envelope fa-lg" />:{" "}
              <a href="mailto:rbd+soundcool@cs.cmu.edu">rbd+soundcool@cs.cmu.edu</a>
            </address>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-success"
                href="mailto:rbd+soundcool@cs.cmu.edu"
              >
                <i className="fa fa-envelope-o" /> Email
              </a>
            </div>
          </div>
        </div>

        {/* TODO: Page send us feedback */}
      </div>
    );
  }
}

export default Contact;
