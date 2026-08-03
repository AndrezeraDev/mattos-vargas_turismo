import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../data/tours';
import './WhatsappFloat.css';

export default function WhatsappFloat() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp />
      <span className="pulse" />
    </motion.a>
  );
}
