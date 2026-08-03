# Mattos & Vargas Turismo

Site institucional da **Mattos & Vargas Turismo** — especialistas em Turismo de
Experiências na Serra Gaúcha (Gramado, Canela, Bento Gonçalves e Vale dos
Vinhedos).

## Stack

- [React 19](https://react.dev) + [Vite 7](https://vite.dev)
- [React Router 7](https://reactrouter.com) — rotas `/`, `/passeio/:slug` e `/links`
- [Framer Motion](https://www.framer.com/motion/) — scrollytelling e animações

## Destaques

- Hero cinematográfico com zoom controlado pela rolagem
- Manifesto com revelação de texto palavra a palavra (scrollytelling)
- Vitrine sticky com crossfade das experiências em destaque
- Catálogo em bento grid com página de detalhes e reserva via WhatsApp
- Galeria em trilho horizontal com scroll-snap + prévia do Instagram
- Página `/links` estilo Linktree

## Rodando localmente

```bash
npm install
npm run dev      # desenvolvimento (hot reload)
npm run build    # build de produção em dist/
npm run preview  # serve o build localmente
```

## Configuração

Os dados de contato (WhatsApp, Instagram, e-mail, endereço) ficam centralizados
em [`src/data/tours.js`](src/data/tours.js), junto com o catálogo de
experiências. As imagens vivem em `public/assets/` e podem ser recomprimidas com
`node scripts/optimize-images.mjs`.
