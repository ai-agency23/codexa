const STORAGE_LOGO = '/manus-storage/Gemini_Generated_Image_8cf6zh8cf6zh8cf6_3984f2c7.jpeg';

export default function BrandLogo({ className = '' }) {
  const handleFallback = (event) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = 'true';
    image.src = '/assets/codexa-logo.jpeg';
  };

  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={STORAGE_LOGO}
      onError={handleFallback}
      alt="CODEXA"
      width="1408"
      height="768"
    />
  );
}
