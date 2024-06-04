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

  return <primitive ref={meshRef} object={scene} rotation={[1.6, 0, 0]} />;
};

const Scene = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='rounded-full border-4 border-white bg-[#61B5AB] w-72 h-72 sm:w-96 sm:h-96 md:w-120 md:h-120 lg:w-144 lg:h-144'></div>
        </div>
        <Canvas
          className='rounded-full'
          style={{
            height: '18rem',
            width: '18rem',
            sm: { height: '24rem', width: '24rem' },
            md: { height: '30rem', width: '30rem' },
            lg: { height: '36rem', width: '36rem' },
          }}
        >
          <ambientLight intensity={2.5} />
          <MuffinModel />
        </Canvas>
      </div>
    </div>
  );
};

export default Scene;
