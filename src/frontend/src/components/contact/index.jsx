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
    console.log("current state:", values);
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
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              5000 Forbes Avenue
              <br />
              Pittsburgh, PA
              <br />
              USA
              <br />
              <i className="fa fa-phone fa-lg" />: +852 1234 5678
              <br />
              <i className="fa fa-fax fa-lg" />: +852 8765 4321
              <br />
              <i className="fa fa-envelope fa-lg" />:{" "}
              <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone" /> Call
              </a>
              <a
                href="skype:YourSkypeName?call"
                role="button"
                className="btn btn-info"
              >
                <i className="fa fa-skype" /> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
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
