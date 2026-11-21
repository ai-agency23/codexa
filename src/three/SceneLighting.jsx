export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.72} color="#d4e6ff" />
      <hemisphereLight color="#8bdfff" groundColor="#11162b" intensity={0.74} />
      <pointLight position={[3.4, 2.3, 3.8]} intensity={46} color="#4fc7ff" distance={12} decay={2} />
      <pointLight position={[-3.2, -1.1, 2.6]} intensity={34} color="#9663ff" distance={10} decay={2} />
      <directionalLight position={[0, 4, 2]} intensity={1.15} color="#ffffff" />
    </>
  );
}
