import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import UserView from "components/userView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
