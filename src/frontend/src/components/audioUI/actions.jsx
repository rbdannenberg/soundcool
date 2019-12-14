export const changeBlock = (id, field, value, optional) => dispatch => {
  dispatch({
    type: "CHANGE_BLOCK",
    id,
    field,
    value,
    ...optional
  });
};

export const connectBlock = (node, value, optional) => dispatch => {
  console.log(node);
  console.log(value);
  dispatch({
    type: "CONNECTING_BLOCK",
    node,
    value,
    ...optional
  });
};
