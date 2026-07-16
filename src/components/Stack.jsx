import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { itemUp, viewportOnce, stagger } from '../lib/variants.js';

const CATS = [
  {
    n: '01',
    t: 'AI & ML',
    chips: ['LangChain', 'LangGraph', 'FAISS', 'RAG Pipelines', 'Agentic Workflows', 'Prompt Engineering', 'Vector Search'],
  },
  {
    n: '02',
    t: 'Languages',
    chips: ['Python', 'TypeScript', 'JavaScript ES6+', 'SQL', 'HTML / CSS'],
  },
  {
    n: '03',
    t: 'Backend & Frameworks',
    chips: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'WebSockets', 'React', 'Next.js', 'Streamlit'],
  },
  {
    n: '04',
    t: 'Data · Cloud · DevOps',
    chips: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS (S3 · EC2 · Lambda)', 'Docker', 'CI/CD', 'Git / GitHub', 'Vercel'],
  },
];

const CERTS = [
  {
    badge: 'AWS',
    name: 'AWS Academy Graduate — Cloud Architecting',
    meta: ['60 hrs · Apr 2026', 'View on Credly ↗'],
    href: 'https://www.credly.com/go/kUCAOTqN',
  },
  {
    badge: 'AWS',
    name: 'AWS Academy Graduate — Cloud Security Foundations',
    meta: ['20 hrs · Mar 2026', 'View on Credly ↗'],
    href: 'https://www.credly.com/go/jq2UPQVi',
  },
  {
    badge: 'NPTEL',
    name: 'Data Structures & Algorithms',
    meta: ['Top 5% nationwide · 87%'],
    href: null,
  },
];

export default function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <Reveal className="eyebrow">(04) — Capabilities</Reveal>
            <Reveal delay={0.05}>
              <h2 className="sec-title" style={{ marginTop: '1rem' }}>
                The <em>stack.</em>
              </h2>
            </Reveal>
          </div>
        </div>

        <motion.div
          className="skill-grid"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {CATS.map((c) => (
            <motion.div className="skill-cat" key={c.n} variants={itemUp}>
              <div className="skill-cat-h">
                <span className="n">{c.n}</span>
                <span className="t">{c.t}</span>
              </div>
              <div className="chips">
                {c.chips.map((chip) => (
                  <motion.span
                    className="chip"
                    key={chip}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="certs"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {CERTS.map((cert, i) => {
            const inner = (
              <>
                <div className="cert-l">
                  <span className="cert-badge">{cert.badge}</span>
                  <span className="cert-name">{cert.name}</span>
                </div>
                <div className="cert-meta">
                  {cert.meta.map((m, j) => (
                    <span key={j}>
                      {m}
                      {j < cert.meta.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </>
            );
            return cert.href ? (
              <motion.a
                key={i}
                href={cert.href}
                target="_blank"
                rel="noopener"
                className="cert"
                data-cursor
                variants={itemUp}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div key={i} className="cert" variants={itemUp}>
                {inner}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
