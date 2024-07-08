'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const MuffinModel = () => {
  const { scene } = useGLTF('/muffin.glb');
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
    }
  });

  const handleClick = () => {
    console.log('Funciona Mamahuevoooooooooooooooooo');
  };

  return <primitive ref={meshRef} object={scene} rotation={[1.6, 0, 0]} scale={[0.6, 0.6, 0.6]} onClick={handleClick} />;
};

const Scene = () => {
  return (
    <Canvas className='w-full h-full'>
      <ambientLight intensity={2.3} />
      <MuffinModel />
    </Canvas>
  );
};

export default Scene;
