import React from "react";
import { Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import "./Switcher.css";  // Importing the CSS

const Switcher = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'rgb(3, 128, 252)',
  };


  return (
    <div style={containerStyle}>
      <ButtonToolbar>
        <ButtonGroup>
          <Button className="button-style">1</Button> 
          <Button className="button-style">2</Button> 
          <Button className="button-style">3</Button> 
          <Button className="button-style">4</Button> 
        </ButtonGroup>
        <ButtonGroup>
          <Button className="button-style">5</Button> 
          <Button className="button-style">6</Button> 
          <Button className="button-style">7</Button> 
          <Button className="button-style">8</Button> 
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
};

export default Switcher;
