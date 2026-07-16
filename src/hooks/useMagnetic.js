import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic pull effect: the element eases toward the cursor while hovered.
 * Returns a ref, spring-backed x/y motion values, and mouse handlers.
 *
 * const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic();
 * <motion.a ref={ref} style={{ x, y }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} />
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mvX.set(relX * strength);
    mvY.set(relY * strength);
  };

  const onMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
