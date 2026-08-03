import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  buildBookingMessage,
  buildWhatsappLink,
  findTourBySlug,
} from '../data/tours';
import './TourPage.css';

export default function TourPage() {
  const { slug } = useParams();
  const tour = findTourBySlug(slug);
  const [people, setPeople] = useState(2);

  if (!tour) {
    return <Navigate to="/" replace />;
  }

  const decrement = () => setPeople((p) => Math.max(1, p - 1));
  const increment = () => setPeople((p) => Math.min(50, p + 1));
  const handleInput = (e) => {
    const value = parseInt(e.target.value, 10);
    if (Number.isNaN(value)) {
      setPeople(1);
      return;
    }
    setPeople(Math.max(1, Math.min(50, value)));
  };

  const bookingHref = buildWhatsappLink(buildBookingMessage(tour.title, people));

  return (
    <div className="tour">
      <div className="wrap tour-intro">
        <Link to="/#experiencias" className="tour-back">
          ← Todas as experiências
        </Link>
        <motion.p
          className="tour-kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {tour.tag}
        </motion.p>
        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {tour.title}
        </motion.h1>
        <motion.p
          className="tour-meta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {tour.meta.map((m) => m.label).join('  ·  ')}
        </motion.p>
      </div>

      <motion.div
        className="tour-figure"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <img src={tour.image} alt={tour.title} />
      </motion.div>

      <div className="wrap tour-body">
        <div className="tour-content">
          <section>
            <h2>A experiência</h2>
            {tour.longDescription.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          <section>
            <h2>O que está incluso</h2>
            <ul className="tour-list">
              {tour.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="tour-side">
          <div className="tour-book">
            <p className="tour-book-title">Reserve essa experiência</p>
            <p className="tour-book-text">
              Diga quantas pessoas vão e fale direto com a gente no WhatsApp.
            </p>

            <div className="tour-people">
              <span>Pessoas</span>
              <div className="tour-counter">
                <button
                  type="button"
                  onClick={decrement}
                  aria-label="Diminuir"
                  disabled={people <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={people}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  onClick={increment}
                  aria-label="Aumentar"
                  disabled={people >= 50}
                >
                  +
                </button>
              </div>
            </div>

            <a
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              className="pill tour-book-cta"
            >
              Reservar pelo WhatsApp
            </a>
            <p className="tour-book-note">
              Você será redirecionado com a mensagem pronta.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
