import store from "./index";

const changeBlock = (id, field, value) => {
  store.dispatch({
    type: "CHANGE_BLOCK",
    id,
    field,
    value
  });
};

export default changeBlock;
