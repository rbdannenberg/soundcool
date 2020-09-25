import React from "react";
import socketIOClient from "socket.io-client";
import { Prompt } from "react-router";

import "./index.css";
import { connect } from "react-redux";
import { default as RDraggable } from "react-draggable";
import WithHeader from "./Components/WithHeader";
import AddBlock from "./Components/AddBlock";
import { StoreX as Store } from "../../storeX";
import { instanceOf } from "prop-types";
import { showToastr, showToastrError, baseAddress } from "../../actions/common";
import { fetchUserProject, openPort } from "./actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadProject } from "./thunks.js";
//import {specValues, audioDefaults} from "/Components/AddBlock.jsx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
  width: "13rem",
  background: isDraggingOver ? "lightblue" : "transparent"
});

class ProjectEditor extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
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
      openPorts: [],
      isProjectChanged: undefined,
    };
    this.canvasRef = React.createRef();
    this.onDragEnd = this.onDragEnd.bind(this);
    this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
      ? id === this.state.selectedBlock
        ? 1
        : 0
      : 0;
    return {
      position: "absolute",
      top: top,
      left: left,
      zIndex: zIndex
    };
  };

  renderBlockList = (blocks, nowOut) => {
    blocks = blocks.map(column => {
      const col = column.filter(item => item !== undefined);
      return col;
    });
    if (this.props.projectControl.floatingView) {
      let finalBlock = [];
      blocks.forEach(o => {
        finalBlock = finalBlock.concat(o);
      });
      return (
        <div
          style={{ left: "100px", top: "2px", height: this.state.windowH - 60, width: this.state.windowW - 120, position: "relative" }}
        >
          <div className="boxContainer">
            {finalBlock.map(b => (
              <RDraggable
                bounds="parent"
                cancel="input"
                onDrag={() => {
                  if (this.state.selectedBlock !== b.id) {
                    this.setState({ selectedBlock: b.id });
                  }
                }}
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
              <div style={{ paddingTop: "30px", paddingLeft: "100px" }}>
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
                              <WithHeader
                                key={item.id}
                                blockInfo={item}
                                nowOut={nowOut}
                              />
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
          arr = arr.filter(e => e !== undefined);
          const found = arr.find(element => element["id"] === o["id"]);
          if (found === undefined) {
            if (index === length - 1) {
              newValue[0].push(o);
            }
            return true;
          } else {
            const i = arr.findIndex(element => element["id"] === o["id"]);
            newValue[index][i] = o;
            return false;
          }
        });
      });
      var checkUpdate = this.state.isProjectChanged;
      if (checkUpdate === undefined) {
        checkUpdate = false;
      } else {
        checkUpdate = true;
      }
      if (this.state.projectId === "new") {
        localStorage.setItem('localProject', JSON.stringify(nextProps.blocks))
      }

      this.setState({
        isProjectChanged: checkUpdate,
        items: newValue,
        prevItems: nextProps.blocks.bs
      });
    }
  }

  componentDidMount() {
    this.loadState();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowW: window.innerWidth, windowH: window.innerHeight });
  }

  findComponents(oscPort, targetType) {
    let components = [];
    this.props.blocks["bs"].forEach((comp, index) => {
      if (
        comp.osc &&
        comp.oscPort === oscPort &&
        comp.typeName === targetType
      ) {
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
      default:
        console.log("Unhandles case " + data.component);
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
        value = data.value === 1 ? true : false;
        break;
      case "loop":
        field = "loop";
        value = data.value === 1 ? true : false;
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
          data.value[1] === 0 &&
          this.props.blocks["bs"][index].audioObj.options[`path${ind}`] !== ""
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
          data.value[1] === 0 &&
          this.props.blocks["bs"][index].audioObj.options[`path${ind}`] !== ""
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
        if (data.value === 0) {
          field = "reversed";
          value = undefined;
        } else {
          ignore = true;
        }

        break;
      default:
        console.log("Unhandles case " + data.type);
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
        value = data.value === 1 ? true : false;
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
          data.value === 0 &&
          this.props.blocks["bs"][index].audioObj.options.path !== ""
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
          data.value === 0 &&
          this.props.blocks["bs"][index].audioObj.options.path !== ""
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
          data.value === 0 &&
          this.props.blocks["bs"][index].audioObj.options.path !== ""
        ) {
          this.props.blocks["bs"][index].audioObj.reverse(res => {
            // console.log(res);
          });
        } else {
          ignore = true;
        }

        break;
      case "seek":
        if (this.props.blocks["bs"][index].audioObj.options.path !== "") {
          this.props.blocks["bs"][index].audioObj.seek(data.value);
        }
        ignore = true;
        break;
      default:
        console.log("Unhandles case " + data.type);
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
      default:
        console.log("Unhandles case " + data.type);
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
      this.props.dispatch(loadProject(localStorage.getItem('localProject')));
      this.setState({
        projectName: "",
        projectDescription: ""
      });
    }
  }

  handleOnChange = (name, value) => {
    const params = { [name]: value };
    this.setState(params);
  };
  isUserLoggedIn() {
    return cookies.get("token") || "";
  }

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

  checkIsProjectPage = () => {
    return this.props.location.pathname.split("/")[1] === "project-editor";
  };

  render() {
    if (this.state.projectId !== this.props.projectControl.projectId) {
      this.props.dispatch({
        type: "WORKING_PROJ",
        id: this.state.projectId,
        name: this.state.projectName,
        description: this.state.projectDescription
      });
    }
    let { projectName, projectDescription, items } = this.state;
    const openPortsButton = this.checkIfAllPortsAreOpen(this.props.blocks["bs"])
      ? false
      : true;
    return (
      <React.Fragment>
        <Prompt when={this.state.projectId !== "new" && this.state.isProjectChanged} message="Leaving the project editor... Please don't forget to save!" />
        <div className="container-fluid">
          <AddBlock />

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
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projectControl: state.projectControl,
  blocks: state.blocks
});

export default connect(mapStateToProps)(ProjectEditor);
