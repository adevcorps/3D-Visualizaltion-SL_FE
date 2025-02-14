import React, { useRef, useState, useEffect } from 'react'
import Scene from '../components/PointCloud'
import Panel from '../components/Panel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

export const Rendering = () => {
    const meshRef = useRef();  // Reference to the mesh
    const [rotation, setRotation] = useState([0, 0, 0]);
    useEffect(() => {
        // const interval = setInterval(() => {
        //     setRotation((prevRotation) => [
        //         prevRotation[0] + 0.01,  // Rotate on X axis
        //         prevRotation[1] + 0.01,  // Rotate on Y axis
        //         prevRotation[2] + 0.01   // Rotate on Z axis
        //     ]);
        // }, 100);
        // return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    return (
        <>
            <Canvas style={{ height: '100vh', background: 'lightgray' }} camera={{ position: [0, 0, 5], fov: 75 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Rotating Cube */}
                <mesh ref={meshRef} rotation={rotation}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="royalblue" />
                </mesh>

                {/* OrbitControls: Optional - allows mouse control for camera */}
                <OrbitControls />
            </Canvas>
        </>
    )
}