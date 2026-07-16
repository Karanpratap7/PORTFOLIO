import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { itemUp, viewportOnce, stagger, EASE } from '../lib/variants.js';

const PROJECTS = [
  {
    idx: '01',
    cat: 'Full-Stack · Live Product',
    name: 'DevLinkUp',
    year: '2024—25',
    tags: ['React · Node.js', 'Express · MongoDB', 'REST · CI/CD'],
    href: 'https://dev-link-up.vercel.app',
    links: ['Live ↗', 'GitHub ↗'],
    desc: 'Full-stack developer showcase platform with 150+ registered users, zero-downtime CI/CD pipelines, and paginated RESTful APIs consumed by a React frontend. MongoDB schema optimized for read-heavy profile queries; reduced codebase duplication by 40% through systematic refactoring.',
  },
  {
    idx: '02',
    cat: 'AI · Semantic Search',
    name: 'MedDoc-Flow',
    year: '2025',
    tags: ['Python · LangChain', 'FAISS', 'Semantic Search'],
    href: 'https://github.com/Karanpratap7/MedDoc-Flow',
    links: ['GitHub ↗'],
    desc: 'AI-powered medical document assistant using FAISS vector indexing and LangChain, achieving sub-second semantic retrieval across multi-document corpora. Modular document parsing pipelines handle heterogeneous file types, abstracting ingestion complexity from the query layer.',
  },
  {
    idx: '03',
    cat: 'AI · Agentic Workflows',
    name: 'CLI Research Tool',
    year: '2025',
    tags: ['Python · LangChain', 'Agentic Workflows', 'Tool-Calling'],
    href: 'https://github.com/Karanpratap7/CLI_ResearchTool',
    links: ['GitHub ↗'],
    desc: "Agentic AI research assistant built on LangChain's tool-calling framework. Orchestrates DuckDuckGo & Wikipedia APIs to autonomously synthesize multi-source reports from a single query.",
  },
  {
    idx: '04',
    cat: 'TypeScript · Tooling',
    name: 'Sentinel',
    year: '2025',
    tags: ['TypeScript', 'Node.js'],
    href: 'https://github.com/Karanpratap7/Sentinel',
    links: ['GitHub ↗'],
    desc: 'TypeScript security-monitoring project exploring advanced type patterns and Node.js integration for observability tooling.',
  },
];

function WorkItem({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener"
      className="work-item"
      data-cursor
      variants={itemUp}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ paddingLeft: hover ? 24 : 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="work-row">
        <div className="work-idx">{p.idx}</div>
        <div>
          <div className="work-cat">{p.cat}</div>
          <div className="work-name">
            {p.name}
            <motion.span
              className="arrow"
              animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : -12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              ↗
            </motion.span>
          </div>
          <motion.div
            className="work-desc-wrap"
            initial={false}
            animate={{ height: hover ? 'auto' : 0, opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="work-desc">{p.desc}</div>
            <div className="work-links">
              {p.links.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="work-meta">
          <div className="work-year">{p.year}</div>
          <div className="work-tags">
            {p.tags.map((t, i) => (
              <span key={i}>
                {t}
                {i < p.tags.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <Reveal className="eyebrow">(02) — Selected Work</Reveal>
            <Reveal delay={0.05}>
              <h2 className="sec-title" style={{ marginTop: '1rem' }}>
                Projects that <em>ship.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal className="sec-num">Live products &amp; open source</Reveal>
        </div>

        <motion.div
          className="work-list"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {PROJECTS.map((p) => (
            <WorkItem key={p.idx} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
