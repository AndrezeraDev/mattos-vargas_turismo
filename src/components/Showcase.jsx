import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Showcase.css';

const features = [
  {
    slug: 'maria-fumaca-vinicolas-privativo',
    image: '/assets/maria-fumaca.jpg',
    kicker: 'O clássico, sem pressa',
    title: 'Maria Fumaça & vinícolas, em roteiro privativo.',
    text: 'O trem centenário pelo Vale dos Vinhedos e as melhores caves — no ritmo do seu grupo, não no da excursão.',
  },
  {
    slug: 'parque-da-ovelha',
    image: '/assets/parque-da-ovelha.jpg',
    kicker: 'Experiência de fazenda',
    title: 'Uma manhã inteira de vida no campo.',
    text: 'Cordeirinhos no colo, tosa ao vivo e a rotina real de uma fazenda da Serra. As crianças não vão querer ir embora.',
  },
  {
    slug: 'almoco-harmonizado-vinicola',
    image: '/assets/vinicola-almoco.jpg',
    kicker: 'Gastronomia',
    title: 'Almoço harmonizado, taça a taça.',
    text: 'Menu completo dentro da vinícola, conduzido por sommelier — com traslado privativo para brindar sem preocupação.',
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(features.length - 1, Math.floor(v * features.length));
    if (idx !== active) setActive(idx);
  });

  const f = features[active];

  return (
    <section className="showcase" ref={ref}>
      <div className="showcase-sticky">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={f.image}
            src={f.image}
            alt={f.title}
            className="showcase-img"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </AnimatePresence>
        <div className="showcase-shade" />

        <div className="showcase-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={f.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <p className="showcase-kicker">{f.kicker}</p>
              <h2 className="headline">{f.title}</h2>
              <p className="showcase-text">{f.text}</p>
              <Link to={`/passeio/${f.slug}`} className="text-link light">
                Conhecer essa experiência <span className="arrow">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="showcase-progress" aria-hidden="true">
            {features.map((item, i) => (
              <span
                key={item.slug}
                className={i === active ? 'is-on' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
