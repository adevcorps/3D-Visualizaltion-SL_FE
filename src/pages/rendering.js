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

        const generateLidarPointCloud = (width = 20, depth = 20, height = 10, density = 10000) => {
            const points = [];

            for (let i = 0; i < density; i++) {
                const x = Math.random() * width - width / 2;
                const y = Math.random() * height - height / 2;
                const z = Math.random() * depth - depth / 2;

                // Adding some noise to simulate real-world data
                const noiseX = Math.random() * 0.2 - 0.1;  // Small random noise in X-axis
                const noiseY = Math.random() * 0.2 - 0.1;  // Small random noise in Y-axis
                const noiseZ = Math.random() * 0.2 - 0.1;  // Small random noise in Z-axis

                points.push(x + noiseX, y + noiseY, z + noiseZ);
            }

            return points;
        };

        // Generate LiDAR points for a terrain/building shape
        const lidarPoints = generateLidarPointCloud(30, 30, 20, 50000);

        // Create geometry and material for the point cloud
        const geometry = new THREE.BufferGeometry();
        const positionArray = new Float32Array(lidarPoints);
        const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
        geometry.setAttribute('position', positionAttribute);

        const material = new THREE.PointsMaterial({
            color: 0x00ff00,  // Point color (green)
            size: 0.1,       // Size of each point
            sizeAttenuation: true,
        });



        return <points ref={pointsRef} geometry={geometry} material={material} />;
    }

    return (
        <>
            <Canvas style={{ height: '100vh', width: '100%' }} camera={{ position: [0, 0, 5], fov: 75 }}>
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
