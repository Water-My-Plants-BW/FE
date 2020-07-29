import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
        <div><Link to="/">Login</Link></div>
        <div><Link to="/signup">Sign Up</Link></div>
        <div><Link to="/plants">My Plants</Link></div>
        <div><Link to="/profile">My Profile</Link></div>
        </>
    )
}

export default Navbar