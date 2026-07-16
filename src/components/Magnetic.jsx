import { motion } from 'framer-motion';
import useMagnetic from '../hooks/useMagnetic.js';

/**
 * Wraps a link/button in a magnetic pull effect.
 * Usage: <Magnetic as="a" href="#" className="btn">Label</Magnetic>
 */
export default function Magnetic({ as = 'a', strength = 0.35, children, ...rest }) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);
  const MotionTag = motion[as] || motion.a;
  return (
    <MotionTag
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
