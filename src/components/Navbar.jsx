import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon"></div>
          <span>iTask</span>
        </div>
        <ul className="nav-links">
          <li className="nav-item active">Home</li>
          <li className="nav-item">Your Tasks</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar