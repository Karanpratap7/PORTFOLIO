import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import AnimatedText from './AnimatedText.jsx';
import { itemUp, viewportOnce, stagger } from '../lib/variants.js';

const LINKS = [
  { k: 'Email', v: 'karanpratapsingh72@gmail.com', href: 'mailto:karanpratapsingh72@gmail.com' },
  { k: 'LinkedIn', v: 'karan-pratap-singh ↗', href: 'https://www.linkedin.com/in/karan-pratap-singh-35604a301/' },
  { k: 'GitHub', v: '@Karanpratap7 ↗', href: 'https://github.com/Karanpratap7' },
  { k: 'Phone', v: '+91 94608 73304', href: 'tel:+919460873304' },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="eyebrow">(06) — Contact</Reveal>

        <AnimatedText
          as="div"
          className="contact-big"
          staggerAmount={0.12}
          lines={[
            "Let's build",
            <>
              <em>something.</em>{' '}
              <a href="mailto:karanpratapsingh72@gmail.com" data-cursor>
                Say hi ↗
              </a>
            </>,
          ]}
        />

        <Reveal>
          <p className="hero-sub" style={{ maxWidth: 520, color: 'var(--soft)' }}>
            Open to internships, full-time roles, and interesting collaborations. Whether you
            want to build something together or just say hello — reach out.
          </p>
        </Reveal>

        <motion.div
          className="contact-links"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {LINKS.map((l) => (
            <motion.a
              key={l.k}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener' : undefined}
              className="clink"
              data-cursor
              variants={itemUp}
            >
              <div className="k">{l.k}</div>
              <div className="v">{l.v}</div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
