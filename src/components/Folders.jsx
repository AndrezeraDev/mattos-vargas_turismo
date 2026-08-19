import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { CATEGORIES } from '../data/categories';
import { buildInterestMessage, buildWhatsappLink } from '../data/tours';
import './Folders.css';

const EASE = [0.2, 0.8, 0.2, 1];

function ItemLink({ item, category }) {
  const inner = (
    <>
      <span>{item.label}</span>
      <span className="arrow">→</span>
    </>
  );

  if (item.to) {
    return (
      <Link to={item.to} className="folder-item">
        {inner}
      </Link>
    );
  }

  /* Ainda sem página própria: leva direto para a conversa */
  return (
    <a
      href={buildWhatsappLink(buildInterestMessage(`${item.label} (${category})`))}
      target="_blank"
      rel="noreferrer"
      className="folder-item"
    >
      {inner}
    </a>
  );
}

export default function Folders() {
  /* Uma pasta aberta por vez, como um fichário */
  const [open, setOpen] = useState(null);

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
            Abra uma pasta para ver os roteiros que ela guarda.
          </p>
        </motion.div>

        <div className="folders-grid">
          {CATEGORIES.map((cat, i) => {
            const isOpen = open === cat.slug;
            const count = cat.items.length;

            return (
              <motion.article
                key={cat.slug}
                className={`folder ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              >
                <button
                  type="button"
                  className="folder-head"
                  onClick={() => setOpen(isOpen ? null : cat.slug)}
                  aria-expanded={isOpen}
                >
                  <span className="folder-media">
                    <img src={cat.image} alt="" loading="lazy" />
                    <span className="folder-veil" />
                  </span>
                  <span className="folder-title">
                    <strong>{cat.title}</strong>
                    <small>{cat.hint}</small>
                  </span>
                  <span className="folder-cue">
                    {count > 0 && <em>{count}</em>}
                    <FiChevronDown aria-hidden="true" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="folder-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="folder-body-inner">
                        {count === 0 ? (
                          <a
                            href={buildWhatsappLink(
                              buildInterestMessage(cat.title)
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="folder-item"
                          >
                            <span>Consultar ingressos e disponibilidade</span>
                            <span className="arrow">→</span>
                          </a>
                        ) : (
                          cat.items.map((item) => (
                            <ItemLink
                              key={item.label}
                              item={item}
                              category={cat.title}
                            />
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
