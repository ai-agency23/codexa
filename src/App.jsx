import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { locales, supportedLanguages, directionForLanguage } from './locales/index.js';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Process from './components/Process.jsx';
import WhyCodexa from './components/WhyCodexa.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const STORAGE_KEY = 'codexa-language';

function initialLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return supportedLanguages.includes(stored) ? stored : 'en';
  } catch {
    return 'en';
  }
}

export default function App() {
  const [language, setLanguage] = useState(initialLanguage);
  const reducedMotion = useReducedMotion();
  const t = useMemo(() => locales[language], [language]);
  const direction = directionForLanguage(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language still works for this visit when storage is unavailable.
    }
  }, [language, direction, t]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 87%', once: true },
          },
        );
      });
    });
    return () => context.revert();
  }, [language, reducedMotion]);

  const changeLanguage = (nextLanguage) => {
    if (supportedLanguages.includes(nextLanguage)) setLanguage(nextLanguage);
  };

  return (
    <div className={`site site--${language}`} dir={direction}>
      <a className="skip-link" href="#main-content">{t.nav.skip}</a>
      <Navigation t={t} language={language} onLanguageChange={changeLanguage} direction={direction} />
      <main id="main-content">
        <Hero t={t} direction={direction} reducedMotion={Boolean(reducedMotion)} />
        <About t={t} />
        <Services t={t} direction={direction} />
        <Projects t={t} direction={direction} />
        <Process t={t} direction={direction} />
        <WhyCodexa t={t} />
        <Contact t={t} direction={direction} />
      </main>
      <Footer t={t} language={language} onLanguageChange={changeLanguage} direction={direction} />
    </div>
  );
}
