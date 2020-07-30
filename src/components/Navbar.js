import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styled from "styled-components";


 const Navbar = () => {

    return (
    <NavWrapper className="nav">
    
       <NavLink className="link" activeClassName="active" exact to="/">Login</NavLink>
       <NavLink className="link" activeClassName="active" to="/signup">Sign Up</NavLink>
       <NavLink className="link" activeClassName="active" to="/plants">My Plants</NavLink>
       <NavLink className="link" activeClassName="active" to="/profile">My Profile</NavLink>

    </NavWrapper>
    )
}


export default Navbar;

const NavWrapper = styled.div`
background-color: lightgray;
display: flex;
justify-content: flex-end;
border-radius: 20px;

.link {
    margin: 10px;
    text-decoration: none;
    color: black;
    padding: 10px;
    padding-top: 10px;

    &:hover{
        color: gray;
    }

}

a.active{
    color: gray;
    background: lightgray;
}


`;