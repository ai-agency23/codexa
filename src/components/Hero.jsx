import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandLogo from './BrandLogo.jsx';
import ArrowIcon from './ArrowIcon.jsx';
import SceneBoundary from './SceneBoundary.jsx';

const InteractiveScene = lazy(() => import('../three/InteractiveScene.jsx'));

function canRenderWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

function SceneFallback({ t }) {
  return (
    <div className="scene-fallback" role="status">
      <div className="scene-fallback__orb" aria-hidden="true"><span /><i /></div>
      <span className="scene-fallback__title">{t.hero.unavailable}</span>
      <p>{t.hero.fallback}</p>
    </div>
  );
}

function SceneLoading({ t }) {
  return (
    <div className="scene-loading" role="status" aria-live="polite">
      <span className="scene-loading__ring" aria-hidden="true" />
      <span>{t.hero.loading}</span>
    </div>
  );
}

export default function Hero({ t, direction, reducedMotion }) {
  const heroRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const [webgl, setWebgl] = useState(true);
  const [rotationOffset, setRotationOffset] = useState(0);
  const isRTL = direction === 'rtl';
  const handleSceneFailure = () => setWebgl(false);

  useEffect(() => {
    setWebgl(canRenderWebGL());
  }, []);

  useEffect(() => {
    if (reducedMotion || !heroRef.current) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(progressRef.current, {
      value: 1,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      progressRef.current.value = 0;
    };
  }, [reducedMotion]);

  return (
    <section className="hero" id="home" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__halo hero__halo--one" />
        <div className="hero__halo hero__halo--two" />
      </div>
      <div className="hero__visual" role="region" aria-label={webgl ? t.hero.orbitLabel : t.hero.fallback}>
        <div className="hero__visual-frame">
          {webgl ? (
            <SceneBoundary fallback={<SceneFallback t={t} />} onError={handleSceneFailure}>
              <Suspense fallback={<SceneLoading t={t} />}>
                <InteractiveScene progressRef={progressRef} reducedMotion={reducedMotion} accessibleLabel={t.hero.sceneLabel} rotationOffset={rotationOffset} />
              </Suspense>
            </SceneBoundary>
          ) : <SceneFallback t={t} />}
          <div className="hero__visual-caption">
            <span className="status-dot" />
            <span>{t.hero.status}</span>
          </div>
          <div className="hero__visual-index">CX / 001</div>
        </div>
        {webgl && <div className="hero__scene-hint"><span className="hero__hint-ring" />{t.hero.dragHint}</div>}
        {webgl && (
          <div className="hero__scene-controls" role="group" aria-label={t.hero.sceneControls}>
            <button type="button" title={t.hero.rotateLeft} aria-label={t.hero.rotateLeft} onClick={() => setRotationOffset((value) => value - Math.PI / 6)}>↶</button>
            <button type="button" title={t.hero.rotateRight} aria-label={t.hero.rotateRight} onClick={() => setRotationOffset((value) => value + Math.PI / 6)}>↷</button>
          </div>
        )}
      </div>

      <div className="hero__content page-shell">
        <div className="hero__copy">
          <div className="hero__eyebrow"><span className="eyebrow-line" />{t.hero.eyebrow}</div>
          <h1 id="hero-title">{t.hero.headline}</h1>
          <p className="hero__body">{t.hero.body}</p>
          <div className="hero__actions">
            <motion.a
              className="button button--primary"
              href="#contact"
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              <span>{t.hero.primary}</span>
              <ArrowIcon direction={isRTL ? 'left' : 'right'} />
            </motion.a>
            <a className="text-link" href="#projects">
              <span>{t.hero.secondary}</span>
              <ArrowIcon direction={isRTL ? 'left' : 'right'} />
            </a>
          </div>
          <div className="hero__micro-note"><span>01</span><span>{t.hero.scroll}</span></div>
        </div>
      </div>

      <div className="hero__bottom page-shell" aria-hidden="true">
        <span className="hero__bottom-left">{t.hero.sceneLabel}</span>
        <span className="hero__bottom-right">01 — 09</span>
      </div>
      <BrandLogo className="hero__mobile-logo" />
    </section>
  );
}
