

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  PageWrapper,
  Header,
  Logo,
  CartIcon,
  SceneLayout,
  LeftPanel,
  RightPanel,
  ProductTitle,
  Price,
  StrikePrice,
  ColorSelectorContainer,
  Label,
  ColorOptions,
  ColorCircle,
  CanvasContainer,
  QuantityWrapper,
  QuantityBtn,
  AddToCart,
  FavoriteIcon
} from "./style/style";

const textureSets = {
  mahogany: { map: '/textures/mahogany/Wood066_2K-JPG_Color.jpg', normalMap: '/textures/mahogany/Wood066_2K-JPG_NormalGL.jpg', roughnessMap: '/textures/mahogany/Wood066_2K-JPG_Roughness.jpg', color: '#8b4c39' },
  maplewood: { map: '/textures/mapplewood/Wood068_1K-JPG_Color.jpg', normalMap: '/textures/mapplewood/Wood068_1K-JPG_NormalGL.jpg', roughnessMap: '/textures/mapplewood/Wood068_1K-JPG_Roughness.jpg', color: '#e0d1a0' },
  padauk: { map: '/textures/paudak/Wood008_2K-JPG_Color.jpg', normalMap: '/textures/paudak/Wood008_2K-JPG_NormalGL.jpg', roughnessMap: '/textures/paudak/Wood008_2K-JPG_Roughness.jpg', color: '#b1361e' }
};

function GLBModel({ path, partTextureMap }) {
  const gltf = useGLTF(path);
  const ref = useRef();
  const allTextures = useLoader(THREE.TextureLoader, Object.values(textureSets).flatMap(t => [t.map, t.normalMap, t.roughnessMap]));
  const textureLookup = useMemo(() => {
    const lookup = {};
    const keys = Object.keys(textureSets);
    keys.forEach((key, idx) => {
      lookup[key] = allTextures.slice(idx * 3, idx * 3 + 3);
    });
    return lookup;
  }, [allTextures]);

  useEffect(() => {
    gltf.scene.traverse(child => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        if (name.startsWith('body') || name.includes('corpo')) {
          const [map, normalMap, roughnessMap] = textureLookup[partTextureMap.body];
          Object.assign(child.material, { map, normalMap, roughnessMap, needsUpdate: true });
        } else if (name.startsWith('headstock')) {
          const [map, normalMap, roughnessMap] = textureLookup[partTextureMap.top];
          Object.assign(child.material, { map, normalMap, roughnessMap, needsUpdate: true });
        } else if (name.startsWith('fretboard')) {
          const [map, normalMap, roughnessMap] = textureLookup[partTextureMap.neck];
          Object.assign(child.material, { map, normalMap, roughnessMap, needsUpdate: true });
        }
      }
    });
  }, [textureLookup, gltf.scene, partTextureMap]);

  useFrame(() => {});

  return <primitive ref={ref} object={gltf.scene} scale={[2.5, 2.5, 2.5]} />;
}

function PartSelector({ part, selected, onChange }) {
  return (
    <ColorSelectorContainer>
      <Label>{part.toUpperCase()}</Label>
      <ColorOptions>
        {Object.entries(textureSets).map(([key, value]) => (
          <ColorCircle
            key={key}
            color={value.color}
            active={selected === key}
            onClick={() => onChange(part, key)}
          />
        ))}
      </ColorOptions>
    </ColorSelectorContainer>
  );
}

function App() {
  const [partTextureMap, setPartTextureMap] = useState({ body: 'mahogany', top: 'maplewood', neck: 'padauk' });
  const [quantity, setQuantity] = useState(1);

  const handleChange = (part, value) => {
    setPartTextureMap(prev => ({ ...prev, [part]: value }));
  };

  return (
    <PageWrapper>
      <Header>
        <Logo>MG BASS</Logo>
        <CartIcon>🛒</CartIcon>
      </Header>
      <SceneLayout>
        <LeftPanel>
          <CanvasContainer>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <GLBModel path="/WaveBird.glb" partTextureMap={partTextureMap} />
              <OrbitControls />
            </Canvas>
          </CanvasContainer>
        </LeftPanel>

        <RightPanel>
          <ProductTitle>WAVEBIRD CUSTOM</ProductTitle>
          <Price>
            $1,500.00<StrikePrice>$2,500</StrikePrice>
          </Price>

          {['body', 'top', 'neck'].map(part => (
            <PartSelector
              key={part}
              part={part}
              selected={partTextureMap[part]}
              onChange={handleChange}
            />
          ))}

          <QuantityWrapper>
            <QuantityBtn onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</QuantityBtn>
            <span>{quantity}</span>
            <QuantityBtn onClick={() => setQuantity(q => q + 1)}>+</QuantityBtn>
          </QuantityWrapper>

          <AddToCart>Add To Cart</AddToCart>
        </RightPanel>
      </SceneLayout>
    </PageWrapper>
  );
}

useGLTF.preload('/WaveBird.glb');
export default App;
