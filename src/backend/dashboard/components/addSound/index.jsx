import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { fetchAudio } from "./actions";
import ReactAudioPlayer from "react-audio-player";
import { serveAudio } from "../sounds/actions";
import { MDBDataTable } from "mdbreact";

class AddSound extends Component {
  constructor(props) {
    super();
    this.state = {
      search: "",
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

  filterSounds = sound => {
    let qry = this.state.search;
    if (qry == "") return true;
    else if (sound.name.toLowerCase().includes(qry.toLowerCase())) return true;
    else return false;
  };

  selectSound = sound => {
    this.toggleModal();
    this.props.onSoundSelect(sound);
  };

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  renderSounds = sounds => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150
        },
        {
          label: "Control",
          field: "control",
          sort: "asc",
          width: 270
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 200
        }
      ],
      rows: []
    };
    sounds.forEach(sound => {
      let { name, sound_id } = sound;
      const row = {
        name: name,
        control: (
          <ReactAudioPlayer
            style={{ width: "100%", borderColor: "#333", minWidth: "200px" }}
            src={serveAudio(sound_id)}
            autoPlay={false}
            controls
          />
        ),
        action: (
          <button
            className="btn btn-info"
            onClick={() => this.selectSound(sound)}
          >
            Select
          </button>
        )
      };
      data["rows"].push(row);
    });
    return <MDBDataTable  striped bordered small data={data} />;
  };

  render() {
    const { sounds } = this.state;
    return (
      <React.Fragment>
        <p>
          {this.props.file ? this.props.file.name : "Please select a sound"}{" "}
          <button
            className="btn btn-info"
            style={{ fontSize: "0.8rem" }}
            onClick={this.addSound}
          >
            {this.props.file && this.props.file.name
              ? "Update sound"
              : "Select Sound"}
          </button>
        </p>
        <Modal
          size="lg"
          centered
          show={this.state.isModalOpen}
          onHide={this.toggleModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create new account</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflowX: "auto" }}>
            {/* <div className="float-right">
              <input
                className="search"
                style={{ marginRight: "10px" }}
                type="text"
                placeholder="Search.."
                onChange={e => {
                  this.setState({ search: e.target.value });
                }}
              ></input>
            </div> */}
            {sounds && this.renderSounds(sounds.filter(this.filterSounds))}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddSound;
