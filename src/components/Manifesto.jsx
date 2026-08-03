import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Manifesto.css';

const TEXT =
  'Você sabia que podemos tornar os seus dias ainda mais felizes? Somos Sergio Mattos e Maria Alice — um Guia de Turismo e uma Turismóloga, especialistas em bem receber. Receptivo, passeios, ingressos, aéreos e hospedagem: tudo pensado para a sua família, do desembarque ao retorno.';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span className="manifesto-word" style={{ opacity }}>
      {children}{' '}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'end 0.42'],
  });

  const words = TEXT.split(' ');

  return (
    <section className="manifesto" ref={ref}>
      <div className="wrap">
        <p className="manifesto-text">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
