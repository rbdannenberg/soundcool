const emptyState = {
  floatingView: false
};
const projectControl = (
  state = {
    floatingView: false
  },
  action
) => {
  let { floatingView } = state;
  switch (action.type) {
    case "FLOATING_VIEW": {
      console.log("floating view!");
      return { floatingView: !floatingView };
    }
    default:
      return state;
  }
};

export default projectControl;
