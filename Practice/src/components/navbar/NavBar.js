import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => (
    <nav className="navbar">
        <div className="logo-container">
            <p>&#127812;</p>
            <p>Recipe Mate</p>
        </div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/random-recipe">Random Recipe</Link></li>
        </ ul>
    </nav>
)

export default NavBar;