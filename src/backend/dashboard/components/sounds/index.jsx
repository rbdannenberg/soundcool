import React from "react";
import {
  removeAudio,
  uploadSound,
  fetchAudio,
  toggleAudioSharing,
  serveAudio
} from "./actions";
import ReactAudioPlayer from "react-audio-player";
import { showToastr, showToastrError } from "../common";
import ReactTooltip from "react-tooltip";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

class Sounds extends React.Component {
  state = {
    sounds: [],
    sound: {
      name: "",
      description: ""
    },
    audioSharing: false
  };

  componentDidMount = () => {
    if (this.props.user) {
      fetchAudio()
        .then(data => {
          console.log(data.audios);
          this.setState({ sounds: data.audios, audioSharing: data.sharing });
        })
        .catch(error => {
          showToastrError(error);
        });
    }
  };

  handleRemoveAudio(soundId) {
    var r = confirm("Do you want to delete media " + soundId);
    if (r == true) {
      removeAudio({ soundId })
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
  }
  renderSounds = sounds =>
    sounds.map((sound, index) => {
      let { sound_id, name } = sound;
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{sound_id}</td>
          <td>{name}</td>
          <td>
            <ReactAudioPlayer
              style={{ width: "100%", borderColor: "#333", minWidth: "200px" }}
              src={serveAudio(sound_id)}
              autoPlay={false}
              controls
            />
          </td>
          <td>
            <button
              data-tip="Delete media"
              className="btn btn-danger"
              onClick={() => this.handleRemoveAudio(sound_id)}
            >
              <i class="fas fa-trash" aria-hidden="true"></i>
            </button>
          </td>
          <ReactTooltip place="top" type="dark" effect="float" />
        </tr>
      );
    });

  render() {
    const toggleAudioS = () => {
      toggleAudioSharing({ sharing: !this.state.audioSharing })
        .then(data => {
          data.sharing
            ? showToastr("success", "Audio sharing turned on")
            : showToastr("success", "Audio sharing turned off");
          this.setState({ audioSharing: data.sharing });
        })
        .catch(error => {
          showToastrError(error);
        });
    };
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
            <h3>Menu</h3>
            <div className="float-right">
              <input
                style={{ display: "none" }}
                ref={ref => (this.upload = ref)}
                type="file"
                id="soundFile"
                name="sound"
                accept=".wav"
                onChange={e => handleFileChosen(e.target.files[0])}
                className="btn btn-info"
              />
              <button className="btn btn-warning" onClick={toggleAudioS}>
              Make Media Public :{this.state.audioSharing ? " Yes" : " No"}
              </button>
              &nbsp;
              <button
                className="btn btn-info"
                onClick={e => this.upload.click()}
              >
                Import Sound
              </button>
            </div>
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Controls</th>
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
