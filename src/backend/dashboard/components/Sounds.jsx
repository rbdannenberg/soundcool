import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function RenderSoundMenuItem({ sound_id, name }) {
  return (
    <Card>
      <Link to={`/soundmenu/${sound_id}`}>
        <CardImg width="100%" src="/assets/images/samplewave.jpg" alt={name} />
        <CardImgOverlay>
          <CardTitle>{sound_id}</CardTitle>
          <CardTitle>{name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const apiEndpoint = "/api/sounds";

class Sounds extends React.Component {
  state = {
    sounds: [],
    sound: {
      name: "",
      description: ""
    }
  };

  componentDidMount = async () => {
    // case on the user, if there is no user logged in, then no
    // sound get displayed
    if (this.props.user) {
      const { data } = await axios.get(apiEndpoint, {
        headers: { user_id: this.props.user.id }
      });
      this.setState({ sounds: data.data });
    } else {
      return;
    }
  };

  menu = sounds =>
    sounds.map(sound => {
      let { sound_id, name } = sound;
      return (
        <div className="row col-12 col-md-6">
          <div key={sound_id} className="col-12 col-md-8 m-1 mb-3">
            <RenderSoundMenuItem sound={sound} />
          </div>
          <div>
            <Button className="mt-5 mr-2" color="primary" size="sm">
              Play
            </Button>
            <Button
              className="mt-5"
              color="secondary"
              size="sm"
              // onClick={() => this.props.removeSoundFile(sound.sound_id)}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    });

  render() {
    const { sounds, sound } = this.state;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>SoundMenu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        {/* <div className="row">{sounds.map(this.renderSounds)}</div> */}
        <div className="row">{this.menu(sounds)}</div>
      </div>
    );
  }
}

export default Sounds;
