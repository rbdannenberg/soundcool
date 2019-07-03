import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder, getListStyle, getItemStyle, move } from "./extra";
// import myAction from "../reducers/major_boxes";
import WithHeader from "../Components/WithHeader";

// import {BLOCKS} from './shared/blocks';
import {sidebar1,sidebar2,major1, major2} from "../shared/content_box";

import store from "../../index";
import specValues from "../Components/blockSpecs";

const addBlock = typeName => {
  store.dispatch({
    type: "ADD_BLOCK",
    typeName,
    values: {
      // inNode and outNode are a list, since a block can have multiple input and output
      inNode: [],
      outNode: [],
      collapse: false,
      ...specValues[typeName]
    }
  });
};

class NavigationBar extends React.Component {
  idList = {
    sidebar1: "sidebar1",
    sidebar2: "sidebar2",
    major1: "major1",
    major2: "major2"
  };
  getList = id => this.state[this.idList[id]];
  
  getListNameFromId = id => this.state[id];

  handleDelete = (id) => {
    // console.log(this.state["major1"]);
    // const list;
    let list;
    if(this.state["major1"].filter(a => a.id == id).length)
    {
      list = "major1";
    }
    if(this.state["major2"].filter(a => a.id == id).length)
    {
      list = "major2";
    }
    // console.log();
    this.setState({[list]: this.getList(list).filter(a => a.id != id)});
    // console.log(this.state["major1"].filter(a => a.id!=id));
    // this.setState([list]: );
  }

  onDragEnd = result => {
    // console.log(result);
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }


    if (source.droppableId === destination.droppableId) {
      const items = reorder(this.getList(source.droppableId),source.index,destination.index);
      const result = {};
      result[destination.droppableId] = items;
      const destinationList = this.idList[destination.droppableId];
      this.setState({[destinationList]: result[destination.droppableId]});
    } 
    else 
    {
      const list = this.getList(source.droppableId);
      const result = move(this.getList(source.droppableId),this.getList(destination.droppableId),source,destination,list[source.index]['lastIndex'],list[source.index]['typeName']);
      list[source.index]['lastIndex']++;
      this.setState(this.state);
      const sourceList = this.idList[source.droppableId];
      const destinationList = this.idList[destination.droppableId];
      // console.log(this.state[sourceList]);

      this.setState({[sourceList]: result[source.droppableId],[destinationList]: result[destination.droppableId]});
    }
    // console.log(source.droppableId);
    // console.log(destination.droppableId);
    if((source.droppableId == "sidebar1" || source.droppableId == "sidebar2") && ((destination.droppableId == "major1" || destination.droppableId == "major2"))){
      addBlock(result.draggableId);
    }

  };

  fetchContent(type,item,snapshot)
  {
    if(type === 'sidebar')
    {
      return  <div><img src={item.image} alt = {item.id}></img></div>;
    }
    else if(type=== 'contentBox')
    {
      let {blocks} = {...store.getState()};
      // console.log(blocks.bs[0]);
      let {bs, nowOut} = blocks;
      var b = bs.filter((block)=>block.typeName == item.typeName && block.typeId == item.lastIndex)[0];
      const param = b.typeName+b.typeId;

      return <div className = "d-flex align-items-center">
              <WithHeader key={b.id} blockInfo={b} nowOut={nowOut} handleDelete = {() => this.handleDelete(param)}/>
              
              {/* <button onClick={() => this.handleDelete(param)} >x</button>  */}
            </div>
    }
  }

  display(snapshot){
    return <div>{snapshot.isDraggingOver}</div>;
  }

  droppableContructur(id,list,type){
    return <Droppable droppableId={id}>
      {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)} 
      >
        {this.display(snapshot)}
          {list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                  >
                  {this.fetchContent(type,item,snapshot)}
                  {/* <button></button> */}
                  </div>
                )}
              </Draggable>
          ))}
        {provided.placeholder}
      </div>
    )}
    </Droppable>
  }
  constructor(props) {
    super(props);

    this.state = {
        sidebar1: sidebar1,
        sidebar2: sidebar2,
        major1: major1,
        major2: major2
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div>
        <div class="container-fluid">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div class="row text-center">
              <div class="col-sm-3" >
                <div class="row">
                  <div class="col-sm-6">
                  {this.droppableContructur('sidebar1',this.state.sidebar1,'sidebar')}
                  </div>
                  <div class="col-sm-6">
                  {this.droppableContructur('sidebar2',this.state.sidebar2,'sidebar')}
                  </div>
                </div>
              </div>
              <div class="col-sm-9">
                <div class="row">
                  <div class="col-sm-6 full pl-3">
                  {this.droppableContructur('major1',this.state.major1,'contentBox')}
                  </div>
                  <div class="col-sm-6 full">
                  {this.droppableContructur('major2',this.state.major2,'contentBox')}
                  </div>
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default NavigationBar;