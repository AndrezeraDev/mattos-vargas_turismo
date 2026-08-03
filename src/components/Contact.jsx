import { motion } from 'framer-motion';
import {
  EMAIL,
  INSTAGRAM_URL,
  buildWhatsappLink,
} from '../data/tours';
import './Contact.css';

export default function Contact() {
  return (
    <section className="contact" id="contato">
      <div className="wrap contact-inner">
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Vamos planejar
          <br />
          a sua viagem?
        </motion.h2>

        <motion.p
          className="subhead"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Conte suas datas, horários de chegada e retorno e o que despertou
          seu interesse. A gente cuida do resto.
        </motion.p>

        <motion.div
          className="contact-actions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <a
            href={buildWhatsappLink('Olá! Quero planejar minha viagem para a Serra Gaúcha. Minhas datas são...')}
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            Conversar no WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Seguir no Instagram <span className="arrow">→</span>
          </a>
        </motion.div>

        <motion.p
          className="contact-mail"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Prefere e-mail? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </motion.p>
      </div>
    </section>
  );
}
