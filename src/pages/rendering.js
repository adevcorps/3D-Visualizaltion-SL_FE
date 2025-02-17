import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Leva, useControls } from 'leva';
import '../assets/css/panel.css';

export const Rendering = () => {
  const { size, density, scale, color } = useControls({
    size: { value: 0.05, min: 0.01, max: 1, step: 0.01 },
    density: { value: 100000, min: 100, max: 100000, step: 100 },
    scale: { value: true },
    color : { value: '#00ff00'}
  });

  const generateLidarPointCloud = (width = 20, depth = 20, height = 10, density = 10000) => {
    const points = [];
    for (let i = 0; i < density; i++) {
      const x = Math.random() * width - width / 2;
      const y = Math.random() * height - height / 2;
      const z = Math.random() * depth - depth / 2;
      const noiseX = Math.random() * 0.2 - 0.1;
      const noiseY = Math.random() * 0.2 - 0.1;
      const noiseZ = Math.random() * 0.2 - 0.1;

      points.push(x + noiseX, y + noiseY, z + noiseZ);
    }
    return points;
  };

  function PointCloud({ size, scale }) {
    const pointsRef = useRef();
    const lidarPoints = generateLidarPointCloud(30, 30, 20, density);
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(lidarPoints);
    const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
    geometry.setAttribute('position', positionAttribute);

    const material = new THREE.PointsMaterial({
      color: color, // Point color (green)
      size: size, // Use size passed from Leva
      sizeAttenuation: true,
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
  }

  return (
    <>
      <Leva/>
      <Canvas style={{ height: '100vh', width: '100%' }} camera={{ position: [0, 0, 5], fov: 75 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <OrbitControls />
        <PointCloud size={size} scale={scale} />
      </Canvas>
    </>
  );
};
