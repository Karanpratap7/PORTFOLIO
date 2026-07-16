import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const SoundContext = createContext({ on: false, toggle: () => {}, blip: () => {} });

export function SoundProvider({ children }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const onRef = useRef(false);
  onRef.current = on;

  const ensure = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  }, []);

  const blip = useCallback((freq = 440) => {
    if (!onRef.current) return;
    const ctx = ensure();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.04, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.12);
  }, [ensure]);

  const toggle = useCallback(() => {
    ensure();
    setOn((v) => {
      const next = !v;
      onRef.current = next;
      if (next) blip(660);
      return next;
    });
  }, [ensure, blip]);

  // Global hover blips on interactive elements
  useEffect(() => {
    const over = (e) => {
      if (!onRef.current) return;
      if (e.target.closest && e.target.closest('a,button,[data-cursor],.chip')) blip(880);
    };
    document.addEventListener('mouseover', over);
    return () => document.removeEventListener('mouseover', over);
  }, [blip]);

  return (
    <SoundContext.Provider value={{ on, toggle, blip }}>{children}</SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
