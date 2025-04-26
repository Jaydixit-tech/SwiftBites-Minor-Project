import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedNav = () => {
  const [activeLink, setActiveLink] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', path: 'test1.html' },
    { id: 'menu', label: 'Menu', path: 'Menupage.html' },
    { id: 'order-summary', label: 'Order Summary', path: 'OrderSummarypage.html' },
    { id: 'checkout', label: 'Checkout', path: 'checkoutpage.html' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.05,
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
      transition: {
        type: 'spring',
        stiffness: 400
      }
    }
  };

  return (
    <motion.nav 
      className="nav-links"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item) => (
        <motion.a
          key={item.id}
          href={item.path}
          className={activeLink === item.id ? 'active' : ''}
          variants={itemVariants}
          whileHover="hover"
          onClick={() => setActiveLink(item.id)}
        >
          {item.label}
        </motion.a>
      ))}
    </motion.nav>
  );
};

export default AnimatedNav; 