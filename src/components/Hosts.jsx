import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { buildWhatsappLink } from '../data/tours';
import './Hosts.css';

const DIFFERENTIALS = [
  'Atendimento privado e personalizado, respeitando o ritmo de cada visitante',
  'Vinícolas familiares e experiências autênticas, longe dos roteiros convencionais',
  'Tempo para conversar com produtores, conhecer histórias e entender a cultura do vinho',
  'Roteiros cuidadosamente planejados, com conforto, tranquilidade e sem pressa',
  'Curadoria para quem quer degustar grandes rótulos e viver experiências que marcam',
];

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
          <p className="hosts-kicker">Por que com a gente</p>
          <h2 className="headline">
            O enoturismo vai muito
            <br />
            além de visitar vinícolas.
          </h2>
          <p className="hosts-text">
            Para quem é apaixonado por vinho, o turismo de massa não dá conta:
            horários apertados, grupos grandes e experiências padronizadas.
            Aqui, cada roteiro vira um momento exclusivo.
          </p>

          <ul className="hosts-list">
            {DIFFERENTIALS.map((d) => (
              <li key={d}>
                <FiCheck aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <p className="hosts-quote">
            Porque o melhor vinho não é apenas o que está na taça, mas a
            história que você leva para casa.
          </p>

          <a
            href={buildWhatsappLink(
              'Olá! Quero descobrir a Serra Gaúcha de um jeito diferente. Podemos conversar?'
            )}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Descobrir a Serra de um jeito diferente{' '}
            <span className="arrow">→</span>
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
            src="/assets/galeria/espumante.jpg"
            alt="Taça de espumante em vinícola da Serra Gaúcha"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
