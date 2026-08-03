import { motion } from 'framer-motion';
import './Stats.css';

const stats = [
  { value: '+10 mil', label: 'clientes atendidos na Serra' },
  { value: '1º', label: 'em indicação dos melhores hotéis' },
  { value: '100%', label: 'dos roteiros feitos sob medida' },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats-row">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
