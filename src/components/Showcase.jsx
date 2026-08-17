import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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

const EASE = [0.2, 0.8, 0.2, 1];
const SWIPE_THRESHOLD = 60;

export default function Showcase() {
  /* `dir` guarda o sentido do último movimento para a transição sair
     e entrar pelo lado certo */
  const [[active, dir], setState] = useState([0, 0]);

  const go = (next) => {
    const total = features.length;
    const wrapped = (next + total) % total;
    if (wrapped === active) return;
    setState([wrapped, next > active ? 1 : -1]);
  };

  const onDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const power = offset.x + velocity.x * 0.12;
    if (power < -SWIPE_THRESHOLD) go(active + 1);
    else if (power > SWIPE_THRESHOLD) go(active - 1);
  };

  const f = features[active];

  return (
    <section className="showcase" aria-roledescription="carrossel">
      <motion.div
        className="showcase-stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={onDragEnd}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={f.image}
            src={f.image}
            alt={f.title}
            className="showcase-img"
            draggable="false"
            custom={dir}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </AnimatePresence>
        <div className="showcase-shade" />

        <div className="showcase-copy">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={f.slug}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -36 : 36 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="showcase-kicker">{f.kicker}</p>
              <h2 className="headline">{f.title}</h2>
              <p className="showcase-text">{f.text}</p>
              <Link to={`/passeio/${f.slug}`} className="text-link light">
                Conhecer essa experiência <span className="arrow">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="showcase-controls">
            <button
              type="button"
              className="showcase-arrow"
              onClick={() => go(active - 1)}
              aria-label="Experiência anterior"
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              className="showcase-arrow"
              onClick={() => go(active + 1)}
              aria-label="Próxima experiência"
            >
              <FiChevronRight />
            </button>

            <div className="showcase-progress">
              {features.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  className={i === active ? 'is-on' : ''}
                  onClick={() => go(i)}
                  aria-label={`Ir para ${item.title}`}
                  aria-current={i === active}
                />
              ))}
            </div>

            <span className="showcase-hint" aria-hidden="true">
              arraste para ver mais
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
