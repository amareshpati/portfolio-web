import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html, Sphere } from "@react-three/drei";
import styled from "styled-components";

const TerminalTag = styled.div`
  background: rgba(9, 9, 23, 0.7);
  border: 1px solid #854CE660;
  color: #854CE6;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  backdrop-filter: blur(4px);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 20px rgba(133, 76, 230, 0.15);
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  &::before {
    content: '$';
    color: #4CAF50;
    font-weight: bold;
  }
`;

const COMMANDS = [
  "git push origin main",
  "docker build -t portfolio .",
  "npm run deploy",
  "kubectl apply -f prod.yaml",
  "git commit -m 'feat: interactive globe'",
  "terraform apply",
  "aws s3 sync ./build",
  "npm start",
];

const FloatingCommand = ({ text, position, speed }) => {
  const ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    ref.current.position.x = position[0] + Math.sin(time) * 0.5;
    ref.current.position.z = position[2] + Math.cos(time) * 0.5;
    ref.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
  });

  return (
    <mesh ref={ref}>
      <Html
        distanceFactor={10}
        position={[0, 0, 0]}
        occlude={false}
        zIndexRange={[100, 0]}
        pointerEvents="none"
      >
        <TerminalTag>{text}</TerminalTag>
      </Html>
    </mesh>
  );
};

const DigitalNetwork = () => {
  return (
    <group>
      <Sphere args={[3.2, 32, 32]}>
        <meshPhongMaterial
          wireframe
          transparent
          opacity={0.1}
          color="#854CE6"
        />
      </Sphere>
      <Sphere args={[3.4, 16, 16]}>
        <meshPhongMaterial
          wireframe
          transparent
          opacity={0.05}
          color="#854CE6"
        />
      </Sphere>
    </group>
  );
};

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const commandElements = useMemo(() => {
    return COMMANDS.map((cmd, i) => {
      const angle = (i / COMMANDS.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      const radius = 5 + Math.random() * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 6;
      return (
        <FloatingCommand
          key={cmd}
          text={cmd}
          position={[x, y, z]}
          speed={0.2 + Math.random() * 0.3}
        />
      );
    });
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={earth.scene} scale={3} position-y={0} rotation-y={0} />
      <DigitalNetwork />
      {commandElements}
    </group>
  );
};




const CanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  min-height: 400px;
  max-height: 600px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    aspect-ratio: 1/1;
    min-height: 350px;
  }
`;

const EarthCanvas = () => {
  return (
    <CanvasWrapper>
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-6, 4, 10],
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#854CE6" intensity={2} />

        <Suspense fallback={null}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={false}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </CanvasWrapper>
  );
};

export default EarthCanvas;
