import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { buildWhatsappLink } from '../data/tours';
import './Hero.css';

/* `hold` = quanto tempo cada foto fica antes de trocar */
const SLIDES = [
  {
    src: '/assets/miolo-vale-dos-vinhedos.jpg',
    alt: 'Parreirais e a vinícola Miolo no Vale dos Vinhedos',
    hold: 15000,
  },
  {
    src: '/assets/cascata-caracol.jpg',
    alt: 'Cascata do Caracol vista do alto, Canela',
    hold: 8000,
  },
];

export default function Hero() {
  const ref = useRef(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setTimeout(
      () => setSlide((i) => (i + 1) % SLIDES.length),
      SLIDES[slide].hold
    );
    return () => clearTimeout(id);
  }, [slide]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.92]);

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div className="hero-media" style={{ scale: imgScale, y: imgY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={SLIDES[slide].src}
            src={SLIDES[slide].src}
            alt={SLIDES[slide].alt}
            fetchpriority={slide === 0 ? 'high' : 'auto'}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="hero-veil" />

      <motion.div
        className="hero-copy"
        style={{ opacity: textOpacity, scale: textScale }}
      >
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Mattos &amp; Vargas · Turismo de Experiências
        </motion.p>
        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          A Serra Gaúcha.
          <br />
          Do seu jeito.
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Experiências privativas em Gramado, Canela e Vale dos Vinhedos —
          criadas por quem é daqui.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <a href="#experiencias" className="pill">
            Ver passeios
          </a>
          <a
            href={buildWhatsappLink('Olá! Quero planejar uma viagem para a Serra Gaúcha.')}
            target="_blank"
            rel="noreferrer"
            className="pill ghost"
          >
            Falar com a gente
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden="true"
      >
        <span />
      </motion.div>
    </section>
  );
}
