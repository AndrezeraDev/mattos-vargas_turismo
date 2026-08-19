import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/tours';
import './InstaPreview.css';

export default function InstaPreview() {
  return (
    <section className="insta">
      <div className="wrap-wide insta-card">
        <motion.div
          className="insta-copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="insta-kicker">
            <FaInstagram aria-hidden="true" /> Instagram
          </p>
          <h2 className="headline">
            Siga o dia a dia
            <br />
            da Serra.
          </h2>
          <p className="insta-text">
            Bastidores dos passeios, dicas da região e as fotos dos nossos
            viajantes. Visite {INSTAGRAM_HANDLE} e surpreenda-se.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="pill sentence insta-follow"
          >
            <span className="insta-follow-full">Seguir {INSTAGRAM_HANDLE}</span>
            <span className="insta-follow-short">Seguir no Instagram</span>
          </a>
        </motion.div>

        <motion.div
          className="insta-frame"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <iframe
            src={`${INSTAGRAM_URL}embed`}
            title={`Prévia do Instagram ${INSTAGRAM_HANDLE}`}
            loading="lazy"
            allowTransparency="true"
            scrolling="no"
          />
        </motion.div>
      </div>
    </section>
  );
}
