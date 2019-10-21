import React from "react";
import WithHeader from "./ui/Components/WithHeader";
import RegisterForm from "../register/form";
import AddBlock from "./ui/Components/AddBlock";
import { Store } from "../store";
import { isUserLoggedIn, showToastr, showToastrError } from "../common";
import { updateProject, createProject, fetchUserProject } from "./actions";
import blocks from "./ui/reducers/blocks";
import { createStore, combineReducers } from "redux";
import Modal from "react-bootstrap/Modal";
import FormInput from "../form/FormInput";

const blockApp = combineReducers({
  blocks
});

// #endregion

export const store = createStore(blockApp);

// const WithHeader = ({ blockInfo, nowOut, handleDelete }) => {
//   let {
//     typeName,
//     name,
//     id,
//     audioObj,
//     inDisabled,
//     outDisabled,
//     outNode,
//     inNode,
//     collapse,
//     color
//   } = blockInfo;
//   // const Block = eva(typeName);
//   let inButton;
//   let outButton;

//   // conditionally render in and out buttons in the header
//   if (inDisabled) {
//     inButton = (
//       // nothing, placeholder
//       <div
//         className="btn btn-sm m-1 text-center"
//         style={{
//           // width: "1.5rem",
//           height: "1.5rem",
//           fontSize: "0.8rem",
//           padding: "0px"
//         }}
//       />
//     );
//   } else {
//     inButton = (
//       <button
//         id="inButton"
//         className="btn btn-light btn-sm m-1 text-center"
//         style={{
//           width: "1.5rem",
//           height: "1.5rem",
//           fontSize: "0.8rem",
//           padding: "0px"
//         }}
//         onClick={() => {
//           store.dispatch({
//             type: "CONNECTING_BLOCK",
//             node: "nowIn",
//             value: [name, "0", id, audioObj]
//           });
//         }}
//       >
//         <div>{inNode[0] === undefined ? "In" : inNode[0][0]}</div>
//       </button>
//     );
//   }

//   const style1 = {
//     backgroundColor: "white",
//     textAlign: "center",
//     padding: "0px",
//     width: "1.5rem",
//     height: "1.5rem",
//     fontSize: "0.8rem"
//   };
//   const circleStyle = {
//     width: "1.5rem",
//     height: "1.5rem",
//     textAlign: "center",
//     fontSize: "0.8rem",
//     padding: "0px",
//     lineHeight: 1.428571429,
//     borderRadius: "0.5rem",
//     borderColor: "black",
//     backgroundColor: "white"
//   };

//   const outId = nowOut === undefined ? undefined : nowOut[2];

//   if (outDisabled) {
//     outButton = <span />;
//   } else {
//     outButton = (
//       <button
//         id="outButton"
//         className="btn btn-sm text-center m-1"
//         style={outId === id ? circleStyle : style1}
//         onClick={() =>
//           store.dispatch({
//             type: "CONNECTING_BLOCK",
//             node: "nowOut",
//             value: [name, "0", id, audioObj]
//           })
//         }
//       >
//         <div>{outNode[0] === undefined ? "Out" : outNode[0][0]}</div>
//       </button>
//     );
//   }

//   return (
//     <div
//       className="text-left my-2"
//       style={{
//         width: "20rem",
//         backgroundColor: color,
//         borderColor: "grey",
//         borderStyle: "solid",
//         borderWidth: "2px"
//       }}
//     >
//       <div className="">
//         {inButton}
//         <span className="m-1" style={{ fontSize: "0.8rem" }} id="blockName">
//           {name}
//         </span>
//         <span
//           className="badge badge-secondary badge-pill m-1"
//           style={{ fontSize: "0.8rem" }}
//           id="typeName"
//         >
//           {typeName}
//         </span>
//         <span className="float-right">
//           <button
//             id="collapseButton"
//             className="btn btn-light btn-sm m-1 text-center"
//             style={{
//               width: "1.5rem",
//               height: "1.5rem",
//               fontSize: "0.4rem"
//             }}
//             onClick={() =>
//               store.dispatch({
//                 type: "CHANGE_BLOCK",
//                 id: id,
//                 field: "collapse",
//                 value: undefined
//               })
//             }
//           >
//             <FaMinus style={{ marginLeft: "-1px" }} />
//           </button>

//           <button
//             id="closeButton"
//             className="btn btn-light btn-sm m-1 text-center"
//             style={{
//               width: "1.5rem",
//               height: "1.5rem",
//               fontSize: "0.4rem"
//             }}
//             onClick={() => {
//               // handleDelete();
//               store.dispatch({
//                 type: "DELETE_BLOCK",
//                 id: id
//               });
//             }}
//           >
//             <FaTimes style={{ marginLeft: "-1px" }} />
//           </button>
//           {outButton}
//         </span>
//       </div>
//       <Collapse isOpen={!collapse}>
//         <Example />
//         {/* <Block blockInfo={blockInfo} /> */}
//       </Collapse>
//     </div>
//   );
// };

const BlockList = ({ blocks, nowOut }) => {
  // let rBlocks = blocks.reverse();
  return (
    <React.Fragment>
      {blocks.map(b => (
        <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} />
        // <ExampleWrapper />
      ))}
    </React.Fragment>
  );
};

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setState({ ...store.getState() });
    });
    this.state = {
      ...store.getState(),
      projectId: this.props.match.params.id,
      projectName: "",
      projectDescription: "",
      isModalOpen: false,
      isRegisterModalOpen: false
    };
    this.canvasRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id)
      this.setState({ projectId: nextProps.match.params.id }, () => {
        this.loadState();
      });
  }

  componentDidMount() {
    this.loadState();
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
  toggleRegisterModal = () =>
    this.setState({ isRegisterModalOpen: !this.state.isRegisterModalOpen });

  loadState() {
    if (this.state.projectId !== "new") {
      fetchUserProject(this.state.projectId)
        .then(res => {
          let { name, description, content } = res;

          store.dispatch({
            type: "LOAD_STATE",
            content
          });

          this.setState({
            projectName: name,
            projectDescription: description
          });
        })
        .catch(err => {
          showToastrError(err);
        });
    } else {
      store.dispatch({
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
    const { token, error } = res;

    if (error) {
      showToastrError(res);
    } else {
      sessionStorage.setItem("jwtToken", token);
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
      if (this.state.projectId !== "new")
        this.updateProject({
          projectId: this.state.projectId,
          content: JSON.stringify(this.state.blocks)
        });
      else this.toggleModal();
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
    const { projectName, projectDescription, blocks } = this.state;
    this.downloadFile({
      projectName,
      projectDescription,
      blocks
    });
  };

  downloadFile = async myData => {
    const fileName = myData.projectName;
    const json = JSON.stringify(myData, null, "\t");
    const blob = new Blob([json], { type: "application/json" });
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

    const { projectName, projectDescription, blocks } = this.state;

    if (blocks["bs"].length === 0) {
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

  render() {
    const { projectName, projectDescription } = this.state;
    return (
      <div className="container">
        <button className="btn btn-success m-2" onClick={this.saveProject}>
          {isUserLoggedIn()
            ? this.state.projectId === "new"
              ? "Create"
              : "Save"
            : "Register to save"}
        </button>
        {isUserLoggedIn() && this.state.projectId !== "new" && (
          <button
            className="btn btn-warning m-2 float-right"
            onClick={this.exportProject}
          >
            Export Project
          </button>
        )}
        <AddBlock />
        <BlockList
          blocks={this.state.blocks.bs}
          nowOut={this.state.blocks.nowOut}
        />

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

export default ProjectEditor;

// const ExampleWrapper = () => {
//   return (
//     <React.Fragment>
//       <div>hello</div>
//       <Example />
//     </React.Fragment>
//   );
// };

// class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.canvasRef = React.createRef();
//   }

//   componentDidMount() {
//     const c = this.canvasRef.current;
//     console.log(c);
//     setInterval(console.log(c.getBoundingClientRect()), 1);
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div
//           className=""
//           style={{
//             width: "288px",
//             height: "188px",
//             position: "relative"
//           }}
//         >
//           <canvas
//             ref={this.canvasRef}
//             style={{
//               position: "absolute",
//               width: "263px",
//               height: "168px",
//               top: "10px",
//               left: "10px",
//               backgroundColor: "#DCDEE0"
//             }}
//             onClick={e => {
//               e.persist();
//               console.log(e);
//             }}
//           ></canvas>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// // ReactDOM.render(<Example />, document.getElementById("root"));

// const render = () => {
//   ReactDOM.render(
//     <BlockApp {...store.getState()} />,
//     document.getElementById("root")
//   );
// };

// store.subscribe(render);
// render();

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// // ReactDOM.render(<App />, document.getElementById("root"));
