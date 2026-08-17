import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_CHANGED, formatDate, listPublished } from '../lib/blogStore';
import './Blog.css';

const EASE = [0.2, 0.8, 0.2, 1];

export default function Blog() {
  const [posts, setPosts] = useState(() => listPublished());

  /* Mantém a lista em dia quando o admin salva na mesma aba */
  useEffect(() => {
    const sync = () => setPosts(listPublished());
    window.addEventListener(BLOG_CHANGED, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(BLOG_CHANGED, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const [lead, ...rest] = posts;

  return (
    <main className="blog">
      <header className="wrap blog-head">
        <p className="blog-kicker">Sobre vinhos</p>
        <h1 className="display">Histórias que cabem numa taça.</h1>
        <p className="blog-intro">
          Notas sobre os vinhos, as vinícolas e a gente da Serra Gaúcha —
          escritas por quem passa os dias entre os parreirais.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="wrap blog-empty">
          <p>Ainda não há posts publicados. Volte em breve.</p>
        </div>
      ) : (
        <div className="wrap blog-list">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link to={`/blog/${lead.slug}`} className="blog-lead">
              {lead.cover && (
                <div className="blog-lead-media">
                  <img src={lead.cover} alt="" loading="lazy" />
                </div>
              )}
              <div className="blog-lead-copy">
                <p className="blog-meta">
                  {formatDate(lead.date)}
                  {lead.author ? ` · ${lead.author}` : ''}
                </p>
                <h2 className="headline">{lead.title}</h2>
                <p className="blog-excerpt">{lead.excerpt}</p>
                <span className="text-link">
                  Ler a matéria <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                >
                  <Link to={`/blog/${p.slug}`} className="blog-card">
                    {p.cover && (
                      <div className="blog-card-media">
                        <img src={p.cover} alt="" loading="lazy" />
                      </div>
                    )}
                    <p className="blog-meta">{formatDate(p.date)}</p>
                    <h3>{p.title}</h3>
                    <p className="blog-excerpt">{p.excerpt}</p>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
