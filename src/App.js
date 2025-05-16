import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { FaStar } from "react-icons/fa";
import { RatingBox, ReviewButton, DiscountNote } from "./style/style";
import { FaCommentAlt } from "react-icons/fa";
import {
  PageWrapper,
  Header,
  Logo,
  Nav,
  NavItem,
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
  mahogany: {
    map: '/textures/mahogany/Wood066_2K-JPG_Color.jpg',
    normalMap: '/textures/mahogany/Wood066_2K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/mahogany/Wood066_2K-JPG_Roughness.jpg',
    color: '#8b4c39',
    usage: ['body', 'neck', 'top']
  },
  maplewood: {
    map: '/textures/mapplewood/Wood068_1K-JPG_Color.jpg',
    normalMap: '/textures/mapplewood/Wood068_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/mapplewood/Wood068_1K-JPG_Roughness.jpg',
    color: '#e0d1a0',
    usage: ['body', 'neck', 'top']
  },
  padauk: {
    map: '/textures/paudak/Wood008_2K-JPG_Color.jpg',
    normalMap: '/textures/paudak/Wood008_2K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/paudak/Wood008_2K-JPG_Roughness.jpg',
    color: '#b1361e',
    usage: ['body', 'neck', 'top']
  },
  goldmetal: {
    map: '/textures/Knob/Poliigon_MetalGoldPaint_7253_BaseColor.jpg',
    normalMap: '/textures/Knob/Poliigon_MetalGoldPaint_7253_Normal.png',
    roughnessMap: '/textures/Knob/Poliigon_MetalGoldPaint_7253_Roughness.jpg',
    metalnessMap: '/textures/Knob/Poliigon_MetalGoldPaint_7253_Metallic.jpg',
    color: '#d4af37',
    usage: ['knob', 'tarraxa']
  },
  tarraxaMetal: {
    map: '/textures/Tarraxa/Metal049B_2K-PNG_Color.png',
    normalMap: '/textures/Tarraxa/Metal049B_2K-PNG_NormalGL.png',
    roughnessMap: '/textures/Tarraxa/Metal049B_2K-PNG_Roughness.png',
    metalnessMap: '/textures/Tarraxa/Metal049B_2K-PNG_Metalness.png',
    color: '#cccccc',
    usage: ['knob', 'tarraxa']
  }
};

function GLBModel({ path, partTextureMap }) {
  const gltf = useGLTF(path);
  const ref = useRef();
  const allTextures = useLoader(THREE.TextureLoader,
    Object.values(textureSets).flatMap(t => [t.map, t.normalMap, t.roughnessMap, t.metalnessMap].filter(Boolean))
  );

  const textureLookup = useMemo(() => {
    const lookup = {};
    const keys = Object.keys(textureSets);
    let idx = 0;
    for (const key of keys) {
      const entry = textureSets[key];
      const textures = [];
      if (entry.map) textures.push(allTextures[idx++]);
      if (entry.normalMap) textures.push(allTextures[idx++]);
      if (entry.roughnessMap) textures.push(allTextures[idx++]);
      if (entry.metalnessMap) textures.push(allTextures[idx++]);
      lookup[key] = textures;
    }
    return lookup;
  }, [allTextures]);

  useEffect(() => {
    gltf.scene.traverse(child => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        const isBody = name.startsWith('body') || name.includes('centro');

        if (isBody) {
          const [map, normalMap, roughnessMap] = textureLookup[partTextureMap.body];
          Object.assign(child.material, { map, normalMap, roughnessMap, needsUpdate: true });
        } else if (name.startsWith('headstock')) {
          const [map, normalMap, roughnessMap] = textureLookup[partTextureMap.top];
          Object.assign(child.material, { map, normalMap, roughnessMap, needsUpdate: true });
        } else if (name.startsWith('fretboard')) {
          const [map, normalMap, roughnessMap] = textureLookup[partTextureMap.neck];
          Object.assign(child.material, { map, normalMap, roughnessMap, needsUpdate: true });
        } else if (name.startsWith('knok')) {
          const textures = textureLookup[partTextureMap.knob];
          const [map, normalMap, roughnessMap, metalnessMap] = textures;
          Object.assign(child.material, {
            map, normalMap, roughnessMap,
            metalnessMap,
            metalness: metalnessMap ? 1 : 0,
            needsUpdate: true
          });
        } else if (name.toLowerCase().startsWith('tarraxas')) {
          const textures = textureLookup[partTextureMap.tarraxa];
          const [map, normalMap, roughnessMap, metalnessMap] = textures;
          Object.assign(child.material, {
            map,
            normalMap,
            roughnessMap,
            metalnessMap,
            metalness: metalnessMap ? 1 : 0,
            needsUpdate: true
          });
        }
      }
    });
  }, [textureLookup, gltf.scene, partTextureMap]);

  useFrame(() => { });

  return <primitive ref={ref} object={gltf.scene} scale={[2.5, 2.5, 2.5]} />;
}

function PartSelector({ part, selected, onChange }) {
  return (
    <ColorSelectorContainer>
      <Label>{part.toUpperCase()}</Label>
      <ColorOptions>
        {Object.entries(textureSets)
          .filter(([_, value]) => value.usage.includes(part))
          .map(([key, value]) => (
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

function Navigation() {
  const links = [
    "ABOUT US",
    "IN STOCK",
    "MODELS",
    "BUILD YOUR BASS",
    "CUSTOM SHOP",
    "ARTISTS",
    "PAYMENT PLAN",
    "VIDEOS",
    "TESTIMONIALS",
    "CONTACT"
  ];
  return (
    <Nav>
      {links.map(link => (
        <NavItem key={link} active={link === "BUILD YOUR BASS"}>{link}</NavItem>
      ))}
    </Nav>
  );
}

function App() {
  const [partTextureMap, setPartTextureMap] = useState({
    body: 'mahogany',
    top: 'maplewood',
    neck: 'padauk',
    knob: 'goldmetal',
    tarraxa: 'tarraxaMetal'
  });
  const [quantity, setQuantity] = useState(1);
  const lightRef = useRef();

  const handleChange = (part, value) => {
    setPartTextureMap(prev => ({ ...prev, [part]: value }));
  };

  return (
    <PageWrapper>
      <Header>
        <Logo src="/Logo.png" alt="Logo" />
        <Navigation />
      </Header>
      <SceneLayout>
        <LeftPanel>
          <CanvasContainer>
            <Canvas camera={{ position: [0, 0, 7.5] }}>
              <ambientLight intensity={1.8} />
              <directionalLight ref={lightRef} position={[1, 9, -5]} intensity={1.5} />
              <GLBModel path="/WaveBird.glb" partTextureMap={partTextureMap} />
              <OrbitControls />
            </Canvas>
          </CanvasContainer>
        </LeftPanel>

        <RightPanel>
          <ProductTitle>WAVEBIRD CUSTOM</ProductTitle>
          <Price>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flexDirection: 'column' }}>
            $1,500.00
            <StrikePrice>$2,500</StrikePrice>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexDirection: 'row', marginBottom: '18px' }}>
              <RatingBox>
                <FaStar size={14} />
                4.8
              </RatingBox>

              <ReviewButton>
                <FaCommentAlt size={14} />
                67 Reviews
              </ReviewButton>
            </div>
            
          </Price>



          <DiscountNote>
            40% off below<span>, limited time promotion</span>
          </DiscountNote>

          {['body', 'top', 'neck', 'knob', 'tarraxa'].map(part => (
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
