import { useState } from 'react';
import SectionHeading from './SectionHeading.jsx';
import ArrowIcon from './ArrowIcon.jsx';

export default function Process({ t, direction }) {
  const [active, setActive] = useState(0);
  const isRTL = direction === 'rtl';
  return (
    <section className="process section-block section-block--alternate" id="process" aria-labelledby="section-title-05">
      <div className="page-shell process__layout">
        <div className="process__intro">
          <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} body={t.process.body} number="05" />
          <div className="process__active-note" aria-live="polite" data-reveal>
            <span className="process__active-number">{t.process.steps[active].number}</span>
            <p>{t.process.steps[active].body}</p>
          </div>
        </div>
        <div className="process__timeline" role="list" aria-label={t.process.title}>
          <div className="process__rail" aria-hidden="true"><span style={{ '--progress': `${((active + 1) / t.process.steps.length) * 100}%` }} /></div>
          {t.process.steps.map((step, index) => (
            <button
              className={`process-step ${active === index ? 'process-step--active' : ''}`}
              type="button"
              role="listitem"
              key={step.number}
              aria-current={active === index ? 'step' : undefined}
              onClick={() => setActive(index)}
            >
              <span className="process-step__number">{step.number}</span>
              <span className="process-step__title">{step.title}</span>
              <span className="process-step__arrow"><ArrowIcon direction={isRTL ? 'left' : 'right'} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
