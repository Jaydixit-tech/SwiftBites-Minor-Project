import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>SWIFTBITES</h1>
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header; 