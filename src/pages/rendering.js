import React, { useRef, useState, useEffect } from 'react'
import Scene from '../components/PointCloud'
import Panel from '../components/Panel'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import DatGui, { DatBoolean, DatNumber, DatString } from '@tim-soft/react-dat-gui';
import * as THREE from 'three'
import dat from 'dat.gui';
import '../assets/css/panel.css'

export const Rendering = () => {
    const [size, setSize] = useState(0.2);
    const [density, setDensity] = useState(5000);
    const [scale, setScale] = useState(10);
    const [guiState, setGuiState] = useState({
        size: 0.05,   // Default size of points
        density: 1000,  // Default number of points
        scale: true   // Whether points are scaled
    })

    // Handle updates from the GUI
    const handleGuiUpdate = (newData) => {
        setGuiState(newData)
    }
    function PointCloud() {
        const pointsRef = useRef();

        // Generate Perlin noise for terrain generation
        const generatePerlinNoise = (width, height, scale = 1) => {
            const noise = [];
            for (let y = 0; y < height; y++) {
                noise[y] = [];
                for (let x = 0; x < width; x++) {
                    noise[y][x] = Math.sin(x / scale) * Math.cos(y / scale) * Math.sin((x + y) / (scale * 2));
                }
            }
            return noise;
        };

        // Generate points for the mountain
        const generateMountainPoints = (width = 100, height = 100, scale = 10, numPoints = 5000) => {
            const positions = [];
            const colors = [];

            // Generate terrain based on Perlin noise
            const terrainNoise = generatePerlinNoise(width, height, scale);

            // Randomly sample points from the terrain
            for (let i = 0; i < numPoints; i++) {
                const x = Math.floor(Math.random() * width);
                const y = Math.floor(Math.random() * height);
                const z = terrainNoise[y][x] * 8;  // Increase height multiplier for more varied terrain

                // Push the point coordinates and random colors
                positions.push((x - width / 2) * 0.2, (y - height / 2) * 0.2, z);
                colors.push(Math.random() * 0.4 + 0.3);
                colors.push(Math.random() * 0.4 + 0.3);
                colors.push(Math.random() * 0.4 + 0.3);
            }

            return { positions, colors };
        };

        const { positions, colors } = generateMountainPoints(100, 100, scale, density);

        // BufferGeometry for point cloud
        const geometry = new THREE.BufferGeometry();
        const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
        geometry.setAttribute('position', positionAttribute);
        const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
        geometry.setAttribute('color', colorAttribute);

        // Material for the points
        const material = new THREE.PointsMaterial({
            size: size,
            vertexColors: true,
            sizeAttenuation: true,
        });

        return <points ref={pointsRef} geometry={geometry} material={material} />;
    }

    return (
        <>
            <Canvas style={{ height: '100vh', width: '100vw', background: 'white' }} camera={{ position: [0, 0, 5], fov: 75 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
                <OrbitControls />
                <PointCloud scale={scale} />
            </Canvas>
            <DatGui data={guiState} onUpdate={handleGuiUpdate} className="pc-panel">
                <DatNumber path="size" label="Point Size" min={0.01} max={1} step={0.01} />
                <DatNumber path="density" label="Point Density" min={1} max={10000} step={100} />
                <DatBoolean path="scale" label="Scale Points" />
            </DatGui>
        </>
    )
}
