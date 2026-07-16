import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText.jsx';
import Magnetic from './Magnetic.jsx';
import { EASE } from '../lib/variants.js';

const RESUME = `${import.meta.env.BASE_URL}Resume_AI.pdf`;

const lines = [
  'Building systems',
  <>
    <em>designed</em> to
  </>,
  <>
    mean <span className="thin">something.</span>
  </>,
];

// Fade/rise helper that runs when `started` becomes true
function Rise({ started, delay = 0, children, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ started }) {
  const control = started ? 'show' : 'hidden';

  return (
    <header id="hero">
      <div className="wrap">
        <div className="hero-top">
          <Rise started={started} delay={0.1} className="eyebrow">
            AI Systems · Full-Stack Engineering
          </Rise>
          <Rise started={started} delay={0.2} className="hero-loc">
            <b>Jaipur, India</b>
            <br />
            Final-year CS · MUJ
            <br />
            Est. 2023 — shipping systems
          </Rise>
        </div>

        <AnimatedText
          as="h1"
          className="hero-h"
          lines={lines}
          staggerAmount={0.12}
          delayChildren={0.3}
          control={control}
        />

        <div className="hero-bottom">
          <Rise started={started} delay={0.6}>
            <p className="hero-sub">
              I'm <b>Karan Pratap Singh</b> — I ship production-grade{' '}
              <b>agentic RAG pipelines</b>, LLM-orchestrated workflows, and full-stack
              platforms that serve real users. End-to-end, from retrieval architecture to
              CI/CD. <b>AWS certified.</b>
            </p>
          </Rise>
          <Rise started={started} delay={0.72}>
            <div className="btn-row">
              <Magnetic as="a" href="#work" className="btn btn-fill" data-cursor>
                View work ↗
              </Magnetic>
              <Magnetic
                as="a"
                href={RESUME}
                target="_blank"
                rel="noopener"
                className="btn btn-out"
                data-cursor
              >
                Résumé (PDF)
              </Magnetic>
            </div>
          </Rise>
        </div>
      </div>
    </header>
  );
}
