'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MuffinModel = () => {
  const { scene } = useGLTF('/muffin.glb');
  const meshRef = useRef();
  const { camera, gl } = useThree();
  const [mouse] = useState(() => new Vector2());

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

  const handlePointerDown = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(meshRef.current, true);

    if (intersects.length > 0) {
      handleTouch();
    }
  };

  React.useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gl.domElement]);

  return <primitive ref={meshRef} object={scene} rotation={[1.6, 0, 0]} scale={[0.6, 0.6, 0.6]} />;
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
