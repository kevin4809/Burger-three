'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { redirect } from 'next/dist/server/api-utils';

const MuffinModel = () => {
  const { scene } = useGLTF('/muffin.glb');
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
    }
  });

  return <primitive ref={meshRef} object={scene} rotation={[1.6, 0, 0]} />;
};

const Scene = () => {
  const handleClick = () => {
    window.location.href = 'http://localhost:60901/#/563/company/brand/brand-content';
  };

  return (
    <Canvas onClick={handleClick} style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={2} />
      <MuffinModel />\
    </Canvas>
  );
};

export default Scene;
