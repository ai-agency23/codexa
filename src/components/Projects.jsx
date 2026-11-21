import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionHeading from './SectionHeading.jsx';
import ProjectVisual from './ProjectVisual.jsx';
import ArrowIcon from './ArrowIcon.jsx';

function updateCardTilt(event) {
  if (
    event.pointerType === 'touch' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();

  if (!bounds.width || !bounds.height) return;

  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  card.style.setProperty('--card-tilt-x', `${(-y * 3.5).toFixed(2)}deg`);
  card.style.setProperty('--card-tilt-y', `${(x * 3.5).toFixed(2)}deg`);
}

function resetCardTilt(event) {
  event.currentTarget.style.setProperty('--card-tilt-x', '0deg');
  event.currentTarget.style.setProperty('--card-tilt-y', '0deg');
}


function ProjectModal({ project, t, direction, onClose }) {
  console.log('MODAL COMPONENT:', project);
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="project-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="project-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        dir={direction}
      >
        <button
          type="button"
          className="project-modal__close"
          onClick={onClose}
          aria-label={t.projects.details.close}
        >
          &times;
        </button>

        <div className="project-modal__header">
          <span className="project-modal__type">{project.type}</span>
          <span className="project-modal__number">{project.number}</span>
        </div>

        <h2 id="project-modal-title" className="project-modal__title">
          {project.name}
        </h2>

        <p className="project-modal__tagline">{project.tagline}</p>

        <div className="project-modal__visual">
          <ProjectVisual type={project.preview} t={t} />
        </div>

        <section className="project-modal__section">
          <h3>{project.overviewTitle}</h3>
          <p>{project.overview}</p>
        </section>

        <section className="project-modal__section">
          <h3>{project.featuresTitle}</h3>
          <ul className="project-modal__features">
            {project.features.map((feature, index) => (
              <li key={index}>
                <span className="project-modal__check">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="project-modal__section">
          <h3>{project.technologiesTitle}</h3>
          <div className="project-modal__technologies">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        <div className="project-modal__footer">
          <span>{t.projects.details.status}</span>
          <span className="project-modal__status">{project.status}</span>
        </div>
      </div>
    </div>,
    document.body
  );


}

function ProjectCard({ item, t, direction, onOpen }) {
  const arrowDirection = direction === 'rtl' ? 'left' : 'right';
  const isSmile = item.preview === 'smile';

  return (
    <article
      className={`project-card project-card--${item.preview}`}
      data-reveal
      onPointerMove={updateCardTilt}
      onPointerLeave={resetCardTilt}
    >
      <div className="project-card__art">
        <ProjectVisual type={item.preview} t={t} />
      </div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{item.number} / {item.name}</span>

          <span className="project-status">
            <i />
            {t.projects.development}
          </span>
        </div>

        <p className="project-card__category">{item.category}</p>

        {isSmile ? (
          <a
            className="project-card__explore"
            href="https://smile-dz-website.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{t.projects.explore}</span>
            <ArrowIcon direction={arrowDirection} />
          </a>
        ) : (
          <button
            type="button"
            className="project-card__explore"
            onClick={() => onOpen(item.preview)}
          >
            <span>{t.projects.explore}</span>
            <ArrowIcon direction={arrowDirection} />
          </button>
        )}
      </div>
    </article>
  );
}

export default function Projects({ t, direction }) {
  const [selectedProject, setSelectedProject] = useState(null);
const handleOpenProject = (key) => {
  console.log('Selected project:', key);
  console.log('Available details:', Object.keys(t.projects.details || {}));
  setSelectedProject(key);
};
 const closeModal = useCallback(() => {
  setSelectedProject(null);
}, []);

  const projectDetails = selectedProject
    ? {
        ...t.projects.details[selectedProject],
        preview: selectedProject,
        name: t.projects.items.find(
          (item) => item.preview === selectedProject
        )?.name,
        number: t.projects.items.find(
          (item) => item.preview === selectedProject
        )?.number,
      }
    : null;
    console.log('PROJECT DETAILS:', projectDetails);

  return (
    <section
      className="projects section-block"
      id="projects"
      aria-labelledby="section-title-04"
    >
      <div className="page-shell">
        <div className="projects__heading-row">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            body={t.projects.body}
            number="04"
          />

          <span className="projects__count" data-reveal>
            03 <i>—</i> 03
          </span>
        </div>

        <div className="projects__grid">
          {t.projects.items.map((item) => (
            <ProjectCard
              key={item.number}
              item={item}
              t={t}
              direction={direction}
              onOpen={handleOpenProject}
            />
          ))}
        </div>
      </div>

      {projectDetails && (
        <ProjectModal
          project={projectDetails}
          t={t}
          direction={direction}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
