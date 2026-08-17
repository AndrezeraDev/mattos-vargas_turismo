import { motion } from 'framer-motion';
import { buildWhatsappLink } from '../data/tours';
import './Hosts.css';

export default function Hosts() {
  return (
    <section className="hosts" id="sobre">
      <div className="wrap-wide hosts-card">
        <motion.div
          className="hosts-copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="hosts-kicker">Quem recebe você</p>
          <h2 className="headline">
            Sergio &amp; Maria Alice.
            <br />
            Especialistas em bem receber.
          </h2>
          <p className="hosts-text">
            Um Guia de Turismo e uma Turismóloga que fizeram da Serra Gaúcha a
            própria casa — e da sua visita, um assunto pessoal. São mais de 20
            anos de estrada, hoje indicados pelos melhores hotéis da região.
          </p>
          <p className="hosts-text">
            Trabalhamos só com vinícolas e rótulos brasileiros, da nossa
            região. Envie seu período, os horários de voo e o tamanho da
            família. Se ainda não fechou hospedagem, temos algo incrível para
            te oferecer.
          </p>
          <a
            href={buildWhatsappLink('Olá, Sergio e Maria Alice! Quero começar a planejar minha viagem.')}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Começar a conversa <span className="arrow">→</span>
          </a>
        </motion.div>

        <motion.div
          className="hosts-media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img
            src="/assets/galeria/casa-da-ovelha.jpg"
            alt="Turismo rural na Serra Gaúcha"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
