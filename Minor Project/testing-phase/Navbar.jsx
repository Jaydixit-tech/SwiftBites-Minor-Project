import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#' },
    { name: 'Order Summary', href: '#' },
    { name: 'Checkout', href: '#' }
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
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo-container">
          <img src="https://cdn-icons-png.flaticon.com/512/4329/4329542.png" alt="SwiftBites Icon" />
          <span>SwiftBites</span>
        </div>
        <div className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <motion.nav 
          className="nav-links"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              className="nav-item"
              onClick={() => setActiveIndex(index)}
            >
              <motion.a
                href={item.href}
                className={activeIndex === index ? 'active' : ''}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {item.name}
                {activeIndex === index && (
                  <motion.div
                    className="circle-indicator"
                    layoutId="circle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </motion.a>
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </header>
  );
};

export default Navbar; 