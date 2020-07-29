import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import PlantPage from "./components/PlantPage";
import Signup from "./components/Signup";
import User from "./components/User";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/plants" component={PlantPage} />
        <PrivateRoute exact path="/profile" component={User} />
      </div>
    </Router>
  );
}

export default App;
