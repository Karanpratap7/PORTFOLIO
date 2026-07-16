import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { itemUp, viewportOnce, stagger } from '../lib/variants.js';

const XP = [
  {
    date: 'Jun 2026 — Present',
    now: true,
    role: 'Full Stack Developer Intern',
    co: 'Site Guru Pvt. Ltd. · Remote',
    points: [
      'Building full-stack web apps with JavaScript, Node.js, Vue 2 & MongoDB in a performance-driven remote team.',
      'Developing & consuming RESTful APIs, implementing auth flows, and shipping frontend interfaces to production across live client projects.',
      'Daily code reviews and consistent output within an Agile workflow.',
    ],
  },
  {
    date: 'May 2025 — Jun 2025',
    role: 'Software Developer Intern',
    co: 'Partners Choice Beverages Pvt. Ltd. · Jaipur',
    points: [
      'Built Python & JavaScript automation scripts that cut weekly report turnaround time by 60%.',
      'Designed standardized data output pipelines and authored technical docs that reduced onboarding time.',
      'Shipped features across 4-week Agile sprints with zero production regressions; managed Git branching & reviews.',
    ],
  },
  {
    date: 'Aug 2023 — May 2027',
    role: 'B.Tech, Computer Science',
    co: 'Manipal University Jaipur · CGPA 8.46 / 10',
    points: [
      'Coursework: Data Structures & Algorithms, Software Engineering, Database Systems, Operating Systems.',
      "Dean's List (2023–2024) — consistently top 15% of cohort.",
      'NPTEL DSA — Top 5% nationwide (Score: 87%).',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <Reveal className="eyebrow">(03) — Experience</Reveal>
            <Reveal delay={0.05}>
              <h2 className="sec-title" style={{ marginTop: '1rem' }}>
                Where I've <em>built.</em>
              </h2>
            </Reveal>
          </div>
        </div>

        <motion.div
          className="xp"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {XP.map((x, i) => (
            <motion.div className="xp-item" key={i} variants={itemUp}>
              <div className={`xp-date${x.now ? ' xp-now' : ''}`}>{x.date}</div>
              <div>
                <div className="xp-role">{x.role}</div>
                <div className="xp-co">{x.co}</div>
              </div>
              <ul className="xp-ul">
                {x.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
