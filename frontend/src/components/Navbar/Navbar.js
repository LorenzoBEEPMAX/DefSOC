import React from 'react';
import './Navbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Home</a></li>
        {/* <li><a href="/upload">Upload File</a></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
