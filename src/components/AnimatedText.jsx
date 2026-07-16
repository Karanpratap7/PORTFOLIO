import { motion } from 'framer-motion';
import { lineChild, stagger, viewportOnce } from '../lib/variants.js';

/**
 * Renders an array of "lines" (each line may be a string or JSX) as masked,
 * staggered slide-up reveals. Set `control` to drive it manually (e.g. from a
 * parent animation state) instead of scroll.
 */
export default function AnimatedText({
  lines,
  as: Tag = 'div',
  className,
  staggerAmount = 0.12,
  delayChildren = 0,
  control, // optional: { animate: 'show' | 'hidden' } to override whileInView
  ...rest
}) {
  const container = stagger(staggerAmount, delayChildren);
  const viewProps = control
    ? { animate: control }
    : { whileInView: 'show', viewport: viewportOnce };

  return (
    <Tag className={className} {...rest}>
      <motion.span
        style={{ display: 'block' }}
        variants={container}
        initial="hidden"
        {...viewProps}
      >
        {lines.map((line, i) => (
          <span className="line-mask" key={i}>
            <motion.span style={{ display: 'block' }} variants={lineChild}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
