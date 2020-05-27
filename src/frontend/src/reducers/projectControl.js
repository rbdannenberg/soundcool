const projectControl = (
  state = {
    floatingView: false,
    projectId: "new",
    projectName: "",
    projectDescription: ""
  },
  action
) => {
  let { floatingView } = state;
  switch (action.type) {
    case "FLOATING_VIEW": {
      console.log("floating view!");
      return { ...state, floatingView: !floatingView };
    }
    case "WORKING_PROJ": {
      console.log("working project!");
      return {
        ...state,
        projectId: action.id,
        projectName: action.name,
        projectDescription: action.description
      };
    }
    default:
      return state;
  }
};

export default projectControl;
