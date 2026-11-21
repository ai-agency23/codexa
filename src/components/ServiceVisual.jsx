export default function ServiceVisual({ type, t }) {
  if (type === 'website') {
    return (
      <div className="service-art service-art--website" aria-hidden="true">
        <div className="art-browser">
          <div className="art-browser__bar"><i /><i /><i /><span>{t.services.visuals.website}</span><b>↗</b></div>
          <div className="art-browser__body">
            <span className="art-kicker">01 / CODEXA</span>
            <strong>{t.services.visuals.websiteSub}</strong>
            <div className="art-lines"><i /><i /><i /></div>
            <div className="art-pill" />
          </div>
        </div>
        <span className="art-orbit art-orbit--website" />
      </div>
    );
  }
  if (type === 'prototype') {
    return (
      <div className="service-art service-art--prototype" aria-hidden="true">
        <div className="art-device">
          <div className="art-device__speaker" />
          <div className="art-device__screen">
            <span className="art-kicker">02 / CX</span>
            <strong>{t.services.visuals.prototype}</strong>
            <div className="art-device__cards"><i /><i /><i /></div>
            <div className="art-device__nav"><i /><i /><i /><i /></div>
          </div>
        </div>
        <span className="art-orbit art-orbit--prototype" />
      </div>
    );
  }
  return (
    <div className="service-art service-art--ai" aria-hidden="true">
      <svg viewBox="0 0 380 230" className="network-art">
        <path d="M54 155 128 66l101 48 92-70M54 155l131 38 44-79 92 53M128 66l57 127 136-167M229 114l48 53" />
        <circle cx="54" cy="155" r="7" /><circle cx="128" cy="66" r="8" /><circle cx="229" cy="114" r="11" />
        <circle cx="321" cy="44" r="7" /><circle cx="185" cy="193" r="7" /><circle cx="277" cy="167" r="8" />
        <circle className="network-art__core" cx="229" cy="114" r="3" />
      </svg>
      <span className="service-art__label">{t.services.visuals.ai}</span>
      <span className="service-art__sub">{t.services.visuals.aiSub}</span>
    </div>
  );
}
