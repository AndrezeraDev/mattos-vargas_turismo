import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../data/tours';
import './WhatsappFloat.css';

/* Sacudida curta que se repete a cada 6s (0,7s de gesto + 5,3s de pausa) */
const SHAKE = [0, -11, 9, -7, 5, -2, 0];
const SHAKE_DURATION = 0.7;
const SHAKE_GAP = 5.3;

export default function WhatsappFloat() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  /* Parado sob o cursor: botão que treme na hora do clique erra o alvo */
  const still = reduced || hovered;

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: still ? 0 : SHAKE }}
      transition={{
        scale: { delay: 1.2, duration: 0.5, type: 'spring' },
        opacity: { delay: 1.2, duration: 0.5 },
        rotate: still
          ? { duration: 0.25 }
          : {
              delay: 2.4,
              duration: SHAKE_DURATION,
              repeat: Infinity,
              repeatDelay: SHAKE_GAP,
              ease: 'easeInOut',
            },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp />
      <span className="pulse" />
    </motion.a>
  );
}
