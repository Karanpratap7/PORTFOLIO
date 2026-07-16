import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';

import Cursor from './components/Cursor.jsx';
import Preloader from './components/Preloader.jsx';
import Nav from './components/Nav.jsx';
import StatusBar from './components/StatusBar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Experience from './components/Experience.jsx';
import Stack from './components/Stack.jsx';
import SkillChart from './components/SkillChart.jsx';
import Profiles from './components/Profiles.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth-scroll anchor links via Lenis (must render inside <ReactLenis>)
function AnchorScroll() {
  const lenis = useLenis();
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#' || !id) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      else el.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);
  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(prefersReduced);
  const [started, setStarted] = useState(prefersReduced);
  const footerWrapRef = useRef(null);

  // Lock scroll while the preloader is visible
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaded]);

  const handleDone = () => {
    setLoaded(true);
    setStarted(true);
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: !prefersReduced,
        smoothTouch: false,
      }}
    >
      <AnchorScroll />
      <Cursor />

      <AnimatePresence>
        {!loaded && <Preloader key="loader" onDone={handleDone} />}
      </AnimatePresence>

      <Nav />
      <StatusBar footerRef={footerWrapRef} />

      <main>
        <Hero started={started} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Stack />
        <SkillChart />
        <Profiles />
        <Contact />
      </main>

      <div ref={footerWrapRef}>
        <Footer />
      </div>
    </ReactLenis>
  );
}
