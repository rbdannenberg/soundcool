import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderSoundMenuItem ({sound, onClick}) {
    return (
        <Card>
            <Link to={`/soundmenu/${sound.id}`} >
                <CardImg width="100%" src={sound.image} alt={sound.name} />
                <CardImgOverlay>
                    <CardTitle>{sound.id}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const SoundMenu = props => {
    const menu = props.sounds.map(sound => {
        return (
                <div className="row col-12 col-md-6">
                    <div key={sound.id} className="col-12 col-md-8 m-1 mb-3">
                        <RenderSoundMenuItem sound={sound} />
                    </div>
                    <div>
                        <Button className="mt-5 mr-2" color="primary" size="sm" >Play</Button>
                        <Button className="mt-5"color="secondary" size="sm" onClick={()=> props.removeSoundFile(sound.id)}>Delete</Button>
                    </div>
            </div>
        )
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>SoundMenu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {menu}
            </div>
            <div className="row col-sm-12 col-md-6 offset-md-4 p-5" >
                <SoundForm addSoundFile={props.addSoundFile}/>
            </div>
        </div>
    );
}

export default SoundMenu;

export class SoundForm extends Component {
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
        this.props.addSoundFile(values.name, values.image, values.description);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Add Sound File</span>
                </Button>

                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Add Sound File</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="name" md={2}>File Name</Label>
                                        <Col md={10}>
                                            <Control.text model=".name" id="name" name="name" placeholder="File Name" className="form-control" />
                                            {/* <Errors className="text-danger" model=".name" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} /> */}
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="file" md={2}>Source</Label>
                                        <Col md={10}>
                                            <Control.text model=".file" id="file" name="file" placeholder="Source" className="form-control" />
                                            {/* <Errors className="text-danger" model=".file" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} /> */}
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="desciption" md={2}>Your desciption</Label>
                                        <Col md={10}>
                                            <Control.textarea model=".description" id="description" name="description" rows="6" className="form-control" />
                                            {/* <Errors className="text-danger" model=".description" show="touched" messages={{ required: 'Required'}} /> */}
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}