import { motion } from 'framer-motion';
import './BrimRule.css';

/* Elemento de assinatura do kit: a curva da aba do chapéu virando divisor.
   O kit pede parcimônia — use uma vez por página, não a cada seção. */
export default function BrimRule() {
  return (
    <div className="brim" aria-hidden="true">
      <motion.svg
        viewBox="0 0 600 40"
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-80px' }}
      >
        {[
          { d: 'M0 30 Q300 2 600 30', w: 1.4, o: 0.9, delay: 0 },
          { d: 'M0 38 Q300 12 600 38', w: 1, o: 0.45, delay: 0.12 },
        ].map((line) => (
          <motion.path
            key={line.d}
            d={line.d}
            fill="none"
            strokeWidth={line.w}
            strokeOpacity={line.o}
            variants={{
              hidden: { pathLength: 0 },
              shown: { pathLength: 1 },
            }}
            transition={{
              duration: 1.5,
              delay: line.delay,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
