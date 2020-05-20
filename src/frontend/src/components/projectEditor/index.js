import React from "react";
import socketIOClient from "socket.io-client";

import "./index.css";
import { connect } from "react-redux";
import { default as RDraggable } from "react-draggable";
import WithHeader from "./Components/WithHeader";
import RegisterForm from "../register/form";
import AddBlock from "./Components/AddBlock";
import { StoreX as Store } from "../../storeX";
import {
  isUserLoggedIn,
  showToastr,
  showToastrError,
  baseAddress,
  cleanPayload
} from "../../actions/common";
import {
  updateProject,
  createProject,
  fetchUserProject,
  openPort
} from "./actions";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { specValues, audioDefaults } from "./Components/blockSpecs.jsx";
import { asyncAddBlock, loadProject } from "./thunks.js";
//import {specValues, audioDefaults} from "/Components/AddBlock.jsx";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
  boxShadow: isDragging
    ? `0 25px 50px rgba(255,20,147,0.50), 0 20px 15px rgba(255,20,147,0.42)`
    : ""
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = [];
  result.push({ value: sourceClone, id: droppableSource.droppableId });
  result.push({ value: destClone, id: droppableDestination.droppableId });

  return result;
};

const getListStyle = isDraggingOver => ({
  width: "16rem",
  background: isDraggingOver ? "lightblue" : "transparent"
});

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: baseAddress(),
      floatingView: this.props.projectControl.floatingView,
      projectId: this.props.match.params.id,
      items: [[], [], []],
      prevItems: this.props.blocks.bs,
      projectName: "",
      projectDescription: "",
      isModalOpen: false,
      isRegisterModalOpen: false,
      openPorts: []
    };
    this.canvasRef = React.createRef();
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getList = id => {
    let x = this.state["items"];
    return x[id.split("_")[1]];
  };
  onDragEnd = result => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    // console.log(source, destination);
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let finalResult = this.state.items;
      finalResult[parseInt(source.droppableId.split("_")[1])] = items;

      this.setState({ items: finalResult });
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      let finalResult = this.state.items;
      finalResult[parseInt(result[0]["id"].split("_")[1])] = result[0]["value"];
      finalResult[parseInt(result[1]["id"].split("_")[1])] = result[1]["value"];
      this.setState({
        items: finalResult
      });
    }
  };

  blockStyle = id => {
    const top = (id % 15) * 20 + "px";
    const left = (id % 15) * 20 + "px";
    const zIndex = this.state.selectedBlock
      ? id == this.state.selectedBlock
        ? 1
        : 0
      : 0;
    return {
      width: "316px",
      position: "absolute",
      top: top,
      left: left,
      zIndex: zIndex
    };
  };

  renderBlockList = (blocks, nowOut) => {
    // console.log(blocks);
    if (this.props.projectControl.floatingView) {
      let finalBlock = [];
      blocks.forEach(o => {
        finalBlock = finalBlock.concat(o);
      });
      return (
        <div
          className="box"
          style={{ left: "60px", top: "20px", height: "80vh", width: "155vh" }}
        >
          <div className="boxContainer">
            {finalBlock.map(b => (
              <RDraggable
                handle="strong"
                bounds="parent"
                onDrag={() => {
                  if (this.state.selectedBlock != b.id) {
                    this.setState({ selectedBlock: b.id });
                  }
                }}
                style={{ transform: "scale(0.7)" }}
              >
                <div
                  className="no-cursor"
                  onClick={() => {
                    this.setState({ selectedBlock: b.id });
                  }}
                  style={this.blockStyle(b.id)}
                >
                  <div>
                    <WithHeader
                      draggableButton={true}
                      key={b.id}
                      blockInfo={b}
                      nowOut={nowOut}
                    />
                  </div>
                </div>
              </RDraggable>
              // <ExampleWrapper />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {blocks.map((b, listIndex) => (
              <div style={{ paddingTop: "30px", paddingLeft: "60px" }}>
                {/* <h5 className="text-center">
                  {" "}
                  {"Columnn " + (listIndex + 1)}{" "}
                </h5> */}
                <Droppable droppableId={"droppable_" + listIndex}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {b.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div style={{ height: "80%", width: "80%" }}>
                                <WithHeader
                                  key={item.id}
                                  blockInfo={item}
                                  nowOut={nowOut}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </React.Fragment>
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id)
      this.setState({ projectId: nextProps.match.params.id }, () => {
        this.loadState();
      });
    if (this.state.prevItems !== nextProps.blocks.bs) {
      let length = this.state.items.length;
      let newValue = [];
      for (let i = 0; i < length; i++) {
        newValue[i] = [];
      }
      nextProps.blocks.bs.forEach(o => {
        this.state.items.every((arr, index) => {
          const found = arr.find(element => element["id"] == o["id"]);
          if (found == undefined)
            if (index == length - 1) {
              newValue[0].push(o);
            } else return true;
          else {
            newValue[index].push(o);
            return false;
          }
        });
      });
      this.setState({
        items: newValue,
        prevItems: nextProps.blocks.bs
      });
    }
  }

  componentDidMount() {
    console.log("mounted");
    this.loadState();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("openPort", data => {
      // console.log(data);
      this.setState({
        openPorts: data
      });
    });
    socket.on("oscData", data => {
      let portNumber = data.portNumber;
      let targetType = data.component;
      let targetComponent = this.findComponents(portNumber, targetType);
      // console.log(targetComponent);
      targetComponent.forEach(comp => {
        this.handleOscInput(comp, data);
      });
    });
  }

  findComponents(oscPort, targetType) {
    let components = [];
    this.props.blocks["bs"].forEach((comp, index) => {
      if (comp.osc && comp.oscPort == oscPort && comp.typeName == targetType) {
        components.push({ id: comp.id, index: index });
      }
    });
    return components;
  }

  handleOscInput(comp, data) {
    switch (data.component) {
      case "Delay":
        break;
      case "Transposer":
        break;
      case "Pan":
        break;
      case "Player":
        this.handleOscPlayer(comp.id, comp.index, data);
        break;
      case "SignalGen":
        break;
      case "GranSynth":
        break;
      case "Speaker":
        break;
      case "DirectInput":
        break;
      case "Pitch":
        break;
      case "Reverb":
        break;
      case "Routing":
        break;
      case "Mixer":
        this.handleOscMixer(comp.id, data);
        break;
      case "Oscilloscope":
        break;
      case "Spectroscope":
        break;
      case "SamplePlayer":
        this.handleOscSamplePlayer(comp.id, comp.index, data);
        break;
    }
  }

  handleOscSamplePlayer(id, index, data) {
    let field,
      value,
      num = {},
      ignore = false,
      ind;
    switch (data.type) {
      case "random":
        field = "random";
        value = data.value == 1 ? true : false;
        break;
      case "loop":
        field = "loop";
        value = data.value == 1 ? true : false;
        break;
      case "playbackSpeed":
        field = "speed";
        value = data.value * 2;
        break;
      case "volume":
        field = "masterVolume";
        value = Math.round(data.value * 100);
        break;
      case "playPause":
        ind = data.value[0] - 1;
        if (
          data.value[1] == 0 &&
          this.props.blocks["bs"][index].audioObj.options[`path${ind}`] != ""
        ) {
          if (this.props.blocks["bs"][index].audioObj.players[ind].isPlaying) {
            this.props.blocks["bs"][index].audioObj.pause(ind);
          } else {
            this.props.blocks["bs"][index].audioObj.play(ind);
          }
          field = "playings";
          value = undefined;
          num = { ind };
        } else {
          ignore = true;
        }
        break;
      case "stop":
        ind = data.value[0] - 11;
        if (
          data.value[1] == 0 &&
          this.props.blocks["bs"][index].audioObj.options[`path${ind}`] != ""
        ) {
          field = "playings";
          value = undefined;
          num = { ind };
          this.props.blocks["bs"][index].audioObj.stop(ind);
        } else {
          ignore = true;
        }

        break;
      case "reverse":
        if (data.value == 0) {
          field = "reversed";
          value = undefined;
        } else {
          ignore = true;
        }

        break;
    }
    if (!ignore) {
      this.props.dispatch({
        type: "CHANGE_BLOCK",
        id: id,
        field,
        value,
        ...num
      });
    }
  }

  handleOscPlayer(id, index, data) {
    let field,
      value,
      ignore = false;
    switch (data.type) {
      case "loop":
        field = "loop";
        value = data.value == 1 ? true : false;
        break;
      case "playbackSpeed":
        field = "speed";
        value = data.value * 2;
        break;
      case "volume":
        field = "volume";
        value = Math.round(data.value * 100);
        break;
      case "playPause":
        if (
          data.value == 0 &&
          this.props.blocks["bs"][index].audioObj.options.path != ""
        ) {
          if (this.props.blocks["bs"][index].audioObj.isPlaying) {
            this.props.blocks["bs"][index].audioObj.pause();
          } else {
            this.props.blocks["bs"][index].audioObj.play();
          }

          field = "playing";
          value = undefined;
        } else {
          ignore = true;
        }
        break;
      case "stop":
        if (
          data.value == 0 &&
          this.props.blocks["bs"][index].audioObj.options.path != ""
        ) {
          field = "playing";
          value = undefined;
          this.props.blocks["bs"][index].audioObj.stop();
        } else {
          ignore = true;
        }

        break;
      case "reverse":
        if (
          data.value == 0 &&
          this.props.blocks["bs"][index].audioObj.options.path != ""
        ) {
          this.props.blocks["bs"][index].audioObj.reverse(res => {
            // console.log(res);
          });
        } else {
          ignore = true;
        }

        break;
      case "seek":
        if (this.props.blocks["bs"][index].audioObj.options.path != "") {
          this.props.blocks["bs"][index].audioObj.seek(data.value);
        }
        ignore = true;
    }
    if (!ignore) {
      this.props.dispatch({
        type: "CHANGE_BLOCK",
        id: id,
        field,
        value
      });
    }
  }

  handleOscMixer(id, data) {
    let field, value;
    switch (data.type) {
      case "playerVolume":
        field = "node" + (data.value[0] - 1) + "Gain";
        value = data.value[1];
        break;
      case "mainVolume":
        field = "masterGain";
        value = data.value;
        break;
    }
    this.props.dispatch({
      type: "CHANGE_BLOCK",
      id: id,
      field,
      value
    });
  }

  openNewPort(blocks) {
    blocks.forEach(block => {
      if (
        block.osc &&
        block.oscPort &&
        this.state.openPorts.indexOf(block.oscPort) === -1
      ) {
        this.setState({ openPorts: [...this.state.openPorts, block.oscPort] });
        // console.log({ portNumber: block.oscPort });
        openPort({ portNumber: block.oscPort })
          .then(data => {
            if (data.err) {
              showToastrError(data);
            } else {
              showToastr("success", data["message"]);
            }
          })
          .catch(error => {
            showToastrError(error);
          });
      }
    });
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
  // toggleFloatingView = () =>
  //   this.setState({ floatingView: !this.state.floatingView });
  toggleRegisterModal = () =>
    this.setState({ isRegisterModalOpen: !this.state.isRegisterModalOpen });

  loadState() {
    if (this.state.projectId !== "new") {
      fetchUserProject(this.state.projectId)
        .then(res => {
          let { name, description, content } = res;

          this.props.dispatch(loadProject(content));

          this.setState({
            projectName: name,
            projectDescription: description
          });

          this.props.dispatch({
            type: "WORKING_PROJ",
            id: this.state.projectId,
            name: this.state.projectName,
            description: this.state.projectDescription
          });
        })
        .catch(err => {
          showToastrError(err);
        });
    } else {
      this.props.dispatch({
        type: "LOAD_STATE",
        content: undefined
      });

      this.setState({
        projectName: "",
        projectDescription: ""
      });
    }
  }

  afterRegister = res => {
    const { token, error, name } = res;

    if (error) {
      showToastrError(res);
    } else {
      sessionStorage.setItem("jwtToken", token);
      sessionStorage.setItem("name", name);
      Store.populateFromProps({
        userToken: { email: undefined, token: token }
      });
      showToastr("success", "Please enter project details");
      this.toggleRegisterModal();
      this.toggleModal();
    }
  };

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };

  saveProject = () => {
    if (isUserLoggedIn())
      if (this.state.projectId !== "new") {
        this.updateProject({
          projectId: this.state.projectId,
          content: JSON.stringify(this.props.blocks)
        });
        // console.log("done");
        // console.log(JSON.stringify(this.props.blocks.bs[0]));
      } else this.toggleModal();
    else this.toggleRegisterModal();
  };

  updateProject(payload) {
    updateProject(payload)
      .then(() => {
        showToastr("success", "Project successfully updated");
      })
      .catch(error => {
        showToastrError(error);
      });
  }
  exportProject = event => {
    event.preventDefault();
    const { projectName, projectDescription, items } = this.state;
    console.log(items);
    let bs = items.reduce((a, b) => {
      return a.concat(b);
    });
    let nowOut = this.props.blocks.nowOut;
    let blocks = {
      bs,
      nowOut
    };
    this.downloadFile({
      projectName,
      projectDescription,
      blocks
    });
  };

  downloadFile = async myData => {
    const fileName = myData.projectName;
    const json = JSON.stringify(myData, null, "\t");
    let readData = JSON.parse(json);
    readData.blocks = cleanPayload(readData.blocks);
    const updatedJson = JSON.stringify(readData, null, "\t");
    const blob = new Blob([updatedJson], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  createProject = event => {
    event.preventDefault();
    let isFormValid = true,
      error = "";

    const { projectName, projectDescription, items } = this.state;
    const blocks = this.props.blocks;

    // console.log("blocks is: ");
    // console.log(blocks);

    if (blocks.length === 0) {
      error = "Project is Empty";
      isFormValid = false;
    } else if (projectName === "") {
      error = "Project name is required";
      isFormValid = false;
    }

    if (isFormValid) {
      let payload = {
        projectName,
        projectDescription,
        blocks
      };

      createProject(payload)
        .then(data => {
          this.setState({ projectName: "", projectDescription: "" });
          showToastr("success", "Project created successfully");
          window.location = "/project-editor/" + data.project_id;
        })
        .catch(error => {
          showToastrError(error);
        });
    } else {
      showToastrError({ error });
    }
  };
  checkIfAllPortsAreOpen(blocks) {
    let flag = true;
    blocks.forEach(block => {
      if (
        block.osc &&
        block.oscPort &&
        this.state.openPorts.indexOf(block.oscPort) === -1
      ) {
        flag = false;
      }
    });
    return flag;
  }
  render() {
    console.log(this.props);
    // console.log(this.state.projectId);
    // console.log(this.props.projectControl.projectId);
    if (this.state.projectId !== this.props.projectControl.projectId) {
      console.log("?");
      this.props.dispatch({
        type: "WORKING_PROJ",
        id: this.state.projectId,
        name: this.state.projectName,
        description: this.state.projectDescription
      });
    }
    const { floatingView } = this.props.projectControl;
    const { projectName, projectDescription, items, portOpened } = this.state;
    const openPortsButton = this.checkIfAllPortsAreOpen(this.props.blocks["bs"])
      ? false
      : true;
    return (
      <div className="container">
        {/* <button
          className=" btn btn-success m-2"
          style={{ position: "absolute", top: "620px", left: "820px" }}
          onClick={this.saveProject}
        >
          {isUserLoggedIn()
            ? this.state.projectId === "new"
              ? "Create"
              : "Save"
            : "Register to save"}
        </button> */}
        {/* {isUserLoggedIn() && this.state.projectId !== "new" && (
          <button
            className=" btn btn-warning m-2"
            style={{ position: "absolute", top: "620px", left: "900px" }}
            onClick={this.exportProject}
          >
            Export Project
          </button>
        )} */}
        {/* {!floatingView && (
          <div style={{ position: "absolute", left: "165px", top: "53px" }}>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                let newValue = this.state.items;
                let index =
                  parseInt(prompt("Enter column number", newValue.length)) - 1;
                if (
                  index < newValue.length &&
                  newValue[index][0] === undefined
                ) {
                  newValue.splice(index, 1);
                  this.setState({ items: newValue });
                } else {
                  alert("Column number is wrong or not empty");
                }
              }}
            >
              Remove
              <br />
              Column
            </button>
          </div>
        )} */}
        {/* {!floatingView && (
          <div
            class="contenedor"
            id="oscilloscope"
            style={{ position: "absolute", left: "1020px", top: "53px" }}
          >
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                this.setState({ items: [...this.state.items, []] })
              }
            >
              Add
              <br />
              Column
            </button>
          </div>
        )} */}
        <AddBlock />
        {/* <button
          className=" btn btn-danger m-2"
          style={{ position: "absolute", top: "620px", left: "1040px" }}
          // onClick={this.toggleFloatingView}
        >
          Floating View : {floatingView ? "On" : "Off"}
        </button> */}
        {openPortsButton && (
          <button
            className="btn btn-secondary m-2 float-right"
            onClick={() => this.openNewPort(this.props.blocks["bs"])}
          >
            Open Required Ports
          </button>
        )}
        <div>
          <div className="row">
            {this.renderBlockList(items, this.props.blocks.nowOut)}
          </div>
        </div>
        <Modal
          centered
          show={this.state.isRegisterModalOpen}
          onHide={this.toggleRegisterModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create new account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm afterRegister={this.afterRegister} />
          </Modal.Body>
        </Modal>
        <Modal centered show={this.state.isModalOpen} onHide={this.toggleModal}>
          <form id="project_create" method="post">
            <Modal.Header closeButton>
              <Modal.Title>Create new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormInput
                className="form-control"
                type="text"
                name="projectName"
                required={true}
                placeholder="Project Name"
                value={projectName}
                onChange={this.handleOnChange}
                autoFocus
              />
              <br />
              <FormInput
                className="form-control"
                type="text"
                name="projectDescription"
                required={true}
                placeholder="Project Description"
                value={projectDescription}
                onChange={this.handleOnChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-warn" onClick={this.toggleModal}>
                Close
              </button>
              <button onClick={this.createProject} className="btn btn-primary">
                Create
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectControl: state.projectControl,
  blocks: state.blocks
});

export default connect(mapStateToProps)(ProjectEditor);
