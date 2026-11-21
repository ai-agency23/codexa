import { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function createOrbitNodes() {
  const nodes = [];
  const count = 20;
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    const latitude = Math.sin(index * 1.72) * 0.72;
    const radius = 1.72 + Math.cos(index * 2.3) * 0.14;
    nodes.push([
      Math.cos(angle) * Math.cos(latitude) * radius,
      Math.sin(latitude) * radius,
      Math.sin(angle) * Math.cos(latitude) * radius,
    ]);
  }
  return nodes;
}

export default function DigitalCore({ reducedMotion, compact, rotationOffset = 0 }) {
  const assembly = useRef(null);
  const appliedRotation = useRef(rotationOffset);
  const innerCore = useRef(null);
  const { pointer } = useThree();
  const [hovered, setHovered] = useState(false);
  // Build the orbit layout and edge buffers once so render frames do not allocate geometry.
  const nodes = useMemo(createOrbitNodes, []);
  const wireGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.64, 1)), []);
  const pointGeometry = useMemo(() => new THREE.SphereGeometry(0.047, 12, 12), []);

  // Keep subtle idle/pointer motion in the R3F frame loop; reduced motion leaves the core still.
  useFrame((_, delta) => {
    if (!assembly.current) return;
    assembly.current.rotation.y += rotationOffset - appliedRotation.current;
    appliedRotation.current = rotationOffset;
    const motionScale = reducedMotion ? 0 : 1;
    const speed = motionScale * delta;
    assembly.current.rotation.y += speed * (hovered ? 0.24 : 0.095);
    if (reducedMotion) {
      assembly.current.rotation.x = 0;
      assembly.current.rotation.z = 0;
    } else {
      assembly.current.rotation.x += (pointer.y * 0.13 - assembly.current.rotation.x) * Math.min(1, delta * 1.3);
      assembly.current.rotation.z += (pointer.x * -0.08 - assembly.current.rotation.z) * Math.min(1, delta * 1.15);
    }
    if (innerCore.current) {
      if (reducedMotion) innerCore.current.scale.setScalar(1);
      else {
        const targetScale = hovered ? 1.055 : 1;
        const factor = Math.min(1, delta * 4);
        innerCore.current.scale.setScalar(THREE.MathUtils.lerp(innerCore.current.scale.x, targetScale, factor));
      }
    }
  });

  const enter = (event) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'grab';
  };
  const leave = () => {
    setHovered(false);
    document.body.style.cursor = '';
  };
  const nodeScale = compact ? 0.8 : 1;

  return (
    <group ref={assembly}>
      <group ref={innerCore}>
        <mesh onPointerOver={enter} onPointerOut={leave}>
          <dodecahedronGeometry args={[0.91, 0]} />
          <meshPhysicalMaterial
            color={hovered ? '#5148ed' : '#1b367e'}
            metalness={0.78}
            roughness={0.24}
            clearcoat={0.9}
            clearcoatRoughness={0.2}
            emissive={hovered ? '#2024ad' : '#102357'}
            emissiveIntensity={hovered ? 0.72 : 0.42}
            flatShading
          />
        </mesh>
        <mesh scale={0.59}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#0b142e" metalness={0.58} roughness={0.31} emissive="#1c53d7" emissiveIntensity={0.34} />
        </mesh>
        <mesh scale={0.24}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#8deaff" toneMapped={false} />
        </mesh>
      </group>

      <lineSegments geometry={wireGeometry}>
        <lineBasicMaterial color={hovered ? '#d28aff' : '#4bcffc'} transparent opacity={0.68} />
      </lineSegments>
      <mesh rotation={[0.82, 0.24, 0.16]}>
        <torusGeometry args={[1.91, 0.012, 8, 120]} />
        <meshStandardMaterial color="#7f6bff" emissive="#4835ff" emissiveIntensity={0.8} metalness={0.58} roughness={0.3} />
      </mesh>
      <mesh rotation={[1.22, -0.42, 0.28]}>
        <torusGeometry args={[2.06, 0.008, 6, 120]} />
        <meshBasicMaterial color="#6de7ff" transparent opacity={0.66} />
      </mesh>
      <mesh rotation={[0.34, 0.72, -0.22]}>
        <torusGeometry args={[1.47, 0.006, 6, 100]} />
        <meshBasicMaterial color="#af88ff" transparent opacity={0.46} />
      </mesh>

      {nodes.map((position, index) => (
        <mesh key={index} position={position} scale={nodeScale}>
          <sphereGeometry args={[0.042 + (index % 3) * 0.008, 12, 12]} />
          <meshBasicMaterial color={index % 3 === 0 ? '#9b79ff' : '#82e6ff'} toneMapped={false} />
        </mesh>
      ))}
      <mesh scale={2.12}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7e86ff" wireframe transparent opacity={0.055} />
      </mesh>
      <mesh position={[1.98, 0.06, 0.18]} scale={0.055}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#f5f7ff" toneMapped={false} />
      </mesh>
      <mesh position={[-1.85, -0.14, 0.64]} scale={0.038}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#82e6ff" toneMapped={false} />
      </mesh>
    </group>
  );
}
