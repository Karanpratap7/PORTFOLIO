import { motion } from 'framer-motion';
import { itemUp, viewportOnce, stagger } from '../lib/variants.js';

const PROFILES = [
  { tag: 'Open Source', h: 'GitHub', handle: '@Karanpratap7', href: 'https://github.com/Karanpratap7' },
  { tag: 'Competitive Programming', h: 'LeetCode', handle: '@sketchy_pariah69', href: 'https://leetcode.com/u/sketchy_pariah69/' },
];

export default function Profiles() {
  return (
    <div className="wrap" style={{ paddingBottom: '2rem' }}>
      <motion.div
        className="prof-grid"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {PROFILES.map((p) => (
          <motion.a
            key={p.h}
            href={p.href}
            target="_blank"
            rel="noopener"
            className="prof-card"
            data-cursor
            variants={itemUp}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="prof-top">
              <span className="prof-tag">{p.tag}</span>
              <span className="prof-go">↗</span>
            </div>
            <div className="prof-h">{p.h}</div>
            <div className="prof-handle">{p.handle}</div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
