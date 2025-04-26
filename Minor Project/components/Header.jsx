import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNav from './AnimatedNav';

const Header = () => {
  const handleRegisterClick = () => {
    openRegisterModal();
  };

  const handleLoginClick = () => {
    openLoginModal();
  };

  const handleGoHome = () => {
    try {
      // Use absolute path to ensure it works from any page
      window.location.href = '/test1.html';
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to relative path if absolute path fails
      window.location.href = './test1.html';
    }
  };

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="logo"
        onClick={handleGoHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🍛 SWIFTBITES
      </motion.div>
      <AnimatedNav />
      <div className="auth">
        <button className="sign-up" onClick={handleRegisterClick}>Sign Up</button>
        <button className="login" onClick={handleLoginClick}>Login</button>
      </div>
    </motion.header>
  );
};

export default Header; 