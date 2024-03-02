import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";


const Navbar: React.FC = () => {
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
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;
