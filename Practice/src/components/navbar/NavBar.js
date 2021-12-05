import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useSelector } from "react-redux";

const NavBar = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    return(
        <nav className="navbar">
            <a href="/" className="logo-container">
                <p>&#127812;</p>
                <p>Recipe Mate</p>
            </a>
            <ul>
                <li><Link to="/">Home</Link></li>
                { currentUser ? 
                <li><Link to="/dashboard">Account</Link></li>
                    :
                <li><Link to="/sign-in">Sign-In</Link></li>
                }
            </ ul>
        </nav>
    )
}

export default NavBar;