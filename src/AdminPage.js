import React, { Component } from "react";
import fire from './components/fire';
import { Link, Redirect } from 'react-router-dom';
import SideBar from "./components/SideBar"
import PendingUsers from "./components/PendingUsers"

class DummyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
            userView: false
        }
    }

    logout = () => {
        fire.auth().signOut();
        this.setState({
            logout: true
        });
    }

    userView = () => {
        this.setState({
            userView: true
        });
    }

    render() {
        if (this.state.logout) {
            return <Redirect to="/LandingPage" />
        }
        if (this.state.userView) {
            return <Redirect to="/DummyPage" />
        }
        return (
            <div>
                <button onClick={this.logout}> logout </button>
                <button onClick={this.userView}> User View </button>
                <SideBar />
            </div>
        );
    }
}

export default DummyPage;
