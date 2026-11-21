export default function ArrowIcon({ direction = 'right', className = '' }) {
  const rotation = direction === 'left' ? 180 : direction === 'up' ? -90 : direction === 'down' ? 90 : 0;
  return (
    <svg
      className={`arrow-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M4.5 12h14M12.5 5.75 18.75 12l-6.25 6.25" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
