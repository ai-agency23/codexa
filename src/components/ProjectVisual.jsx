const PROJECT_IMAGES = {
  smile: '/assets/smile-dz.png',
  taskflow: '/assets/taskflow.png',
  campus: '/assets/campus-dz.png',
};

export default function ProjectVisual({ type, t }) {
  const copy = t.projects.previews[type];
  const image = PROJECT_IMAGES[type];

  if (!image || !copy) return null;

  return (
    <div
      className={`project-preview project-preview--${type}`}
      role="img"
      aria-label={`${t.projects.previewLabel}: ${copy.label}`}
    >
      <img
        className="project-preview__image"
        src={image}
        alt={copy.label}
        loading="lazy"
      />
    </div>
  );
}
