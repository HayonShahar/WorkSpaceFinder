import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link for better navigation
import "../../styles/header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("vvvv")
  }

  const isConnected = () => {
    const token = localStorage.getItem("token");
    
    if(!token){
      return true;
    }
    return false;
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">WorkSpace Finder</Link>
      </div>
      <div className={`nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/addworkplace">Add Work Place</Link></li>
          <li><Link to="/promote">Promote</Link></li> {/* Added Promote link */}
          {!isConnected() && <li><button onClick={logout}>Logout</button></li>} 
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
};

export default Header;
