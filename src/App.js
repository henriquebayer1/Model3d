// Updated Product Customization Page with Image Buttons & Improved Design
import React, { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom right, #1b78d6, #dce3e8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
`;

const SceneWrapper = styled.div`
  width: 90vw;
  height: 60vh;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;
const SceneWrapper2 = styled.div`
 justify-content: center;
 align-items: center;
 gap: 15px;
`;

const SceneViewer = styled.div`
  flex: 1;
  background:rgb(0, 0, 0);
  border-radius: 20px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ControlPanel = styled.div`
  width: 250px;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
`;

const Title = styled.h1`
  position: absolute;
  top: 24px;
  font-size: 2.5rem;
  color: #222;
  text-align: center;
  right: 115px;
  width: 100%;
`;

const TextureButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const TextureIcon = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #1b78d6;
  }
`;

const textureOptions = [
  "/textures/DefaultMaterial_baseColor.jpeg",
  "/textures/DefaultMaterial_metallicRoughness.png",
  "/textures/DefaultMaterial_normal.png",
];

const textureIcons = [
  "/tex1.png",
  "/tex2.png",
  "/tex3.png",
];

function ColoredModel({ gltfPath, textureIndex }) {
  const gltf = useGLTF(gltfPath);
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, textureOptions[textureIndex]);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture, gltf]);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  return <primitive object={gltf.scene} ref={ref} scale={[2.5, 2.5, 2.5]} />;
}


function GLBModel({ path }) {
  const gltf = useGLTF(path);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });

  return <primitive ref={ref} object={gltf.scene} scale={[2.5, 2.5, 2.5]} />;
}



function App() {
  const [textureIndex, setTextureIndex] = useState(0);

  return (
    <Container>
      <Title>Customização do seu instrumento</Title>
  
      <SceneWrapper>
        <SceneViewer>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ColoredModel gltfPath="/scene.gltf" textureIndex={textureIndex} />
            <OrbitControls />
          </Canvas>
        </SceneViewer>


        <SceneViewer>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <GLBModel path="/GuitarModelMGBass.glb" /> {/* Novo modelo sem textura */}
          <OrbitControls />
        </Canvas>
        </SceneViewer>

       
        <ControlPanel>
          {textureIcons.map((icon, idx) => (
            <TextureButton key={idx} onClick={() => setTextureIndex(idx)}>
              <TextureIcon src={icon} alt={`Texture ${idx}`} />
            </TextureButton>
          ))}
        </ControlPanel>
      </SceneWrapper>
    </Container>
  );
}

useGLTF.preload("/scene.gltf");
useGLTF.preload("/GuitarModelMGBass.glb");
export default App;

