export default function SectionHeading({ eyebrow, title, body, number, align = 'start' }) {
  return (
    <div className={`section-heading section-heading--${align}`} data-reveal>
      <div className="section-heading__topline">
        {number && <span className="section-heading__number">{number}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 id={`section-title-${number}`} className="section-heading__title">{title}</h2>
      {body && <p className="section-heading__body">{body}</p>}
    </div>
  );
}
