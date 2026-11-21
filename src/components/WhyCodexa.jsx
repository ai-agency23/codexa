import SectionHeading from './SectionHeading.jsx';

export default function WhyCodexa({ t }) {
  return (
    <section className="why section-block" aria-labelledby="section-title-06">
      <div className="page-shell why__layout">
        <div className="why__content">
          <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} body={t.why.body} number="06" />
          <div className="why__points">
            {t.why.points.map((point, index) => (
              <div className="why-point" key={point} data-reveal>
                <span className="why-point__number">0{index + 1}</span>
                <span>{point}</span>
                <span className="why-point__mark" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </div>
        <div className="why-visual" data-reveal>
          <svg className="why-visual__network" viewBox="0 0 540 420" fill="none" aria-hidden="true">
            <path d="M92 300 198 106l135 96 115-137M92 300l232 26 9-124 115 91M198 106l126 220 121-255M198 106 92 300" />
            <circle cx="92" cy="300" r="8" /><circle cx="198" cy="106" r="9" /><circle cx="333" cy="202" r="14" />
            <circle cx="448" cy="65" r="8" /><circle cx="324" cy="326" r="8" /><circle cx="448" cy="293" r="9" />
            <circle className="why-visual__core" cx="333" cy="202" r="4" />
          </svg>
          <div className="why-visual__center"><span>CODEXA</span><i /></div>
          <div className="why-visual__caption"><span>{t.why.visual}</span><span>06 / 09</span></div>
          {t.why.nodes.map((node, index) => <span className={`why-visual__node why-visual__node--${index + 1}`} key={node}>{node}</span>)}
        </div>
      </div>
    </section>
  );
}
