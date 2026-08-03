import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';
import './BentoGrid.css';

/* Tamanhos do mosaico, na ordem do catálogo */
const SIZES = {
  'transfer-receptivo-privado': 'wide',
  'parque-da-ovelha': 'big',
  'almoco-harmonizado-vinicola': '',
  'maria-fumaca-vinicolas-privativo': 'big',
  'noite-alema': '',
  'noite-italiana': '',
  'enoturismo-bento-goncalves': '',
  'vale-dos-vinhedos': 'wide',
  'rota-boas-compras': '',
};

const VISIBLE_COUNT = 8;

export default function BentoGrid() {
  const [showAll, setShowAll] = useState(false);
  const visibleTours = showAll ? tours : tours.slice(0, VISIBLE_COUNT);
  const hiddenCount = tours.length - VISIBLE_COUNT;

  return (
    <section className="bento" id="experiencias">
      <div className="wrap-wide">
        <motion.div
          className="bento-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="headline">Todas as experiências.</h2>
          <p className="subhead">
            Nove jeitos de viver a Serra. Toque em um passeio para ver os
            detalhes e reservar.
          </p>
        </motion.div>

        <div className="bento-grid">
          {visibleTours.map((tour, i) => (
            <motion.div
              key={tour.slug}
              className={`bento-cell ${SIZES[tour.slug] || ''}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: (i % 3) * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <Link to={`/passeio/${tour.slug}`} className="bento-card">
                <img src={tour.image} alt={tour.title} loading="lazy" />
                <div className="bento-fade" />
                <span className="bento-plus" aria-hidden="true">
                  +
                </span>
                <div className="bento-label">
                  <small>{tour.meta.map((m) => m.label).join(' · ')}</small>
                  <h3>{tour.title}</h3>
                  <span className="bento-more">
                    Ver passeio e reservar <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="bento-toggle-wrap">
            <motion.button
              type="button"
              className="bento-toggle"
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {showAll
                ? 'Ver menos'
                : `Ver mais ${hiddenCount === 1 ? 'experiência' : 'experiências'} (${hiddenCount})`}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
