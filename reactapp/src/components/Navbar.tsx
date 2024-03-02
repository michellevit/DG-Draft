import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav>
      <Link to="/" className="title">DG Bets</Link>
      <ul>
        <li><NavLink to="/bets">Bets</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;
