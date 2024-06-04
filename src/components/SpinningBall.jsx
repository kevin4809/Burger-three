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

  return <primitive ref={meshRef} object={scene} rotation={[1.6, 0, 0]} scale={[2.2, 2.2, 2.2]} />;
};

const Scene = () => {
  const handleClick = () => {
    window.location.href = 'http://localhost:60901/#/563/company/brand/brand-content';
  };

  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <div className='relative w-full'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='rounded-full border-2 border-white w-[280px] h-[280px] bg-[#61B5AB] '></div>
        </div>

        <div className='relative z-20'>
          <div className='relative z-30'>
            <Canvas onClick={handleClick} className='w-full'>
              <ambientLight intensity={2.3} />
              <MuffinModel />
            </Canvas>
          </div>

          <img className='absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 z-10 w-[200px]' src='/bg.svg' alt='bg' />
        </div>
      </div>
    </div>
  );
};

export default Scene;
