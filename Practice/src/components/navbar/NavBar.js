import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
    const currentUser = "omid";

    return(
        <nav className="navbar">
            <div className="logo-container">
                <p>&#127812;</p>
                <p>Recipe Mate</p>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/random-recipe">Random Recipe</Link></li>
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