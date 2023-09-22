

import React from "react";
import { changeBlock } from "./actions";
import { connect } from "react-redux";

class Spectroscope extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderer = undefined;
    this.state = {
      currentFreqIndex: 2,       // For history not checked version
      currentFreqRangeIndex: 0, // For history checked version
      dBOffset: 0,
    };
    this.frequencies = [4, 8, 16, 24]; // kHz, for history not checked version
    this.frequencyRanges = [ 
      [0, 1, 2, 3, 4],           // for history checked version
      [0, 2, 4, 6, 8],
      [0, 4, 8, 12, 16],
      [0, 6, 12, 18, 24]
    ];
  }

// Zoom in function
zoomIn = () => {
    if (this.props.blockInfo.audioObj.options.history) {  // Check if history is active
      if (this.state.currentFreqRangeIndex < this.frequencyRanges.length - 1) {
        this.setState(prevState => ({
          currentFreqRangeIndex: prevState.currentFreqRangeIndex + 1
        }));
      }
    } else {  // if history is unchecked
      if (this.state.currentFreqIndex < this.frequencies.length - 1) {
        this.setState(prevState => ({
          currentFreqIndex: prevState.currentFreqIndex + 1
        }));
      }
    }
}

  // Zoom out function
  zoomOut = () => {
    if (this.props.blockInfo.audioObj.options.history) {  // Check if history is active
      if (this.state.currentFreqRangeIndex > 0) {
        this.setState(prevState => ({
          currentFreqRangeIndex: prevState.currentFreqRangeIndex - 1
        }));
      }
    } else {  // if history is unchecked
      if (this.state.currentFreqIndex > 0) {
        this.setState(prevState => ({
          currentFreqIndex: prevState.currentFreqIndex - 1
        }));
      }
    }
  }

  amplify = (amount) => {
    this.setState(prevState => {
      const newOffset = prevState.dBOffset + amount;
      
      if (newOffset > 0) {
        return { dBOffset: 0 };
      } else if (newOffset < -40) {
        return { dBOffset: -40 };
      } else {
        return { dBOffset: newOffset };
      }
    });
  }


  render() {
    let { id, audioObj } = this.props.blockInfo;

 // If history is checked:
if (audioObj.options.history) {
    const displayedDBValues = this.frequencyRanges[
      this.state.currentFreqRangeIndex
    ].map((value, index) => (index === 4 ? value + ' kHz' : value.toString()));
  
    // Reverse the displayedDBValues array to put 0 at the bottom
    displayedDBValues.reverse();
  
      // Return the layout for when the history is checked
    
        return (
                  <React.Fragment>
                      <div
                          className=""
                          style={{
                              height: "195px",
                              position: "relative"
                          }}
                      >
                          <label
                              htmlFor="history"
                              style={{
                                  fontSize: "0.64rem",
                                  position: "absolute",
                                  left: "0.5rem",
                                  top: "0.25rem"
                              }}
                          >
                              History
                          </label>
                          <input
                              checked={audioObj.options.history}
                              type="checkbox"
                              className=""
                              id="history"
                              style={{
                                  position: "absolute",
                                  left: "3rem",
                                  top: "0.25rem"
                              }}
                              onClick={() =>
                                  this.props.changeBlock(id, "history", !audioObj.options.history)
                              }
                          />
                             <div
                          style={{
                              position: "absolute",
                              width: "9.5rem",
                              height: "140px",
                              top: "25px",
                              left: "25px",
                              backgroundColor: "#DCDEE0"
                          }}
                      >
                          <canvas
                              ref={this.canvasRef}
                              style={{
                                  position: "absolute",
                                  height: "12px",
                                  width: "1.5rem"
                              }}
                          />
                          {[...Array(3).keys()].map(index => (
                              <div 
                                  key={index} 
                                  style={{
                                      position: 'absolute',
                                      top: `${140/4 * (index + 1)}px`, // This will place lines evenly in 1/4 height intervals
                                      left: '1',  
                                      width: '100%',  // Adjusted to cover full width  
                                      height: '1px',  
                                      backgroundColor: 'rgba(0, 0, 0, 0.2)' ,
                                  }}
                              />
                          ))}
                      </div>
                   
                
           {/* Replace the Frequency label with the word "Now" */}
           <div style={{ position: "absolute", bottom: "7px", right: "14%", fontSize: "0.8rem" }}>
                    Now
                  </div>
          
          
                            {/* Add a label that says "-4 s" at the bottom-left corner */}
                  <div style={{ position: "absolute", bottom: "3px", left: "11px", fontSize: "0.8rem", padding: "5px" }}>
                    -4 s
                  </div>
          
                          {/* Magnifier button */}
                          <button
                              style={{
                                  position: "absolute",
                                  bottom: "5px",
                                  left: "44px",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  padding: "0px",
                                  cursor: "pointer",
                                  fontSize: "0.8rem"
                              }}
                              onClick={() => {}}
                          >
                              <img src="/assets/images/project_component_logos/Magnifier.png" alt="Expand/Shrink" style={{ width: "17px", height: "21px" }}/>
                          </button>

                          {/* dB amplification buttons */}
                          <div style={{ position: "absolute", top: "35%", right: "1%", display: "flex", flexDirection: "column", fontSize: "0.8rem" }}>
                              <button style={{ borderRadius: "5px",margin: "1px 0px"}} onClick={this.zoomIn}>+</button>
                              <button style={{ borderRadius: "5px",margin: "1px 0px"}}  onClick={this.zoomOut}>-</button>

                          </div>
              {/* dB labels */}
              <div style={{ position: "absolute", top: "21px", left: "2%", fontSize: "0.68rem" }}>
              {displayedDBValues.map((value, index) => (
                                  <div key={index} style={{ marginBottom: `${140 / displayedDBValues.length - 12}px` }}>
                                      {value}
                                  </div>
                              ))}
              </div>
                      </div>
                  </React.Fragment>
              );
    }
    else {
      const baseDBValues = [0, -10, -20, -30, -40, -50, -60];
      const displayedDBValues = baseDBValues.map(value => value + this.state.dBOffset);

      // Return the layout for when the history is not checked
      return (
        <React.Fragment>
             <div
                className=""
                style={{
                    height: "195px",
                    position: "relative"
                }}
            >
                <label
                    htmlFor="history"
                    style={{
                        fontSize: "0.64rem",
                        position: "absolute",
                        left: "0.5rem",
                        top: "0.25rem"
                    }}
                >
                    History
                </label>
                <input
                    checked={audioObj.options.history}
                    type="checkbox"
                    className=""
                    id="history"
                    style={{
                        position: "absolute",
                        left: "3rem",
                        top: "0.25rem"
                    }}
                    onClick={() =>
                        this.props.changeBlock(id, "history", !audioObj.options.history)
                    }
                />
                <div
                    style={{
                        position: "absolute",
                        width: "9.5rem",  // Reduced width
                        height: "140px",  // Reduced height
                        top: "25px",  // Adjusted top
                        left: "25px",  // Adjusted left
                        backgroundColor: "#DCDEE0"
                    }}
                >
                    <canvas
                        ref={this.canvasRef}
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "10.5rem"
                        }}
                    />
                    {/* Horizontal grid lines */}
    {[...Array(5).keys()].map(index => (
        <div 
            key={index} 
            style={{
                position: 'absolute',
                top: `${23.33 * (index + 1)}px`,  // Position each line appropriately
                left: '0',  
                width: '100%',  
                height: '1px',  
                backgroundColor: 'rgba(0, 0, 0, 0.2)'  // Semi-transparent black for subtle lines
            }}
        />
    ))}
                </div>

                {/* Frequency label */}
                <div style={{ position: "absolute", bottom: "6px", right: "14%", fontSize: "0.8rem" }}>
                    {this.frequencies[this.state.currentFreqIndex]}kHz
                </div>
            
                        {/* Moved Frequency control buttons */}
            <div style={{ position: "absolute", top: "0rem", right: "5rem", display: "flex", gap: "0px", fontSize: "0.8rem" }}>
            <button style={{ borderRadius: "5px", margin: "0px 2px 0px 0px" }} onClick={this.zoomIn}>+</button>
            <button style={{ borderRadius: "5px", margin: "0px" }} onClick={this.zoomOut}>-</button>
            </div>

                {/* Magnifier button */}
                <button
                    style={{
                        position: "absolute",
                        bottom: "5px",
                        left: "44px",
                        border: "none",
                        backgroundColor: "transparent",
                        padding: "0px",
                        cursor: "pointer",
                        fontSize: "0.8rem"
                    }}
                    onClick={() => {}}
                >
                    <img src="/assets/images/project_component_logos/Magnifier.png" alt="Expand/Shrink" style={{ width: "17px", height: "21px" }}/>
                </button>

                <div style={{ position: "absolute", top: "35%", right: "1%", display: "flex", flexDirection: "column", fontSize: "0.8rem" }}>
    <button style={{ borderRadius: "5px",margin: "1px 0px"}} onClick={() => this.amplify(10)}>+</button>
    <button style={{ borderRadius: "5px",margin: "1px 0px" }} onClick={() => this.amplify(-10)}>-</button>
</div>

{/* dB labels */}
<div style={{ position: "absolute", top: "21px", left: "2%", fontSize: "0.68rem" }}>
    {displayedDBValues.map((value, index) => (
        <div key={index} style={{ marginBottom: "5.9px" }}>
            {index === 0 ? `${value} dB` : value}
        </div>
    ))}
</div>
            </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    state
  };
}

export default connect(
  mapStateToProps,
  { changeBlock }
)(Spectroscope);

