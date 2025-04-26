import React from 'react';
import Navbar from './Navbar';
import './styles.css';

const MenuPage = () => {
  return (
    <div className="menu-page">
      <Navbar />
      <section className="menu">
        <h1>Our Menu</h1>
        {/* Rest of your menu content */}
      </section>
    </div>
  );
};

export default MenuPage; 