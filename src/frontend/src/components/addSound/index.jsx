import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ReactAudioPlayer from "react-audio-player";
import {
  serveAudio,
  fetchAudio,
  getAudio,
  youtubeAudio
} from "../sounds/actions";
import ReactTable from "react-table";
import { isUserLoggedIn, showToastrError } from "../../actions/common";

class AddSound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isModalOpen: false,
      fileName: ""
    };
  }

  addSound = () => {
    if (isUserLoggedIn()) {
      fetchAudio()
        .then(data => {
          this.setState({ sounds: data.audios });
          this.toggleModal();
        })
        .catch(error => {
          showToastrError(error);
        });
    } else {
      alert("You should be logged in to perform this action");
    }
  };

  filterSounds = sound => {
    let qry = this.state.search;
    if (qry === "") return true;
    else if (sound.name.toLowerCase().includes(qry.toLowerCase())) return true;
    else return false;
  };

  selectSound = sound => {
    this.toggleModal();
    this.props.onSoundSelect(sound);
  };

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  async getAudioUrl(sound_id) {
    if (!this.state[sound_id]) {
      this.state[sound_id] = 1;
      await getAudio(sound_id).then(res => {
        this.setState({ [sound_id]: res["location"] });
      });
    }
  }

  renderSounds = sounds => {
    const columns = [
      {
        Header: "Name",
        accessor: "name" // String-based value accessors!
      },
      {
        Header: "Control",
        accessor: "control" // Custom cell components!
      },
      {
        Header: "Action",
        accessor: "action"
      }
    ];
    let data = [];

    sounds.forEach(sound => {
      let { name, type, sound_id } = sound;
      let src;
      if (type === "Sound Link") {
        this.getAudioUrl(sound_id);
      } else if (type === "Youtube") {
        src = youtubeAudio(sound_id);
      } else {
        src = serveAudio(sound_id);
      }
      data.push({
        name: name,
        control: (
          <ReactAudioPlayer
            style={{
              width: "100%",
              borderColor: "#333",
              minWidth: "200px"
            }}
            src={src ? src : this.state[sound_id]}
            autoPlay={false}
            controls
          />
        ),
        action: (
          <div className="col-sm-12 text-center">
            <button
              className="btn btn-info text-center"
              onClick={() => this.selectSound(sound)}
            >
              Select
            </button>
          </div>
        )
      });
    });
    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={5}
        className="-striped -highlight"
      />
    );
  };

  render() {
    const { sounds } = this.state;
    setTimeout(() => {
      this.setState({ fileName: this.props.minimal
          ? ''
          : !this.props.file
            ? 'Please select a sound'
            : this.props.file.no
              ? `❕${this.props.file.name}`
              : `${this.props.file.name}` });
    }, 1000);
    return (
      <React.Fragment>
        <p style={{ fontSize: "0.64rem", marginBottom: "0" }}>
          {this.state.fileName}
          {" "}
          <button
            className="btn btn-info"
            style={
              this.props.minimal
                ? {
                  fontSize: "0.64rem",
                  width: "40px",
                  lineHeight: "1",
                  margin: "0px",
                  padding: "0.2rem"
                }
                : { fontSize: "0.64rem", lineHeight: "1.0" }
            }
            onClick={this.addSound}
          >
            {this.props.file && this.props.file.name
              ? this.props.minimal
                ? this.props.file.no ? `❕${this.props.file.name}` : `${this.props.file.name}`
                : "Upd"
              : "Snd"}
          </button>
        </p>
        <Modal
          size="lg"
          centered
          show={this.state.isModalOpen}
          onHide={this.toggleModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select a sound</Modal.Title>
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
