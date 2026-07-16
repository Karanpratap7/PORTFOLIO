import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';
import { useSound } from '../context/SoundContext.jsx';
import Magnetic from './Magnetic.jsx';

export default function Nav() {
  const { theme, toggle } = useTheme();
  const { on, toggle: toggleSound, blip } = useSound();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  return (
    <motion.nav
      animate={{ y: hidden ? '-120%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#hero" className="nav-logo">
        <b>KPS</b> ✦ Portfolio
      </a>
      <div className="nav-mid">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#chart">Skills</a>
      </div>
      <div className="nav-right">
        <button
          className="toggle"
          onClick={() => { toggle(); blip(520); }}
          aria-label="Toggle theme"
        >
          THEME<b>{theme === 'dark' ? '[B]' : '[A]'}</b>
        </button>
        <button className="toggle" onClick={toggleSound} aria-label="Toggle sound">
          SOUND<b>{on ? '[■]' : '[ ]'}</b>
        </button>
        <Magnetic as="a" href="#contact" className="nav-cta" data-cursor>
          Let's talk
        </Magnetic>
      </div>
    </motion.nav>
  );
}
