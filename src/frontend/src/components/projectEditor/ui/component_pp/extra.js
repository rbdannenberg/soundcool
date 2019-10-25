export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getListStyle = isDraggingOver => ({
  color: "white",
  paddingTop: 3,
  paddingRight: 4,
  background: isDraggingOver ? "lightblue" : "transparent",
  "min-height": "100vh"
});

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 5,
  marginTop: 1,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  lastIndex,
  typeName
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  if (
    !(
      droppableDestination.droppableId === "sidebar1" ||
      droppableDestination.droppableId === "sidebar2"
    )
  ) {
    let newValue = Object.assign({}, sourceClone[droppableSource.index]);
    // newValue.id = newValue.id + lastIndex;
    if (
      !(
        droppableSource.droppableId === "sidebar1" ||
        droppableSource.droppableId === "sidebar2"
      )
    ) {
      sourceClone.splice(droppableSource.index, 1);
    } else {
      newValue.id = newValue.id + lastIndex;
      newValue.typeName = typeName;
    }
    destClone.splice(droppableDestination.index, 0, newValue);
  }
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};
