import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import PlantPage from './components/PlantPage';
import Signup from './components/Signup';
import User from './components/User';
import NavBar from './components/Navbar';
import AddPlant from "./components/AddPlant";

function App() {
  return ( 

    <div className="App">
      <NavBar />                     

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/addplant" component={AddPlant} />
        <PrivateRoute path='/plants' component={PlantPage} />
        <PrivateRoute path='/profile' component={User} />
        </Switch>

    </div>
  );
}

export default App;