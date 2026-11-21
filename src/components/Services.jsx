import { useState } from 'react';
import SectionHeading from './SectionHeading.jsx';
import ServiceVisual from './ServiceVisual.jsx';
import ArrowIcon from './ArrowIcon.jsx';

function ServiceCard({ item, t, direction }) {
  const [expanded, setExpanded] = useState(false);
  const isRTL = direction === 'rtl';
  const panelId = `service-details-${item.number}`;

  return (
    <article className={`service-card service-card--${item.visual} ${expanded ? 'service-card--expanded' : ''}`} data-reveal>
      <div className="service-card__visual"><ServiceVisual type={item.visual} t={t} /></div>
      <div className="service-card__content">
        <div className="service-card__meta"><span>{item.number}</span><span className="service-card__meta-line" /></div>
        <h3>{item.title}</h3>
        <p className="service-card__description">{item.description}</p>
        <div className="service-card__details" id={panelId} hidden={!expanded}>
          <span className="service-card__capability-label">{t.services.visualLabel}</span>
          <ul>{item.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
        </div>
        <button
          className="service-card__more"
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((current) => !current)}
        >
          <span>{expanded ? t.services.learnLess : t.services.learnMore}</span>
          <ArrowIcon direction={expanded ? 'up' : (isRTL ? 'left' : 'right')} />
        </button>
      </div>
    </article>
  );
}

export default function Services({ t, direction }) {
  return (
    <section className="services section-block section-block--alternate" id="services" aria-labelledby="section-title-03">
      <div className="page-shell">
        <div className="services__heading-row">
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} number="03" />
          <div className="services__side-note" data-reveal><span>{t.services.eyebrow}</span><span className="services__side-rule" /></div>
        </div>
        <div className="services__list">
          {t.services.items.map((item) => <ServiceCard key={item.number} item={item} t={t} direction={direction} />)}
        </div>
      </div>
    </section>
  );
}
