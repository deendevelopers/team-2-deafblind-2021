import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useSelector } from "react-redux";

const NavBar = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    return(
        <nav className="navbar">
            <div className="logo-container">
                <p>&#127812;</p>
                <p>Recipe Mate</p>
            </div>
            <ul>
                <li><Link to="/">HOME</Link></li>

                <li><Link to="/chatforum">CHATFORUM</Link></li>

                {/* <li><Link to="/random-recipe">Random Recipe</Link></li> */}
                { currentUser ? 
                <li><Link to="/dashboard">ACCOUNT</Link></li>
                    :
                <li><Link to="/sign-in">SIGN-IN</Link></li>


                }
            </ ul>
        </nav>
    )
}

export default NavBar;