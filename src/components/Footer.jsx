import Magnetic from './Magnetic.jsx';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-row">
          <span>© 2026 Karan Pratap Singh — Jaipur, India</span>
          <span>Built with React · Framer Motion · Lenis</span>
          <Magnetic as="a" href="#hero" className="to-top" data-cursor>
            Back to top ↑
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
