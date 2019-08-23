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

  renderSounds = sounds =>
    sounds.map((sound, index) => {
      let { sound_id, name, fileLocation } = sound;
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{sound_id}</td>
          <td>{name}</td>
          <td>
            <ReactAudioPlayer
              style={{ width: "100%", borderColor: "#333", minWidth: "200px" }}
              src={fileLocation}
              autoPlay={false}
              controls
            />
          </td>
          <td></td>
          <td>
            <button className="btn btn-info">
              <i class="fas fa-share-alt" aria-hidden="true"></i>
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={() => this.handleRemoveAudio(sound_id, fileLocation)}>
              <i class="fas fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
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
            <BreadcrumbItem active>Sounds</BreadcrumbItem>
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
                Import Sound
              </button>
            </h3>
            <hr />
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Controls</th>
              <th scope="col">Shared With</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderSounds(sounds)}</tbody>
        </table>
      </div>
    );
  }
}

export default Sounds;
