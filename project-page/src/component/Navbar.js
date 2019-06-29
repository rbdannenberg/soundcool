import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder, getListStyle, getItemStyle, move } from "./extra";
// import {BLOCKS} from './shared/blocks';
import { Delay, Transposer, Pan } from "../Components/types/all";
import Blocks from "../Components/blocks";

class Forms extends Component {
  // the state is the current configuration
  state = {
    blocks: [
      {
        id: 1,
        name: "D1",
        typename: "Delay",
        Type: Delay,
        in: null,
        out: null,
        collpse: false,
        delayTime: 76,
        feedback: 0.119,
        kinect: false,
        osc: 0
      },
      {
        id: 2,
        name: "P1",
        typename: "Pan",
        Type: Pan,
        in: null,
        out: null,
        collpse: false
      },
      {
        id: 3,
        name: "T1",
        typename: "Transposer",
        Type: Transposer,
        in: null,
        out: null,
        collpse: false
      },
      {
        id: 4,
        name: "D2",
        typename: "Delay",
        Type: Delay,
        in: null,
        out: null,
        collapse: false
      }
    ],
    nowIn: null,
    nowOut: null,
    nowId: 5,
    nowCount: { Delay: 3, Transposer: 2, Pan: 2 }
  };

  eva = typeName => {
    let t;
    switch (typeName) {
      case "Delay":
        t = Delay;
        break;
      case "Transposer":
        t = Transposer;
        break;
      case "Pan":
        t = Pan;
        break;
      default:
        t = Delay;
    }
    return t;
  };

  handleDelete = id => {
    const blocks = this.state.blocks.filter(c => c.id !== id);
    this.setState({ blocks });
  };

  handleIn = b => {
    this.setState({ nowIn: b });
    const thisIn = this.state.nowOut === (null || b) ? null : this.state.nowOut;
    const bs = this.state.blocks.map(block => {
      if (block === b) {
        block.in = thisIn;
      }
      return block;
    });
    this.setState({ blocks: bs });
  };

  handleOut = b => {
    this.setState({ nowOut: b });
  };

  handleCollapse = b => {
    const bs = this.state.blocks.map(block => {
      if (block === b) {
        block.collapse = !block.collapse;
      }
      return block;
    });
    this.setState({ blocks: bs });
  };

  // handleNew = typeName => {
  //   const newB = {
  //     id: this.state.nowId,
  //     name: typeName.charAt(0) + this.state.nowCount[typeName],
  //     typename: typeName,
  //     Type: this.eva(typeName),
  //     in: null,
  //     out: null,
  //     collpse: false
  //   };
  //   const blocks = this.state.blocks;
  //   const newId = this.state.nowId + 1;
  //   const c = this.state.nowCount;
  //   c[typeName] = c[typeName] + 1;
  //   const newCount = c;
  //   blocks.push(newB);
  //   this.setState({ blocks, nowId: newId, nowCount: newCount });
  // };
  // #endregion

  render() {
    var block = new Array();
    block.push(this.state.blocks[this.props.type]);
    return (
      <div className="Forms">
        <main className="container">
          <Blocks
            blocks={block}
            connection={[this.state.nowIn, this.state.nowOut]}
            onDelete={this.handleDelete}
            onIn={this.handleIn}
            onOut={this.handleOut}
            collapse={this.handleCollapse}
          />
        </main>
      </div>
    );
  }
}

export default class NavigationBar extends React.Component {
  idList = {
    sidebar1: "sidebar1List",
    sidebar2: "sidebar2List",
    major1: "major1List",
    major2: "major2List"
  };
  getList = id => this.state[this.idList[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );
      const result = {};
      result[destination.droppableId] = items;
      const destinationList = this.idList[destination.droppableId];
      this.setState({
        [destinationList]: result[destination.droppableId]
      });
    } else {
      const list = this.getList(source.droppableId);
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
        list[source.index]['lastIndex']
      );
      list[source.index]['lastIndex']++;
      this.setState(this.state);
      const sourceList = this.idList[source.droppableId];
      const destinationList = this.idList[destination.droppableId];
      this.setState({
        [sourceList]: result[source.droppableId],
        [destinationList]: result[destination.droppableId]
      });
    }
  };

  fetchContent(type,item)
  {
    if(type === 'sidebar')
    {
      return  <img alt="" width="100%" src={item.icon}/>;
    }else if(type=== 'contentBox')
    {
      return <Forms type={parseInt(item.additional)} />;
    }
  }
  droppableContructur(id,list,type){
    return <Droppable droppableId={id}>
      {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
          {list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
                  {this.fetchContent(type,item)}
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
        sidebar1List: [
          {
            id: 'delay',
            content: "Delay",
            additional: "1",
            icon: "https://picsum.photos/id/10/50/50",
            lastIndex: 0
          },
          {
            id: 'pan',
            content: "Pan",
            additional: "2",
            icon: "https://picsum.photos/id/11/50/50",
            lastIndex:0
          }
        ],
        sidebar2List: [
          {
            id: 'transposer',
            content: "Transposer",
            additional: "3",
            icon: "https://picsum.photos/id/12/50/50",
            lastIndex:0
          }
        ]  
      ,
        major1List: [
        ],
        major2List: [
        ]
      ,
      isOpen: false
    };
  }

  render() {
    return (
      <div>
        <div class="container-fluid">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div class="row text-center">
              <div class="col-sm-2">
                <div class="row">
                  <div class="col-sm-6 full">
                  {this.droppableContructur('sidebar1',this.state.sidebar1List,'sidebar')}
                  </div>
                  <div class="col-sm-6 full">
                  {this.droppableContructur('sidebar2',this.state.sidebar2List,'sidebar')}
                  </div>
                </div>
              </div>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-6 full pl-3">
                  {this.droppableContructur('major1',this.state.major1List,'contentBox')}
                  </div>
                  <div class="col-sm-6 full">
                  {this.droppableContructur('major2',this.state.major2List,'contentBox')}
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
