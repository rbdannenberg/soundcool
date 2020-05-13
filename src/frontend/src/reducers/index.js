import { combineReducers } from "redux";
import blocks from "./blocks";
import projectControl from "./project";

export default combineReducers({
  blocks,
  projectControl
});
