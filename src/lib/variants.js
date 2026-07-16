// Shared Framer Motion variants + easing used across the site.

export const EASE = [0.16, 1, 0.3, 1];

// Generic rise + fade, used by <Reveal>
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
};

// Container that staggers its children
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// A single masked text line: parent has overflow hidden, child slides up
export const lineChild = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
};

// Small item fade/rise for list children
export const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Default viewport config for whileInView reveals
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' };
