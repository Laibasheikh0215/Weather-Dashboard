import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import RainEffect from './RainEffect';

function AnimatedGlobe() {
  const globeRef = useRef();
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });
  return (
    <Sphere ref={globeRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} emissive="#1e3a8a" />
    </Sphere>
  );
}

export default function ThreeBackground({ weatherCondition }) {
  const isRaining = weatherCondition === 'Rain';
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />   {/* ← lowercase, no import needed */}
        <AnimatedGlobe />
        <Stars radius={100} depth={50} count={3000} factor={4} fade />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <RainEffect isRaining={isRaining} />
      </Canvas>
    </div>
  );
}