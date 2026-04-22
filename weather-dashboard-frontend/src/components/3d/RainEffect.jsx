import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';

const RainEffect = ({ isRaining }) => {
  const pointsRef = useRef();
  const particleCount = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i*3] = (Math.random() - 0.5) * 20;
      arr[i*3+1] = Math.random() * 12;
      arr[i*3+2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !isRaining) return;
    const positionsAttr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positionsAttr[i*3+1] -= 0.08;
      if (positionsAttr[i*3+1] < -2) {
        positionsAttr[i*3+1] = 10;
        positionsAttr[i*3] = (Math.random() - 0.5) * 20;
        positionsAttr[i*3+2] = (Math.random() - 0.5) * 15;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!isRaining) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={particleCount} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#a0c4ff" size={0.04} transparent opacity={0.7} />
    </points>
  );
};
export default RainEffect;