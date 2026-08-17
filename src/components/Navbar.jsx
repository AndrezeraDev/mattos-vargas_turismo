import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Navbar.css';

const links = [
  { to: '/#experiencias', label: 'Experiências' },
  { to: '/#sobre', label: 'Quem somos' },
  { to: '/#galeria', label: 'Galeria' },
  { to: '/links', label: 'Links' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fora da home não há hero escuro atrás do navbar — fica sempre sólido
  const solid = scrolled || pathname !== '/';

  return (
    <header className={`nav ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <img className="nav-logo" src="/assets/logo-hat.png" alt="" aria-hidden="true" />
          <span className="nav-brand-text">
            Mattos&nbsp;<span>&amp;</span>&nbsp;Vargas
          </span>
        </Link>

        <nav className="nav-menu">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/#contato" className="nav-cta">
          Planejar viagem
        </Link>

        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/#contato" onClick={() => setOpen(false)}>
              Planejar viagem
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
