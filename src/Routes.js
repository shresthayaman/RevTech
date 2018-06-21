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
          <Redirect to="/Home" />
          <Route path="/Home" component={App} />
          <Route path="/User" component={DummyPage} />
          <Route path="/Admin" component={AdminPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
