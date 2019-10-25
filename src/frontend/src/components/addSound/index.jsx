import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ReactAudioPlayer from "react-audio-player";
import { serveAudio, fetchAudio } from "../sounds/actions";
import ReactTable from "react-table";
import { showToastrError } from "../common";

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
      let { name, sound_id } = sound;
      data.push({
        name: name,
        control: (
          <ReactAudioPlayer
            style={{
              width: "100%",
              borderColor: "#333",
              minWidth: "200px"
            }}
            src={serveAudio(sound_id)}
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
