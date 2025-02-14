import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLoader, Canvas } from '@react-three/fiber';

// Function to load and parse static point cloud data
const loadPointCloudData = (data) => {
  const positions = [];
  const colors = [];

  data.forEach(point => {
    positions.push(point.x, point.y, point.z); // Point coordinates
    colors.push(point.r / 255, point.g / 255, point.b / 255); // RGB values normalized
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  return geometry;
};

const PointCloud = ({ data }) => {
  const geometry = loadPointCloudData(data);
  const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });

  return <points geometry={geometry} material={material} />;
};

const Scene = () => {
  const [pointCloudData, setPointCloudData] = useState([]);

  useEffect(() => {
    // Example: Loading static point cloud data
    const data = [
      { x: 1, y: 2, z: 3, r: 255, g: 0, b: 0 },
      { x: 4, y: 5, z: 6, r: 0, g: 255, b: 0 },
      { x: 7, y: 8, z: 9, r: 0, g: 0, b: 255 },
      // Add more points as needed
    ];
    setPointCloudData(data);
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      <PointCloud data={pointCloudData} />
    </Canvas>
  );
};

export default Scene;
