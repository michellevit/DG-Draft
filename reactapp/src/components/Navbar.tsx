import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { LoggedInProps } from "../types/interfaces";


const Navbar: React.FC<LoggedInProps> = ({ loggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" className="title">DG Bets</Link>
      <div className={"menu" + (menuOpen ? " icon-open" : "")} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to="/bets">Bets</NavLink></li>
        <li><NavLink to="/profile">{loggedIn ? "Profile" : "Log In"}</NavLink></li>
        <li><NavLink to="/signup">{loggedIn ? "" : "Sign Up"}</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;
