import React, { Component } from "react";
import fire from './components/fire';
import { Link, Redirect } from 'react-router-dom';
import SideBar from "./components/SideBar"
import PendingUsers from "./components/PendingUsers"

class DummyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false
        }
    }

    logout = () => {
        fire.auth().signOut();
        this.setState({
            logout: true
        });
    }

    render() {
        if (this.state.logout) {
            return <Redirect to="/LandingPage" />
        }
        return (
            <div>
                <button onClick={this.logout}> logout </button>
                <PendingUsers />
            </div>
        );
    }
}

export default DummyPage;
