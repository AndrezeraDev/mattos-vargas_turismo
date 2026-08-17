import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { INSTAGRAM_URL, buildWhatsappLink } from '../data/tours';
import './Welcome.css';

const WHATSAPP_TEXT =
  'Olá, Mattos! Vim pelo site. Segue o meu período de viagem, horários de voo e o tamanho da família:';

export default function Welcome() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  /* Parallax suave do fundo enquanto a faixa cruza a tela */
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className="welcome" ref={ref}>
      <motion.div className="welcome-media" style={{ y: imgY }} aria-hidden="true">
        <img src="/assets/vale-dos-vinhedos.jpg" alt="" loading="lazy" />
      </motion.div>
      <div className="welcome-veil" aria-hidden="true" />

      <motion.div
        className="wrap welcome-copy"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="welcome-kicker">Quem vai te receber</p>
        <h2 className="display welcome-title">
          Sou o Mattos.
          <br />
          <em>Especialista em bem receber</em> há mais de 20 anos.
        </h2>
        <p className="welcome-text">
          Me envie os detalhes da sua viagem — o período, os horários de voo e o
          tamanho da família — que em breve eu te retorno com um roteiro pensado
          para vocês.
        </p>

        <div className="welcome-actions">
          <a
            href={buildWhatsappLink(WHATSAPP_TEXT)}
            target="_blank"
            rel="noreferrer"
            className="pill welcome-cta"
          >
            <FaWhatsapp aria-hidden="true" /> Me chamar no WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="welcome-insta"
          >
            <FaInstagram aria-hidden="true" /> Enquanto isso, veja nosso dia a dia
          </a>
        </div>
      </motion.div>
    </section>
  );
}
