import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import styled from "styled-components";
import Login from "./components/Login";
import PlantPage from './components/PlantPage';
import Signup from './components/Signup';
import User from './components/User';
import NavBar from './components/Navbar';
import Background from './img/user.jpg';

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

// font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
const AppWrapper = styled.div`
background-image: url(${Background});
background-repeat: repeat;
background-position: center;
width: 100%;
height: 1000px;
margin: 0;
outline: none;
font-family: "Karma", sans-serif ;
`
export default App;