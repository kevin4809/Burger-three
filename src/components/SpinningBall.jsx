'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MuffinModel = () => {
  const { scene } = useGLTF('/muffin.glb');
  const meshRef = useRef();

  const handleTouch = () => {
    alert('Funciona mamahuevossss');
    console.log('Mama tengo hambre');
    window.location.href = 'https://www.youtube.com/watch?v=RHd7CrVHUx8';
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
    }
  });

  return <primitive ref={meshRef} object={scene} rotation={[1.6, 0, 0]} scale={[0.6, 0.6, 0.6]} onClick={handleTouch} />;
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
