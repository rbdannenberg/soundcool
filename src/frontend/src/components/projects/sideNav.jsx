import React from "react";
import "./projects.css";
import logo from "../../assets/images/music.png";
import project from "../../assets/images/volume.png";
import home from "../../assets/images/house.png";
import help from "../../assets/images/question.png";

const SideNav = (props) => {
    console.log("PROPS" + props.width);
    return (
    <div className="projects-sidenav-container" style={{width: props.width}}>
        <div id="projects-sidenav">
            <div className="projects-sidenav-title-container">
                <img src={logo} alt="logo" className="projects-title-logo" />
                <div className="projects-sidenav-title">SOUNDCOOL</div>
            </div>

            <div className="projects-sidenav-subtitle-container">
                <img src={home} alt="logo" className="projects-logo" />
                <a className="projects-link" href="#about">DASHBOARD</a>
            </div>

            <div className="projects-sidenav-subtitle-container">
                <img src={project} alt="logo" className="projects-logo" />
                <a className="projects-link" href="#sounds">SOUNDS</a>
            </div>

            <div className="projects-sidenav-subtitle-container">
                <img src={help} alt="logo" className="projects-logo" />
                <a className="projects-link" href="#about">TUTORIAL</a>
            </div>
        </div>
    </div>
    );
};
export default SideNav;