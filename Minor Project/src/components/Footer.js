import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #333;
  color: white;
  padding: 4rem 5%;
  position: relative;
  z-index: 1;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #f7931e;
  }

  p {
    line-height: 1.6;
    color: #ccc;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f7931e;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
`;

const FooterLink = styled.a`
  color: #f7931e;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h3>SWIFTBITES</h3>
          <p>
            Experience the authentic taste of Indian cuisine with our carefully
            crafted dishes, made from traditional recipes and fresh ingredients.
          </p>
          <SocialIcons>
            <SocialIcon
              href="#"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="#"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
              href="#"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </SocialIcon>
          </SocialIcons>
        </FooterColumn>

        <FooterColumn>
          <h3>Quick Links</h3>
          <p>
            <FooterLink href="#">Home</FooterLink>
            <br />
            <FooterLink href="#">Menu</FooterLink>
            <br />
            <FooterLink href="#">About</FooterLink>
            <br />
            <FooterLink href="#">Contact</FooterLink>
          </p>
        </FooterColumn>

        <FooterColumn>
          <h3>Contact Us</h3>
          <p>
            Email: info@swiftbites.com
            <br />
            Phone: +1 (555) 123-4567
            <br />
            Address: 123 Food Street, City, Country
          </p>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <p>
          © {new Date().getFullYear()} SWIFTBITES. All rights reserved. |{' '}
          <FooterLink href="#">Privacy Policy</FooterLink> |{' '}
          <FooterLink href="#">Terms of Service</FooterLink>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer; 