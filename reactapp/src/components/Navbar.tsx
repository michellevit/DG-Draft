import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../contexts/UserContext";



const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const handleMenuClick = () => {
    setMenuOpen(false);
  };
  return (
    <nav>
      <Link to="/" className="title">DG Draft</Link>
      <div className={"menu" + (menuOpen ? " icon-open" : "")} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {user && <li><NavLink to="/challenges" onClick={handleMenuClick}>Challenges</NavLink></li>}
        {user && <li><NavLink to="/profile" onClick={handleMenuClick}>Profile</NavLink></li>}
        {!user && <li><NavLink to="/login" onClick={handleMenuClick}>Login</NavLink></li>}
        {!user && <li><NavLink to="/signup" onClick={handleMenuClick}>Sign Up</NavLink></li>}
      </ul>
    </nav>
  )
}

export default Navbar;
