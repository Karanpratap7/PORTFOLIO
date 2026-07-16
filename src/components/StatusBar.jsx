import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function istNow() {
  const t = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(t.getHours())}:${p(t.getMinutes())}:${p(t.getSeconds())}`;
}

export default function StatusBar({ footerRef }) {
  const [clock, setClock] = useState('--:--:--');
  const [coords, setCoords] = useState('X 0000 · Y 0000');
  const nearFooter = useInView(footerRef, { margin: '0px 0px 0px 0px' });

  useEffect(() => {
    setClock(istNow());
    const iv = setInterval(() => setClock(istNow()), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const move = (e) => {
      setCoords(
        `X ${String(e.clientX).padStart(4, '0')} · Y ${String(e.clientY).padStart(4, '0')}`
      );
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="statusbar"
      animate={{ opacity: nearFooter ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="sb-l">
        <span>{clock}</span> <span>IST · GMT+5:30</span>
      </div>
      <div className="sb-c">
        <span className="sb-dot" /> Available for opportunities
      </div>
      <div className="sb-r">
        <span>{coords}</span>
      </div>
    </motion.div>
  );
}
