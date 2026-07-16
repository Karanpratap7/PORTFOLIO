import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';

const WORDS = ['Inspire', 'Innovate', 'Impact', 'Agentic RAG', 'Full-Stack', 'LangGraph'];

function wrap(min, max, v) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

export default function Marquee({ baseVelocity = -3 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1000, 0, 1000], [-6, 0, 6], { clamp: true });

  // The track is duplicated (2x), so we wrap over -50%..0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const items = [...WORDS, ...WORDS];

  return (
    <div className="marquee">
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {items.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </motion.div>
    </div>
  );
}
