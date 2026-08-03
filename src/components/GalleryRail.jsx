import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { INSTAGRAM_URL } from '../data/tours';
import './GalleryRail.css';

const photos = [
  { src: '/assets/galeria/natal-luz.jpg', caption: 'Natal Luz, Gramado' },
  { src: '/assets/galeria/gramado-outono.jpg', caption: 'Outono em Gramado' },
  { src: '/assets/galeria/catedral-canela.jpg', caption: 'Catedral de Pedra, Canela' },
  { src: '/assets/galeria/lago-negro.jpg', caption: 'Lago Negro, Gramado' },
  { src: '/assets/galeria/vindima.jpg', caption: 'Vindima no Vale dos Vinhedos' },
  { src: '/assets/galeria/hortensias.jpg', caption: 'Hortênsias da Serra' },
  { src: '/assets/galeria/espumante.jpg', caption: 'Brinde na vinícola' },
  { src: '/assets/galeria/casa-da-ovelha.jpg', caption: 'Casa da Ovelha' },
];

const AUTOPLAY_MS = 4500;

export default function GalleryRail() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  const step = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.rail-item');
    if (!card) return;
    const delta = (card.offsetWidth + 18) * dir;
    const atEnd =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
    if (dir > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) step(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <section className="rail" id="galeria">
      <div className="wrap-wide rail-head">
        <motion.h2
          className="headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          A Serra, em detalhes.
        </motion.h2>

        <div className="rail-controls">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Ver mais no Instagram <span className="arrow">→</span>
          </a>
          <div className="rail-arrows">
            <button
              type="button"
              onClick={() => {
                pause();
                step(-1);
              }}
              aria-label="Fotos anteriores"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                pause();
                step(1);
              }}
              aria-label="Próximas fotos"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        className="rail-track"
        role="list"
        ref={trackRef}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onTouchStart={pause}
      >
        {photos.map((p, i) => (
          <motion.figure
            key={p.src}
            className="rail-item"
            role="listitem"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
