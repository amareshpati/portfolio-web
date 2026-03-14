import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { easing } from "maath";
import styled, { useTheme } from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-color: ${({ theme }) => theme.bg};
`;

const Stars = (props) => {
  const ref = useRef();
  const theme = useTheme();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.5 })
  );

  // Track global mouse position manually since canvas is behind other elements
  const mouse = useRef({ x: 0, y: 0 });
  // Store the base auto-rotation separately to combine with mouse influence
  const baseRotation = useRef([0, 0, Math.PI / 4]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize to -1 to 1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Update the base "auto" rotation - significantly slowed down
    baseRotation.current[0] -= delta / 100;
    baseRotation.current[1] -= delta / 120;

    // Add parallax effect based on mouse position
    // Reduced impact from 0.15 to 0.1 for a slower, more subtle movement
    easing.damp3(
      ref.current.rotation,
      [
        baseRotation.current[0] + mouse.current.y * 0.1,
        baseRotation.current[1] + mouse.current.x * 0.1,
        baseRotation.current[2],
      ],
      0.4, // increased smoothing time for slower response
      delta
    );
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={theme.bg === "#090917" ? "#f272c8" : theme.primary}
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StyledStarsCanvas = () => {
  return (
    <StyledCanvasWrapper>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;
