import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { itemUp, viewportOnce, stagger } from '../lib/variants.js';
import { useTheme } from '../context/ThemeContext.jsx';

const SKILLS = [
  { name: 'Backend / APIs', val: 88 },
  { name: 'Frontend / React', val: 78 },
  { name: 'AI / LangChain', val: 85 },
  { name: 'Databases', val: 80 },
  { name: 'DevOps / CI/CD', val: 74 },
  { name: 'System Design', val: 72 },
  { name: 'DSA / Algorithms', val: 86 },
  { name: 'Python', val: 88 },
];
const OVERALL = Math.round(SKILLS.reduce((a, s) => a + s.val, 0) / SKILLS.length);

function hexA(hex, a) {
  hex = hex.replace('#', '').trim();
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export default function SkillChart() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const tipRef = useRef(null);
  const boxRef = useRef(null);
  const inView = useInView(boxRef, { once: true, margin: '0px 0px -20% 0px' });

  const state = useRef({
    W: 0, CX: 0, CY: 0, R: 0, hovered: -1, phase: 0, progress: 0, colors: null, raf: 0,
  });

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    const g = (n) => cs.getPropertyValue(n).trim();
    return { ink: g('--ink'), accent: g('--accent'), soft: g('--soft'), paper: g('--paper') };
  };

  // Refresh colors when theme changes
  useEffect(() => {
    state.current.colors = readColors();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tip = tipRef.current;
    const N = SKILLS.length;
    const s = state.current;
    s.colors = readColors();

    const angle = (i) => (Math.PI * 2 * i) / N - Math.PI / 2;
    const pt = (i, f) => {
      const a = angle(i);
      return { x: s.CX + Math.cos(a) * s.R * f, y: s.CY + Math.sin(a) * s.R * f };
    };

    const resize = () => {
      const sz = Math.min(canvas.parentElement.offsetWidth, 460);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = sz * dpr;
      canvas.height = sz * dpr;
      canvas.style.width = sz + 'px';
      canvas.style.height = sz + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      s.W = sz;
      s.CX = sz / 2;
      s.CY = sz / 2;
      s.R = sz * 0.33;
    };

    const draw = (t) => {
      s.phase = t * 0.002;
      const C = s.colors;
      ctx.clearRect(0, 0, s.W, s.W);

      [25, 50, 75, 100].forEach((r) => {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const p = pt(i, r / 100);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = hexA(C.ink, r === 100 ? 0.28 : 0.12);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      for (let i = 0; i < N; i++) {
        const p = pt(i, 1);
        ctx.beginPath();
        ctx.moveTo(s.CX, s.CY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = hexA(C.ink, i === s.hovered ? 0.4 : 0.12);
        ctx.lineWidth = i === s.hovered ? 1.4 : 0.6;
        ctx.stroke();
      }

      const prog = Math.min(s.progress, 1);
      if (prog > 0) {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const p = pt(i, (SKILLS[i].val / 100) * prog);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.fillStyle = hexA(C.accent, 0.12);
        ctx.fill();
        ctx.strokeStyle = C.accent;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const p = pt(i, (SKILLS[i].val / 100) * prog);
        const isH = i === s.hovered;
        const pulse = 0.5 + 0.5 * Math.sin(s.phase * 3);
        const r = isH ? 7 + pulse * 2 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isH ? C.accent : C.ink;
        ctx.fill();
        ctx.strokeStyle = C.paper;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const lp = pt(i, 1.2);
        const a = angle(i);
        ctx.font = `400 10.5px 'Space Mono',monospace`;
        ctx.fillStyle = i === s.hovered ? C.accent : hexA(C.soft, 0.9);
        ctx.textAlign = Math.abs(Math.cos(a)) < 0.1 ? 'center' : Math.cos(a) > 0 ? 'left' : 'right';
        ctx.textBaseline = Math.sin(a) > 0.1 ? 'top' : Math.sin(a) < -0.1 ? 'bottom' : 'middle';
        ctx.fillText(SKILLS[i].name, lp.x, lp.y);
      }

      s.raf = requestAnimationFrame(draw);
    };

    const nearest = (mx, my) => {
      let best = -1, bestD = 28;
      for (let i = 0; i < N; i++) {
        const p = pt(i, SKILLS[i].val / 100);
        const d = Math.hypot(mx - p.x, my - p.y);
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (s.W / rect.width);
      const my = (e.clientY - rect.top) * (s.W / rect.height);
      s.hovered = nearest(mx, my);
      if (s.hovered >= 0) {
        tip.style.opacity = '1';
        const p = pt(s.hovered, SKILLS[s.hovered].val / 100);
        tip.innerHTML = `${SKILLS[s.hovered].name} · <b>${SKILLS[s.hovered].val}</b>`;
        tip.style.left = p.x * (rect.width / s.W) + 12 + 'px';
        tip.style.top = p.y * (rect.height / s.W) - 18 + 'px';
      } else {
        tip.style.opacity = '0';
      }
    };
    const onLeave = () => { s.hovered = -1; tip.style.opacity = '0'; };

    resize();
    s.raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Animate the polygon draw-in when it scrolls into view
  useEffect(() => {
    if (!inView) return;
    const s = state.current;
    const start = performance.now();
    const dur = 1400;
    let raf;
    const anim = (now) => {
      s.progress = Math.min((now - start) / dur, 1);
      if (s.progress < 1) raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <section id="chart">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <Reveal className="eyebrow">(05) — Attribute Rating</Reveal>
            <Reveal delay={0.05}>
              <h2 className="sec-title" style={{ marginTop: '1rem' }}>
                Skill <em>chart.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal className="sec-num">Based on projects &amp; experience</Reveal>
        </div>

        <div className="radar-wrap">
          <Reveal className="radar-box">
            <div ref={boxRef}>
              <canvas id="radarCanvas" ref={canvasRef} width="460" height="460" data-cursor />
              <div id="radarTip" ref={tipRef} />
            </div>
          </Reveal>

          <Reveal>
            <div className="ovr">
              <div className="ovr-l">
                <div className="a">Overall Rating</div>
                <div className="b">Weighted across 8 attributes</div>
              </div>
              <div className="ovr-num">
                <div>
                  <div className="n">{OVERALL}</div>
                  <div className="l">OVR</div>
                </div>
              </div>
            </div>
            <motion.div
              id="statList"
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {SKILLS.map((sk) => (
                <motion.div className="skrow" key={sk.name} variants={itemUp}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span className="skname">{sk.name}</span>
                    <span className="skval">{sk.val}</span>
                  </div>
                  <div className="skbar-bg">
                    <motion.div
                      className="skbar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sk.val}%` }}
                      viewport={viewportOnce}
                      transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
