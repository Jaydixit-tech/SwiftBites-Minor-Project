import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 5rem 5%;
  background: #f8f8f8;
  position: relative;
  z-index: 1;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled(motion.div)`
  padding: 2rem;
`;

const AboutTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const AboutDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 2rem;
`;

const AboutButton = styled(motion.button)`
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

const SceneContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
`;

function RestaurantScene() {
  const { scene } = useGLTF('/models/restaurant_scene.glb');

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive object={scene} scale={[1, 1, 1]} />
      </Float>
      <OrbitControls enableZoom={false} />
      <Environment preset="sunset" />
    </Canvas>
  );
}

function AboutSection() {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutText
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <AboutTitle>About SWIFTBITES</AboutTitle>
          <AboutDescription>
            Welcome to SWIFTBITES, where we bring the authentic taste of Indian cuisine
            to your doorstep. Our chefs craft each dish with traditional recipes,
            fresh ingredients, and a passion for culinary excellence. Experience
            the rich flavors and vibrant spices that make Indian cuisine truly special.
          </AboutDescription>
          <AboutButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </AboutButton>
        </AboutText>

        <SceneContainer>
          <RestaurantScene />
        </SceneContainer>
      </AboutContent>
    </AboutContainer>
  );
}

export default AboutSection; 