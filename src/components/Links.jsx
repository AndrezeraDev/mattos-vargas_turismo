import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiGlobe,
  FiMapPin,
  FiBookOpen,
  FiTag,
  FiCompass,
  FiStar,
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import {
  ADDRESS,
  INSTAGRAM_URL,
  MAPS_URL,
  WHATSAPP_NUMBER,
  buildWhatsappLink,
} from '../data/tours';
import './Links.css';

/* `soon: true` = destino ainda não existe; o card fica visível mas inerte */
const links = [
  {
    icon: <FaWhatsapp />,
    label: 'Falar com o Mattos',
    hint: 'Me conte seu período, voo e tamanho da família',
    href: buildWhatsappLink('Olá! Vim pelo site e quero saber mais sobre as experiências na Serra.'),
    external: true,
    featured: true,
  },
  {
    icon: <FiCompass />,
    label: 'Turismo e passeios',
    hint: 'Vale dos Vinhedos, Gramado e Canela, Maria Fumaça',
    soon: true,
  },
  {
    icon: <FiBookOpen />,
    label: 'Sobre vinhos',
    hint: 'Nosso blog sobre os rótulos e vinícolas da região',
    soon: true,
  },
  {
    icon: <FiTag />,
    label: 'Ingressos',
    hint: 'Parques e atrações de Gramado e Canela',
    soon: true,
  },
  {
    icon: <FiStar />,
    label: 'Avaliar no Google',
    hint: 'Conte como foi a sua experiência com a gente',
    soon: true,
  },
  {
    icon: <FaInstagram />,
    label: 'Nosso Instagram',
    hint: 'O dia a dia dos passeios na Serra',
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    icon: <FiGlobe />,
    label: 'Nosso site',
    hint: 'Todas as experiências em um só lugar',
    to: '/',
  },
  {
    icon: <FiMapPin />,
    label: 'Onde estamos',
    hint: ADDRESS,
    href: MAPS_URL,
    external: true,
  },
];

function LinkCard({ icon, label, hint, to, href, external, featured, soon }) {
  const className = `link-btn${featured ? ' featured' : ''}${soon ? ' is-soon' : ''}`;
  const inner = (
    <>
      <span className="link-icon">{icon}</span>
      <span className="link-text">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
      <span className="link-cue" aria-hidden="true">
        {soon ? 'em breve' : '→'}
      </span>
    </>
  );

  if (soon) {
    return (
      <div className={className} aria-disabled="true">
        {inner}
      </div>
    );
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={className}
    >
      {inner}
    </a>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
};

/* Teste: o avatar alterna entre a logo completa e o chapéu a cada 10s */
const AVATARS = [
  { src: '/assets/logo-mattos-vargas.png', alt: 'Logo Mattos & Vargas Turismo' },
  { src: '/assets/logo-hat.png', alt: 'Chapéu Mattos & Vargas Turismo' },
];
const AVATAR_INTERVAL = 10000;

export default function LinksPage() {
  const [avatarIndex, setAvatarIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setAvatarIndex((i) => (i + 1) % AVATARS.length),
      AVATAR_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  const avatar = AVATARS[avatarIndex];

  return (
    <div className="links-page">
      <div className="links-bg" aria-hidden="true" />
      <motion.div
        className="links-card"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="links-avatar" variants={item}>
          <AnimatePresence>
            <motion.img
              key={avatar.src}
              src={avatar.src}
              alt={avatar.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </motion.div>
        <motion.h1 variants={item}>Mattos &amp; Vargas Turismo</motion.h1>
        <motion.p className="links-bio" variants={item}>
          Especialistas em bem receber e em criar experiências autênticas de
          enoturismo na Serra Gaúcha. Só vinícolas e rótulos brasileiros, da
          nossa região — com curadoria, conforto e atenção aos detalhes.
        </motion.p>

        <div className="links-list">
          {links.map((l) => (
            <motion.div key={l.label} variants={item}>
              <LinkCard {...l} />
            </motion.div>
          ))}
        </div>

        <motion.div className="links-social" variants={item}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </motion.div>

        <motion.p className="links-footer" variants={item}>
          Gramado · Canela · Serra Gaúcha
        </motion.p>
      </motion.div>
    </div>
  );
}
