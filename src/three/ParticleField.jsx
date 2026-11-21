import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count, reducedMotion }) {
  const points = useRef(null);
  // Seed the ambient field for a stable composition and avoid rebuilding its positions per frame.
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    let seed = 90421;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (random() - 0.5) * 7.4;
      values[index * 3 + 1] = (random() - 0.5) * 5.4;
      values[index * 3 + 2] = -1.5 - random() * 4.2;
    }
    return values;
  }, [count]);

  // The low-amplitude drift is decorative; keep the particle positions still for reduced motion.
  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y += delta * 0.012;
    points.current.rotation.x = Math.sin(Date.now() * 0.00012) * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#94dfff" size={0.018} transparent opacity={0.54} sizeAttenuation depthWrite={false} />
    </points>
  );
}
