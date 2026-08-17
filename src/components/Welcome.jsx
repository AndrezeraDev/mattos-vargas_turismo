import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { INSTAGRAM_URL, buildWhatsappLink } from '../data/tours';
import './Welcome.css';

const WHATSAPP_TEXT =
  'Olá, Mattos! Vim pelo site. Segue o meu período de viagem, horários de voo e o tamanho da família:';

const EASE = [0.2, 0.8, 0.2, 1];

export default function Welcome() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  /* Parallax suave do fundo enquanto a faixa cruza a tela */
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) el.play().catch(() => {});
  };

  return (
    <section className="welcome" ref={ref}>
      <motion.div className="welcome-media" style={{ y: imgY }} aria-hidden="true">
        <img src="/assets/vale-dos-vinhedos.jpg" alt="" loading="lazy" />
      </motion.div>
      <div className="welcome-veil" aria-hidden="true" />

      <div className="wrap-wide welcome-grid">
        {/* Ao entrar na tela o texto desliza da direita para a esquerda... */}
        <motion.div
          className="welcome-copy"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="welcome-kicker">Quem vai te receber</p>
          <h2 className="display welcome-title">
            Sou o Mattos.
            <br />
            <em>Especialista em bem receber</em> há mais de 20 anos.
          </h2>
          <p className="welcome-text">
            Me envie os detalhes da sua viagem — o período, os horários de voo e
            o tamanho da família — que em breve eu te retorno com um roteiro
            pensado para vocês.
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
              <FaInstagram aria-hidden="true" /> Nosso dia a dia
            </a>
          </div>
        </motion.div>

        {/* ...e o vídeo entra logo depois, à direita */}
        <motion.div
          className="welcome-video"
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.95, delay: 0.25, ease: EASE }}
        >
          <video
            ref={videoRef}
            src="/assets/vinhedoexperience.mp4"
            poster="/assets/vinhedoexperience-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <button
            type="button"
            className="welcome-sound"
            onClick={toggleSound}
            aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          >
            {muted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
