import React, { Component } from "react";
import App from "./App.js";
import DummyPage from "./DummyPage.js";
import AdminPage from "./AdminPage.js";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect to="/LandingPage" />
          <Route path="/LandingPage" component={App} />
          <Route path="/DummyPage" component={DummyPage} />
          <Route path="/AdminPage" component={AdminPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
