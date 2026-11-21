import BrandLogo from './BrandLogo.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import ArrowIcon from './ArrowIcon.jsx';

const footerLinks = [
  ['home', 'home'], ['about', 'about'], ['services', 'services'], ['projects', 'projects'], ['process', 'process'], ['contact', 'contact'],
];

export default function Footer({ t, language, onLanguageChange, direction }) {
  const services = t.services.items;
  const arrowDirection = direction === 'rtl' ? 'left' : 'right';
  return (
    <footer className="footer">
      <div className="page-shell">
        <div className="footer__top">
          <div className="footer__brand-block">
            <a href="#home" className="footer__logo" aria-label={`CODEXA — ${t.nav.home}`}><BrandLogo /></a>
            <p>{t.footer.description}</p>
            <a className="footer__back-top" href="#home"><span>{t.footer.backToTop}</span><ArrowIcon direction="up" /></a>
          </div>
          <div className="footer__column">
            <h2>{t.footer.navigation}</h2>
            {footerLinks.map(([key, id]) => <a href={`#${id}`} key={id}>{t.nav[key]}</a>)}
          </div>
          <div className="footer__column">
            <h2>{t.footer.services}</h2>
            {services.map((service) => <a href="#services" key={service.number}>{service.title}</a>)}
          </div>
          <div className="footer__column footer__column--placeholders">
            <h2>{t.footer.contact}</h2>
            <span>{t.footer.emailPlaceholder}</span>
            <h2 className="footer__social-heading">{t.footer.social}</h2>
            <span>{t.footer.socialPlaceholder}</span>
            <LanguageSelector language={language} onChange={onLanguageChange} label={t.nav.language} className="footer__languages" />
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} CODEXA. {t.footer.copyright}</span>
          <span className="footer__signature">{t.footer.tagline}</span>
        </div>
        <div className="footer__credit">Developed by Oumaima Bezzelalam</div>
      </div>
    </footer>
  );
}
