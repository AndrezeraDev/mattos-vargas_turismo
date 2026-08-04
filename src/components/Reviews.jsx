import { motion } from 'framer-motion';
import { GOOGLE_REVIEWS_URL, RATING, RATING_LABEL, reviews } from '../data/reviews';
import './Reviews.css';

function Stars({ count }) {
  return (
    <span className="stars" aria-label={`${count} de 5 estrelas`}>
      {'★★★★★'.slice(0, count)}
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="reviews" id="avaliacoes">
      <div className="wrap-wide">
        <motion.div
          className="reviews-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="headline">Amados por quem viaja.</h2>
          <div className="reviews-score">
            <strong>{RATING.toFixed(1).replace('.', ',')}</strong>
            <div>
              <Stars count={5} />
              <span>{RATING_LABEL}</span>
            </div>
          </div>
        </motion.div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={`${r.name}-${i}`}
              className="review-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Stars count={r.stars} />
              <p>“{r.text}”</p>
              <footer>
                <cite>{r.name}</cite>
                <small>via Google</small>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          className="reviews-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            Ver todas as avaliações no Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
