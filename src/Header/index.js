import React from 'react'
import './index.css'

const Header = () => (
  <header className="navbar-expand-lg navbar-light bg-light">
    <div className="container navbar">
      <h1 className="navbar-brand">User Management Details</h1>

      <div className="d-flex justify-content-center align-items-center w-25">
        <div>
          <img
            src="https://i.ibb.co/d2P45hD/Omkar-Profile-Pic.jpg"
            alt="Profile"
            className="rounded-circle w-25"
          />
        </div>
      </div>
    </div>
  </header>
)

export default Header
