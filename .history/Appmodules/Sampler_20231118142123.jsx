import React from "react";
import { Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import "./Sampler.css"

const Sampler = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'rgb(252, 144, 3)',
  };

  const loopButtonStyle = {
    position: 'absolute',  
    top: '20px',
    left: '40px',
    padding: '40px',
    backgroundColor: 'white',
    border: '20px',
    fontSize: '40px',
    cursor: 'pointer',
  };


  return (
    <div style={containerStyle}>
      {/* Loop按钮 */}
      <Button style={loopButtonStyle}>Loop</Button>

      <ButtonToolbar>
        <ButtonGroup>
          <Button className="button-style">1</Button> 
          <Button className="button-style">2</Button> 
          <Button className="button-style">3</Button> 
        </ButtonGroup>

        <ButtonGroup>
          <Button className="button-style">4</Button> 
          <Button className="button-style">5</Button> 
          <Button className="button-style">6</Button> 
        </ButtonGroup>

        <ButtonGroup>
          <Button className="button-style">7</Button> 
          <Button className="button-style">8</Button> 
          <Button className="button-style">9</Button> 
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
};

export default Sampler;
