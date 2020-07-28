import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
        <div><Link exact to="/">Login</Link></div>
        <div><Link exact to="/signup">Sign Up</Link></div>
        <div><Link exact to="/plants">My Plants</Link></div>
        <div><Link exact to="/profile">My Profile</Link></div>
        </>
    )
}

export default Navbar