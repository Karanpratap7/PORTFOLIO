import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/variants.js';

/**
 * Generic scroll-reveal wrapper.
 * - Plain reveal: <Reveal>...</Reveal>
 * - Stagger container: <Reveal stagger> wraps children that use variants={itemUp}
 */
export default function Reveal({
  children,
  as = 'div',
  stagger: isStagger = false,
  delay = 0,
  className,
  style,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  const variants = isStagger
    ? stagger(0.09, delay)
    : { ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } } };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
