import SectionHeading from './SectionHeading.jsx';

export default function About({ t }) {
  return (
    <section className="about section-block" id="about" aria-labelledby="section-title-02">
      <div className="page-shell about__layout">
        <div className="about__main">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} number="02" />
          <p className="about__body" data-reveal>{t.about.body}</p>
          <div className="about__principles">
            {t.about.principles.map((principle) => (
              <article className="principle" key={principle.number} data-reveal>
                <span className="principle__number">{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
                <span className="principle__mark" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>

        <div className="about-visual" data-reveal role="img" aria-label={t.about.visual.caption}>
          <div className="about-visual__orbit about-visual__orbit--outer" />
          <div className="about-visual__orbit about-visual__orbit--middle" />
          <div className="about-visual__orbit about-visual__orbit--inner" />
          <svg className="about-visual__links" viewBox="0 0 520 520" aria-hidden="true">
            <path d="M260 92C143 92 88 168 88 260s56 168 172 168 172-76 172-168S376 92 260 92Z" />
            <path d="M105 184c41-77 121-118 204-77s131 124 106 207-115 119-207 73-144-126-103-203Z" />
            <path d="M105 337c-13-88 26-180 107-205s173 23 204 104-2 175-82 211-215-22-229-110Z" />
          </svg>
          <div className="about-visual__center"><span>{t.about.visual.center}</span></div>
          <span className="about-visual__label about-visual__label--creativity">{t.about.visual.creativity}</span>
          <span className="about-visual__label about-visual__label--technology">{t.about.visual.technology}</span>
          <span className="about-visual__label about-visual__label--business">{t.about.visual.business}</span>
          <span className="about-visual__caption">{t.about.visual.caption}</span>
        </div>
      </div>
    </section>
  );
}
