import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import WithHeader from "../src/ui/Components/WithHeader";
import AddBlock from "./ui/Components/AddBlock";
import SLButton from "./ui/Components/SLButton";
import blocks from "./ui/reducers/blocks";
import { createStore, combineReducers } from "redux";
import ProjectPage from "./ui/component_pp/ProjectPage";
import { FaMinus, FaTimes } from "react-icons/fa";
import { Collapse } from "reactstrap";

// #region reducers

const blockApp = combineReducers({
  blocks
});
// #endregion

const store = createStore(blockApp);
export default store;

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

class BlockApp extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    console.log(window.location.href + "");
    console.log(window.location.href.toString());
    console.log(window.location.href.toString().substring(37));

    const projectId = window.location.href.toString().substring(37);

    store.dispatch({
      type: "LOAD_STATE",
      id: projectId
    });
  }

  render() {
    return (
      <div>
        {/* <SLButton /> */}
        <AddBlock />
        <BlockList
          blocks={this.props.blocks.bs}
          nowOut={this.props.blocks.nowOut}
        />
      </div>
    );
  }
}

const ExampleWrapper = () => {
  return (
    <React.Fragment>
      <div>hello</div>
      <Example />
    </React.Fragment>
  );
};

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const c = this.canvasRef.current;
    console.log(c);
    setInterval(console.log(c.getBoundingClientRect()), 1);
  }

  render() {
    return (
      <React.Fragment>
        <div
          className=""
          style={{
            width: "288px",
            height: "188px",
            position: "relative"
          }}
        >
          <canvas
            ref={this.canvasRef}
            style={{
              position: "absolute",
              width: "263px",
              height: "168px",
              top: "10px",
              left: "10px",
              backgroundColor: "#DCDEE0"
            }}
            onClick={e => {
              e.persist();
              console.log(e);
            }}
          ></canvas>
        </div>
      </React.Fragment>
    );
  }
}

// ReactDOM.render(<Example />, document.getElementById("root"));

const render = () => {
  ReactDOM.render(
    <BlockApp {...store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// ReactDOM.render(<App />, document.getElementById("root"));
