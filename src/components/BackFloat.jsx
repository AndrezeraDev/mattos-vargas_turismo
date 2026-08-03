import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BackFloat.css';

const SHOW_AFTER = 220;

export default function BackFloat() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname === '/') return null;

  const goBack = () => {
    const idx = window.history.state?.idx ?? 0;
    if (idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-float"
          onClick={goBack}
          aria-label="Voltar para a página anterior"
          title="Voltar"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
