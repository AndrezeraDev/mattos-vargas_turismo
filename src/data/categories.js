/* Pastas da home. `to` aponta para a página do passeio quando ela já
   existe; sem `to`, o item abre a conversa no WhatsApp — assim nenhum
   item fica sem destino enquanto o conteúdo não é escrito. */
export const CATEGORIES = [
  {
    slug: 'roteiros-enoturismo',
    title: 'Roteiros Enoturismo',
    hint: 'Os vales e as denominações de origem da Serra',
    image: '/assets/vale-dos-vinhedos.jpg',
    items: [
      { label: 'Vale dos Vinhedos', to: '/passeio/vale-dos-vinhedos' },
      { label: 'Faria Lemos' },
      { label: 'Pinto Bandeira' },
      { label: 'Altos Montes' },
    ],
  },
  {
    slug: 'passeio-com-criancas',
    title: 'Passeio com Crianças',
    hint: 'Roteiros que funcionam para a família inteira',
    image: '/assets/maria-fumaca.jpg',
    items: [
      { label: 'Caminhos de Pedra' },
      { label: 'Maria Fumaça', to: '/passeio/maria-fumaca-vinicolas-privativo' },
    ],
  },
  {
    slug: 'jantares-tematicos',
    title: 'Jantares temáticos',
    hint: 'As noites que contam a colonização da Serra',
    image: '/assets/noite-italiana.jpg',
    items: [
      { label: 'Noite Italiana', to: '/passeio/noite-italiana' },
      { label: 'Noite Alemã', to: '/passeio/noite-alema' },
      { label: 'Noite Gaúcha' },
      { label: 'Noite Suíça' },
    ],
  },
  {
    slug: 'ingressos',
    title: 'Ingressos',
    hint: 'Parques e atrações de Gramado e Canela',
    image: '/assets/gramado-portico.jpg',
    items: [],
  },
];

export const findCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug);
