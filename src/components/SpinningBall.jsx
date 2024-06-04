'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SpinningCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='green' />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <SpinningCube />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
