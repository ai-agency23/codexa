
const PROJECT_IMAGES = {
  smile: '/assets/smile-dz.png',
  taskflow: {
    card: '/assets/taskflow.png',
    details: '/assets/taskflow-showcase.jpg',
  },
  campus: {
    card: '/assets/campus-dz.png',
    details: '/assets/campus-plus-showcase.jpg',
  },
};

export default function ProjectVisual({ type, t, variant = 'card' }) {
  const copy = t.projects.previews[type];
  const projectImages = PROJECT_IMAGES[type];

  const image =
    typeof projectImages === 'string'
      ? projectImages
      : projectImages?.[variant];

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
