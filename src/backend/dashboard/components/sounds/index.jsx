import React from "react";
import { removeAudio, uploadSound, fetchAudio } from "./actions";
import ReactAudioPlayer from "react-audio-player";
import { showToastr, showToastrError } from "../common";
import {
  Card,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";


class Sounds extends React.Component {
  state = {
    sounds: [],
    sound: {
      name: "",
      description: ""
    }
  };

  componentDidMount = () => {
    if (this.props.user) {
      fetchAudio()
        .then(data => {
          this.setState({ sounds: data.data });
        })
        .catch(error => {
          showToastrError(error);
        });
    }
  };

  RenderSoundMenuItem({ name, sound_id, fileLocation }) {
    return (
      <Card
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333", width: "100%" }}
      >
        <CardTitle>{name}</CardTitle>
        {/* <Link to={`/soundmenu/${sound_id}`}> */}
        <ReactAudioPlayer
          style={{ width: "100%", borderColor: "#333" }}
          src={fileLocation}
          autoPlay={false}
          controls
        />
        <br />
        <Button
          className="btn btn-warning"
          onClick={() => this.handleRemoveAudio(sound_id, fileLocation)}
        >
          Delete Audio
        </Button>
        {/* </Link> */}
      </Card>
    );
  }

  handleRemoveAudio(soundId, fileLocation) {
    removeAudio({ soundId, fileLocation })
      .then(data => {
        showToastr("success", "Audio deleted successfully");
        this.setState({
          sounds: this.state.sounds.filter(function(sound) {
            console.log(sound, sound.sound_id, soundId);
            return sound.sound_id !== soundId;
          })
        });
      })
      .catch(error => {
        showToastrError(error);
      });
  }

  menu = sounds =>
    sounds.map(sound => {
      let { sound_id } = sound;
      return (
        <div className="row col-12 col-md-6">
          <div key={sound_id} className="col-12 col-md-8 m-1 mb-3">
            {this.RenderSoundMenuItem(sound)}
          </div>
        </div>
      );
    });

  render() {
    const handleFileChosen = file => {
      const data = new FormData();
      data.append("file", file);
      uploadSound(data)
        .then(data => {
          showToastr("success", "Audio added successfully");
          this.upload.value = "";
          this.setState({ sounds: [...this.state.sounds, data] });
        })
        .catch(error => {
          showToastrError(error);
        });
    };
    const { sounds } = this.state;
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
            <h3>
              Menu
              <input
                style={{ display: "none" }}
                ref={ref => (this.upload = ref)}
                type="file"
                id="soundFile"
                name="sound"
                accept=".wav"
                onChange={e => handleFileChosen(e.target.files[0])}
                className="btn btn-info float-right"
              />
              <button
                className="btn btn-info float-right"
                onClick={e => this.upload.click()}
              >
                Add Sound
              </button>
            </h3>
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
