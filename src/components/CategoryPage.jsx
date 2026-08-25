import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { findCategoryBySlug } from '../data/categories';
import {
  buildInterestMessage,
  buildWhatsappLink,
  findTourBySlug,
} from '../data/tours';
import './CategoryPage.css';

const EASE = [0.2, 0.8, 0.2, 1];

/* Item com página própria mostra a foto e o resumo do passeio;
   os que ainda não têm conteúdo viram um cartão de consulta */
function Item({ item, category, index }) {
  const tour = item.to ? findTourBySlug(item.to.replace('/passeio/', '')) : null;

  const body = (
    <>
      {tour ? (
        <span className="cat-item-media">
          <img src={tour.image} alt="" loading="lazy" />
        </span>
      ) : (
        <span className="cat-item-media is-empty" aria-hidden="true" />
      )}
      <span className="cat-item-copy">
        <strong>{item.label}</strong>
        {tour ? (
          <small>{tour.description}</small>
        ) : (
          <small className="cat-item-soon">
            Roteiro sob consulta — fale com o Mattos para montar o seu dia.
          </small>
        )}
        <span className="cat-item-cue">
          {tour ? 'Ver o roteiro' : 'Consultar no WhatsApp'}{' '}
          <span className="arrow">→</span>
        </span>
      </span>
    </>
  );

  const shared = {
    className: `cat-item ${tour ? '' : 'is-soon'}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
    >
      {item.to ? (
        <Link to={item.to} {...shared}>
          {body}
        </Link>
      ) : (
        <a
          href={buildWhatsappLink(
            buildInterestMessage(`${item.label} (${category})`)
          )}
          target="_blank"
          rel="noreferrer"
          {...shared}
        >
          {body}
        </a>
      )}
    </motion.div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams();
  const cat = findCategoryBySlug(slug);

  if (!cat) return <Navigate to="/" replace />;

  return (
    <main className="cat">
      <header className="cat-hero">
        <img src={cat.image} alt="" className="cat-hero-img" />
        <div className="cat-hero-veil" />
        <motion.div
          className="wrap-wide cat-hero-copy"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Link to="/#experiencias" className="cat-back">
            ← Todas as experiências
          </Link>
          <h1 className="display">{cat.title}</h1>
          <p className="cat-hero-hint">{cat.hint}</p>
        </motion.div>
      </header>

      <div className="wrap-wide cat-body">
        {cat.items.length === 0 ? (
          <div className="cat-empty">
            <h2 className="headline">Ingressos para as atrações da Serra.</h2>
            <p>
              Cuidamos dos ingressos dos parques e atrações de Gramado e
              Canela junto com o seu roteiro — sem fila e sem surpresa de
              disponibilidade. Diga o que a família quer conhecer que a gente
              organiza.
            </p>
            <a
              href={buildWhatsappLink(buildInterestMessage(cat.title))}
              target="_blank"
              rel="noreferrer"
              className="pill"
            >
              <FaWhatsapp aria-hidden="true" /> Consultar ingressos
            </a>
          </div>
        ) : (
          <div className="cat-list">
            {cat.items.map((item, i) => (
              <Item
                key={item.label}
                item={item}
                category={cat.title}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
