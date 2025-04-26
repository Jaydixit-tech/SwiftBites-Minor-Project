import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MenuContainer = styled.section`
  padding: 5rem 5%;
  background: white;
  position: relative;
  z-index: 1;
`;

const MenuTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  color: #333;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MenuCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: #333;
`;

const CardPrice = styled.p`
  font-size: 1.2rem;
  color: #f7931e;
  font-weight: bold;
`;

const CardDescription = styled.p`
  color: #666;
  margin: 1rem 0;
`;

const ModelViewer = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
`;

function FoodCard({ title, price, description, modelUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MenuCard
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ModelViewer>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Float
              speed={isHovered ? 2 : 1}
              rotationIntensity={isHovered ? 0.5 : 0.2}
              floatIntensity={isHovered ? 0.5 : 0.2}
            >
              <FoodModel url={modelUrl} scale={[1, 1, 1]} />
            </Float>
          </PresentationControls>
        </Canvas>
      </ModelViewer>
      <CardTitle>{title}</CardTitle>
      <CardPrice>${price}</CardPrice>
      <CardDescription>{description}</CardDescription>
    </MenuCard>
  );
}

function FoodModel({ url, scale }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

const menuItems = [
  {
    title: "Butter Chicken",
    price: "12.99",
    description: "Creamy tomato-based curry with tender chicken pieces",
    modelUrl: "/models/butter_chicken.glb"
  },
  {
    title: "Biryani",
    price: "14.99",
    description: "Fragrant rice dish with spices and choice of meat",
    modelUrl: "/models/biryani.glb"
  },
  {
    title: "Paneer Tikka",
    price: "9.99",
    description: "Grilled cottage cheese with spices and vegetables",
    modelUrl: "/models/paneer_tikka.glb"
  }
];

function MenuSection() {
  return (
    <MenuContainer>
      <MenuTitle>Our Menu</MenuTitle>
      <MenuGrid>
        {menuItems.map((item, index) => (
          <FoodCard
            key={index}
            title={item.title}
            price={item.price}
            description={item.description}
            modelUrl={item.modelUrl}
          />
        ))}
      </MenuGrid>
    </MenuContainer>
  );
}

export default MenuSection; 