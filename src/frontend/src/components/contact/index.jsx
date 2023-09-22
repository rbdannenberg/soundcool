import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import emailjs from "emailjs-com";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import "./contact.css";

const SERVICE_ID = "service_55v0vbb";
const TEMPLATE_ID = "template_pe0ldvo";
const USER_ID = "nRbuE3-vBaJhuoJ6H";

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
  handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully"
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        })
      });
    e.target.reset()
  };
  render() {
    return (
        <div className="page-container">
          
          <div className="content-container">
            <Form id="contact-form" onSubmit={this.handleOnSubmit}>
            <div id="contact-title">CONTACT US</div>
            <Form.Field
                id='form-input-control-email'
                control={Input}
                label='Email'
                name='reply_to'
                placeholder='Email…'
                required
                icon='mail'
                iconPosition='left'
            />
            <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Name'
                name='from_name'
                placeholder='Name…'
                required
                icon='user circle'
                iconPosition='left'
            />
            <Form.Field
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Message'
                name='message'
                placeholder='Message…'
                required
            />
            <Button type='submit' color='green'>Submit</Button>
            </Form>
            </div>
        </div>
    );
  }
}

export default Contact;
