import { useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DigitalCore from './DigitalCore.jsx';
import ParticleField from './ParticleField.jsx';
import SceneLighting from './SceneLighting.jsx';

function CameraController({ progressRef, reducedMotion }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    // GSAP supplies normalized scroll progress; damping keeps camera transitions cinematic, not abrupt.
    const progress = reducedMotion ? 0 : progressRef.current.value;
    const targetZ = 5.1 + progress * 1.1;
    const targetX = 0.1 + progress * 0.5;
    const damping = Math.min(1, delta * 1.6);
    camera.position.z += (targetZ - camera.position.z) * damping;
    camera.position.x += (targetX - camera.position.x) * damping;
    camera.position.y += (0.02 + progress * 0.24 - camera.position.y) * damping;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function InteractiveScene({ progressRef, reducedMotion, accessibleLabel, rotationOffset }) {
  const compact = useMemo(() => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches, []);
  const particleCount = compact ? 54 : 130;

  return (
    <Canvas
      className="interactive-canvas"
      dpr={compact ? [1, 1.2] : [1, 1.65]}
      camera={{ position: [0.1, 0.02, 5.1], fov: 39, near: 0.1, far: 50 }}
      gl={{ alpha: true, antialias: !compact, powerPreference: 'high-performance', stencil: false, depth: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      aria-label={accessibleLabel}
    >
      <SceneLighting />
      <DigitalCore reducedMotion={reducedMotion} compact={compact} rotationOffset={rotationOffset} />
      <ParticleField count={particleCount} reducedMotion={reducedMotion} />
      <CameraController progressRef={progressRef} reducedMotion={reducedMotion} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping={!reducedMotion}
        dampingFactor={0.065}
        rotateSpeed={0.45}
        minPolarAngle={Math.PI * 0.24}
        maxPolarAngle={Math.PI * 0.76}
      />
    </Canvas>
  );
}
