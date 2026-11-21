import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BrandLogo from './BrandLogo.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import ArrowIcon from './ArrowIcon.jsx';

const links = [
  ['home', 'home'],
  ['about', 'about'],
  ['services', 'services'],
  ['projects', 'projects'],
  ['process', 'process'],
  ['contact', 'contact'],
];

export default function Navigation({ t, language, onLanguageChange, direction }) {
  const [open, setOpen] = useState(false);
  const isRTL = direction === 'rtl';

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const renderLinks = (className = '') => (
    <nav className={className} aria-label={t.nav.navigation}>
      {links.map(([key, id]) => (
        <a key={id} href={`#${id}`} onClick={closeMenu}>
          {t.nav[key]}
        </a>
      ))}
    </nav>
  );

  return (
    <header className={`nav-shell ${open ? 'nav-shell--open' : ''}`}>
      <div className="nav-bar">
        <a className="nav-brand" href="#home" aria-label={`CODEXA — ${t.nav.home}`} onClick={closeMenu}>
          <BrandLogo />
        </a>
        {renderLinks('nav-links')}
        <div className="nav-actions">
          <LanguageSelector
            language={language}
            onChange={onLanguageChange}
            label={t.nav.language}
            className="nav-languages"
          />
          <a className="button button--nav" href="#contact">
            <span>{t.nav.talk}</span>
            <ArrowIcon direction={isRTL ? 'left' : 'right'} />
          </a>
        </div>
        <button
          className={`menu-toggle ${open ? 'menu-toggle--open' : ''}`}
          type="button"
          aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            {renderLinks('mobile-navigation__links')}
            <div className="mobile-navigation__bottom">
              <LanguageSelector language={language} onChange={onLanguageChange} label={t.nav.language} />
              <a className="button button--nav" href="#contact" onClick={closeMenu}>
                <span>{t.nav.talk}</span>
                <ArrowIcon direction={isRTL ? 'left' : 'right'} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
