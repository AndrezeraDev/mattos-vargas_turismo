import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsappLink } from '../data/tours';
import { findBySlug, formatDate } from '../lib/blogStore';
import './Blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = findBySlug(slug);

  if (!post || !post.published) {
    return (
      <main className="blog">
        <div className="wrap blog-empty">
          <h1 className="headline">Post não encontrado</h1>
          <p>Talvez ele tenha sido removido ou ainda não esteja publicado.</p>
          <Link to="/blog" className="text-link">
            Voltar para o blog <span className="arrow">→</span>
          </Link>
        </div>
      </main>
    );
  }

  /* Texto simples: linhas em branco separam parágrafos */
  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="blog">
      <motion.article
        className="wrap post"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link to="/blog" className="post-back">
          ← Sobre vinhos
        </Link>

        <p className="blog-meta">
          {formatDate(post.date)}
          {post.author ? ` · ${post.author}` : ''}
        </p>
        <h1 className="display post-title">{post.title}</h1>
        {post.excerpt && <p className="post-lead">{post.excerpt}</p>}

        {post.cover && (
          <div className="post-cover">
            <img src={post.cover} alt="" />
          </div>
        )}

        <div className="post-body">
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        {post.images?.length > 0 && (
          <div className="post-gallery">
            {post.images.map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" />
            ))}
          </div>
        )}

        <div className="post-cta">
          <p>Quer conhecer essas vinícolas de perto?</p>
          <a
            href={buildWhatsappLink(
              `Olá, Mattos! Li o post "${post.title}" no site e quero saber mais.`
            )}
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            <FaWhatsapp aria-hidden="true" /> Falar com o Mattos
          </a>
        </div>
      </motion.article>
    </main>
  );
}
