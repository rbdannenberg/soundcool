import React, { Component } from 'react';
import { Button, Row, Modal, ModalHeader, ModalBody, Container, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class RegisterForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values){
        this.toggleModal();

        // this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div className>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Register</span>
                </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="firstname" md={3}>First Name</Label>
                                        <Col md={9}>
                                            <Control.text model=".firstname" id="firstname" name="firstname" placeholder="First Name" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".firstname" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="lastname" md={3}>Last Name</Label>
                                        <Col md={9}>
                                            <Control.text model=".lastname" id="lastname" name="lastname" placeholder="Last Name" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".lastname" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="username" md={3}>User name</Label>
                                        <Col md={9}>
                                            <Control.text model=".username" id="username" name="username" placeholder="username" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".username" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="password" md={3}>Password</Label>
                                        <Col md={9}>
                                            <Control.text model=".password" id="password" name="password" placeholder="password" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".password" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
            </div>
        );
    }
}

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            // username="",
            // password="",
            isModalOpen : false
        };

        this.toggleModal = this.toggleModal.bind(this);
        
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    render(){
        return(
            <React.Fragment>
                <div className="row container-fluid justify-content-center">
                <Form className="mt-5 col-4 text-center" onSubmit={this.handleSubmit}>
                    <h2>Sign in</h2>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={(input) => this.username = input } />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={(input) => this.password = input } />
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input } />
                                    Remember me
                                </Label>
                            </FormGroup>
                                <Link to="/home">
                                    <Button className="m-3" type="submit" value="submit" color="primary">Submit</Button>
                                </Link>
                            <RegisterForm/>
                            <br/>
                        </Form>
                    </div>
               
            </React.Fragment>
        );
    }

}