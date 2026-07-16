import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';
import { itemUp, viewportOnce, stagger } from '../lib/variants.js';

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="eyebrow">(01) — About</Reveal>
          <Reveal className="sec-num">Jaipur · MUJ · CGPA 8.46</Reveal>
        </div>

        <Reveal>
          <p className="statement">
            A final-year CS student building <em>production-grade</em> AI systems &amp;
            full-stack applications — comfortable owning things <em>end-to-end.</em>
          </p>
        </Reveal>

        <div className="about-grid">
          <motion.div
            className="stats"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div className="stat" variants={itemUp}>
              <div className="stat-n">
                <span className="z">0</span>
                <CountUp to={150} />+
              </div>
              <div className="stat-l">Users served · DevLinkUp</div>
            </motion.div>
            <motion.div className="stat" variants={itemUp}>
              <div className="stat-n">
                <span className="z">0</span>
                <CountUp to={8.46} decimals={2} />
              </div>
              <div className="stat-l">CGPA / 10 · Top 15%</div>
            </motion.div>
            <motion.div className="stat" variants={itemUp}>
              <div className="stat-n">
                <span className="z">0</span>
                <CountUp to={2} />
              </div>
              <div className="stat-l">AWS Certifications</div>
            </motion.div>
            <motion.div className="stat" variants={itemUp}>
              <div className="stat-n">Top&nbsp;5%</div>
              <div className="stat-l">NPTEL DSA · Nationwide</div>
            </motion.div>
          </motion.div>

          <Reveal className="about-note">
            <p>
              Final-year Computer Science student at{' '}
              <b style={{ color: 'var(--ink)' }}>Manipal University Jaipur</b>, shipping
              systems in Python, TypeScript &amp; Node.js.
            </p>
            <p>
              I've built agentic RAG pipelines with LangGraph, FAISS &amp; LangChain,
              LLM-orchestrated multi-agent workflows, and deployed full-stack platforms
              serving real users.
            </p>
            <p>Dean's List (2023–2024) · NPTEL DSA Top 5% nationwide · AWS Academy Graduate.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
