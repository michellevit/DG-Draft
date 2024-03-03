import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../contexts/UserContext";


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); 
  return (
    <nav>
      <Link to="/" className="title">DG Bets</Link>
      <div className={"menu" + (menuOpen ? " icon-open" : "")} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {user && <li><NavLink to="/bets">Bets</NavLink></li>}
        {user && <li><NavLink to="/profile">Profile</NavLink></li>}
        {!user && <li><NavLink to="/login">Login</NavLink></li>}
        {!user && <li><NavLink to="/signup">Sign Up</NavLink></li>}
      </ul>
    </nav>
  )
}

export default Navbar;
