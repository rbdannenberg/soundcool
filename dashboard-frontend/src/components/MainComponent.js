import React, { Component } from 'react';
import SoundMenu from './SoundComponent';
import ProjectMenu from './ProjectComponent';


import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Login from './LoginComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { addSoundFile, removeSoundFile } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        leaders: state.leaders,
        projects: state.projects,
        sounds: state.sounds
    }   ;     
};

const mapDispatchToProps = (dispatch) => ({
    addSoundFile: (name, image, description) => dispatch(addSoundFile(name, image, description)),
    removeSoundFile: (id) => dispatch(removeSoundFile(id))
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const HomePage = () => {
            return (
                <Home sound={this.props.sounds.filter(sound => sound.featured)[0]}
                    project={this.props.projects.filter(project => project.featured)[0]}
                    leader={this.props.leaders.filter(leader => leader.featured)[0]}
                />
            );
        }

        
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/projectmenu" component={() => <ProjectMenu projects={this.props.projects} />} />
                    <Route exact path="/soundmenu" component={() => <SoundMenu sounds={this.props.sounds} addSoundFile={this.props.addSoundFile} removeSoundFile={this.props.removeSoundFile} />} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/login" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
