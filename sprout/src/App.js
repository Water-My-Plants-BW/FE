import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import styled from "styled-components";
import Login from "./components/Login";
import PlantPage from './components/PlantPage';
import Signup from './components/Signup';
import User from './components/User';
import NavBar from './components/Navbar';
import Background from './images/plantimg.jpg';

function App() {
  return ( 

    <AppWrapper>
      <NavBar />                     

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path='/plants' component={PlantPage} />
        <PrivateRoute path='/profile' component={User} />
        </Switch>

    </AppWrapper>
  );
}

const AppWrapper = styled.div`
width: 100%;
margin: 0;
font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;

`
export default App;