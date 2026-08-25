/* Temas da home. `to` aponta para a página do passeio quando ela já
   existe; sem `to`, o item abre a conversa no WhatsApp — assim nenhum
   item fica sem destino enquanto o conteúdo não é escrito.
   `image` dá foto a um item que ainda não tem página própria. */
export const CATEGORIES = [
  {
    slug: 'roteiros-enoturismo',
    title: 'Roteiros Enoturismo',
    hint: 'Os vales e as denominações de origem da Serra',
    image: '/assets/vale-dos-vinhedos.jpg',
    items: [
      { label: 'Vale dos Vinhedos', to: '/passeio/vale-dos-vinhedos' },
      { label: 'Faria Lemos', image: '/assets/faria-lemos.jpg' },
      { label: 'Pinto Bandeira', image: '/assets/pinto-bandeira.jpg' },
      { label: 'Altos Montes', image: '/assets/altos-montes.jpg' },
      { label: 'Gramado e Canela', to: '/passeio/gramado-e-canela' },
    ],
  },
  {
    slug: 'passeio-com-criancas',
    title: 'Passeio com Crianças',
    hint: 'Roteiros que funcionam para a família inteira',
    image: '/assets/parque-da-ovelha.jpg',
    items: [
      { label: 'Tour Chocolate' },
      { label: 'Tour Kids Parques' },
      { label: 'Parque da Ovelha', to: '/passeio/parque-da-ovelha' },
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
      { label: 'Noite Gaúcha', to: '/passeio/noite-gaucha' },
      { label: 'Noite Suíça', to: '/passeio/noite-suica' },
    ],
  },
  {
    slug: 'melhor-idade',
    title: 'Melhor idade',
    hint: 'Ritmo tranquilo, história e raízes da colônia',
    image: '/assets/galeria/catedral-canela.jpg',
    items: [
      { label: 'Raízes Coloniais' },
      { label: 'História e Cultura' },
      { label: 'Linha Bella' },
    ],
  },
];

export const findCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug);
