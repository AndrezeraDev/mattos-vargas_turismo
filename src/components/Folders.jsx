import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { CATEGORIES } from '../data/categories';
import './Folders.css';

const EASE = [0.2, 0.8, 0.2, 1];

export default function Folders() {
  return (
    <section className="folders" id="experiencias">
      <div className="wrap-wide">
        <motion.div
          className="folders-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="headline">Por onde você quer começar?</h2>
          <p className="subhead">
            Escolha o tipo de experiência e veja os roteiros que ele reúne.
          </p>
        </motion.div>

        <div className="folders-grid">
          {CATEGORIES.map((cat, i) => (
            <motion.article
              key={cat.slug}
              className="folder"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
            >
              <Link to={`/roteiros/${cat.slug}`} className="folder-link">
                <span className="folder-media">
                  <img src={cat.image} alt="" loading="lazy" />
                  <span className="folder-veil" />
                  {cat.items.length > 0 && (
                    <span className="folder-count">
                      {cat.items.length}{' '}
                      {cat.items.length === 1 ? 'roteiro' : 'roteiros'}
                    </span>
                  )}
                </span>
                <span className="folder-title">
                  <strong>{cat.title}</strong>
                  <small>{cat.hint}</small>
                  <span className="folder-cue">
                    Ver os roteiros <FiArrowRight aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
