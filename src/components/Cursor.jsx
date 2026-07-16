import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a,button,[data-cursor],.chip,#radarCanvas';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) setHovering(false);
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor-dot"
      style={{ x: sx, y: sy }}
      animate={{
        width: hovering ? 64 : 8,
        height: hovering ? 64 : 8,
        backgroundColor: hovering ? 'rgba(193,68,14,0.15)' : 'var(--accent)',
        border: hovering ? '1px solid var(--accent)' : '1px solid transparent',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  );
}
