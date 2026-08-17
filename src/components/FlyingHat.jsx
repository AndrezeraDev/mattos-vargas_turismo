import { useAnimationFrame } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './FlyingHat.css';

/* Proporção da arte recortada (560x355) */
const RATIO = 560 / 355;

/* Marcos da viagem, em fração da altura da tela:
   [A0,A1] header -> G  ·  [A1,B0] pousado no G  ·  [B0,B1] G -> M */
const A0 = 0.03;
const A1 = 0.24;
const B0 = 0.44;
const B1 = 0.96;

const smooth = (t) => t * t * (3 - 2 * t);
const mix = (a, b, t) => a + (b - a) * t;

/* Sobre a letra: largura proporcional ao caractere, base encostando no topo
   dele com uma pequena sobreposição, e leve inclinação */
function overLetter(el) {
  const r = el.getBoundingClientRect();
  const w = r.width * 1.9;
  const h = w / RATIO;
  return {
    x: r.left + r.width / 2 - w / 2,
    y: r.top + r.height * 0.1 - h,
    w,
    h,
    rot: -7,
  };
}

/* Em repouso, ocupa exatamente o lugar do chapéu do header */
function overNav(el) {
  const r = el.getBoundingClientRect();
  const h = r.width / RATIO;
  return {
    x: r.left,
    y: r.top + (r.height - h) / 2,
    w: r.width,
    h,
    rot: 0,
  };
}

const blend = (a, b, t) => ({
  x: mix(a.x, b.x, t),
  y: mix(a.y, b.y, t),
  w: mix(a.w, b.w, t),
  h: mix(a.h, b.h, t),
  rot: mix(a.rot, b.rot, t),
});

export default function FlyingHat() {
  const ref = useRef(null);
  const [active] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!active) return;
    /* O chapéu do header dá lugar a este, que pousa exatamente sobre ele */
    const nav = document.getElementById('nav-hat');
    nav?.classList.add('is-flying');
    return () => nav?.classList.remove('is-flying');
  }, [active]);

  useAnimationFrame(() => {
    const el = ref.current;
    if (!el || !active) return;

    const nav = document.getElementById('nav-hat');
    const g = document.getElementById('hat-stop-g');
    const m = document.getElementById('hat-stop-m');
    if (!nav || !g || !m) {
      el.style.opacity = '0';
      return;
    }

    const vh = window.innerHeight;
    const y = window.scrollY;
    const at = overNav(nav);
    const gp = overLetter(g);
    const mp = overLetter(m);

    let p;
    if (y <= A0 * vh) p = at;
    else if (y < A1 * vh) p = blend(at, gp, smooth((y - A0 * vh) / ((A1 - A0) * vh)));
    else if (y <= B0 * vh) p = gp;
    else if (y < B1 * vh) p = blend(gp, mp, smooth((y - B0 * vh) / ((B1 - B0) * vh)));
    else p = mp;

    /* Antes da fonte carregar a letra pode medir zero — não desenha torto */
    if (!(p.w > 4)) {
      el.style.opacity = '0';
      return;
    }

    el.style.opacity = '1';
    el.style.width = `${p.w}px`;
    el.style.height = `${p.h}px`;
    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
  });

  if (!active) return null;

  return (
    <img
      ref={ref}
      className="flying-hat"
      src="/assets/logo-hat-voando.png"
      alt=""
      aria-hidden="true"
    />
  );
}
