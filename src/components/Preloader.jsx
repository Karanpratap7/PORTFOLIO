import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/variants.js';

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let count = 0;
    const iv = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 3;
      if (count >= 100) {
        count = 100;
        clearInterval(iv);
        setN(100);
        setTimeout(() => onDone?.(), 450);
      } else {
        setN(count);
      }
    }, 90);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <motion.div
      id="loader"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="load-word">
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Karan Pratap Singh
        </motion.span>
      </div>
      <div className="load-num">{n}</div>
    </motion.div>
  );
}
