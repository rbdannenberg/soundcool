import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { fetchAudio } from "./actions";
import ReactAudioPlayer from "react-audio-player";

class AddSound extends Component {
  constructor(props) {
    super();
    this.state = {
      isModalOpen: false
    };
  }

  addSound = () => {
    fetchAudio()
      .then(data => {
        this.setState({ sounds: data.audios });
        this.toggleModal();
      })
      .catch(error => {
        showToastrError(error);
      });
  };

  selectSound = (sound) => {
    this.toggleModal();
    this.props.onSoundSelect(sound)
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  renderSounds = sounds =>
    sounds.map((sound) => {
      let {name, fileLocation } = sound;
      return (
        <tr>
          <td>{name}</td>
          <td>
            <ReactAudioPlayer
              style={{ width: "100%", borderColor: "#333", minWidth: "200px" }}
              src={fileLocation}
              autoPlay={false}
              controls
            />
          </td>
          <td>
            <button className="btn btn-info" onClick={()=>this.selectSound(sound)}>
              Select
            </button>
          </td>
        </tr>
      );
    });

  render() {
    const { sounds } = this.state;
    return (
      <React.Fragment>
      <p>{this.props.file ? this.props.file.name: "Please select a sound"} <button
        className="btn btn-info"
          style={{ fontSize: "0.8rem" }}
          onClick={this.addSound}
        >
          {this.props.file && this.props.file.name ? "Update sound" : "Select Sound"}
        </button></p>
        <Modal size='lg' centered show={this.state.isModalOpen} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create new account</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{overflowX: 'auto'}}>
          <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Controls</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>{sounds && this.renderSounds(sounds)}</tbody>
            </table>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddSound;
