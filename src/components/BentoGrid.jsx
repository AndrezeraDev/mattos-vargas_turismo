import { motion } from 'framer-motion';
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

export default function BentoGrid() {
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
          {tours.map((tour, i) => (
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
      </div>
    </section>
  );
}
