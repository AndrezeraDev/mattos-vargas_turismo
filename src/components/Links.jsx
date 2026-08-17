import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiGlobe,
  FiInfo,
  FiMapPin,
  FiShoppingBag,
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
import { GOOGLE_REVIEWS_URL } from '../data/reviews';
import './Links.css';

const links = [
  {
    icon: <FaWhatsapp />,
    label: 'Fale conosco no WhatsApp',
    hint: 'Atendimento direto com Sergio e Maria Alice',
    href: buildWhatsappLink('Olá! Vim pelo site e quero saber mais sobre as experiências na Serra.'),
    external: true,
    featured: true,
  },
  {
    icon: <FaInstagram />,
    label: 'Nosso Instagram',
    hint: 'Visite e surpreenda-se',
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    icon: <FiGlobe />,
    label: 'Nosso site',
    hint: 'Conheça todas as experiências',
    to: '/',
  },
  {
    icon: <FiCompass />,
    label: 'Passeios e experiências',
    hint: 'Maria Fumaça, vinícolas, Parque da Ovelha e mais',
    to: '/#servicos',
  },
  {
    icon: <FiShoppingBag />,
    label: 'Rota Boas Compras na Serra',
    hint: 'Couro, malhas e calçados com vantagens exclusivas',
    to: '/passeio/rota-boas-compras',
  },
  {
    icon: <FiStar />,
    label: 'Avaliações no Google',
    hint: 'Veja o que nossos viajantes dizem',
    href: GOOGLE_REVIEWS_URL,
    external: true,
  },
  {
    icon: <FiInfo />,
    label: 'Sobre nós',
    hint: 'Especialistas em bem receber',
    to: '/#sobre',
  },
  {
    icon: <FiMapPin />,
    label: 'Endereço',
    hint: ADDRESS,
    href: MAPS_URL,
    external: true,
  },
];

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
          🍁 Especialistas em Turismo de Experiências na Serra Gaúcha.
          Receptivo, passeios, ingressos, aéreos e hospedagem — indicados
          pelos melhores hotéis, com mais de 10 mil clientes atendidos.
        </motion.p>

        <div className="links-list">
          {links.map((l) =>
            l.to ? (
              <motion.div key={l.label} variants={item}>
                <Link to={l.to} className={`link-btn ${l.featured ? 'featured' : ''}`}>
                  <span className="link-icon">{l.icon}</span>
                  <span className="link-text">
                    <strong>{l.label}</strong>
                    <small>{l.hint}</small>
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div key={l.label} variants={item}>
                <a
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                  className={`link-btn ${l.featured ? 'featured' : ''}`}
                >
                  <span className="link-icon">{l.icon}</span>
                  <span className="link-text">
                    <strong>{l.label}</strong>
                    <small>{l.hint}</small>
                  </span>
                </a>
              </motion.div>
            )
          )}
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
