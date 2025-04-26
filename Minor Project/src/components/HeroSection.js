import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  color: #333;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #f7931e;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HeroButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: #f7931e;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: #e67e00;
  }
`;

const ModelContainer = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;

function FoodModel({ url, position, scale }) {
  const { scene } = useGLTF(url);
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} position={position} scale={scale} />
    </Float>
  );
}

function HeroSection() {
  return (
    <HeroContainer>
      <HeroContent
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroTitle>SWIFTBITES</HeroTitle>
        <HeroSubtitle>
          Experience the authentic taste of Indian cuisine with our carefully crafted dishes,
          made from traditional recipes and fresh ingredients.
        </HeroSubtitle>
        <HeroButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Menu
        </HeroButton>
      </HeroContent>

      <ModelContainer>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FoodModel
            url="/models/indian_food.glb"
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
          />
          <OrbitControls enableZoom={false} />
          <Environment preset="sunset" />
        </Canvas>
      </ModelContainer>
    </HeroContainer>
  );
}

export default HeroSection; 