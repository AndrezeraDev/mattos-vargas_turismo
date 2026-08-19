// ⚠️ Substitua pelos contatos reais da Mattos e Vargas Turismo
export const WHATSAPP_NUMBER = '5554999990000';
export const WHATSAPP_DISPLAY = '+55 (54) 99999-0000';
export const INSTAGRAM_URL = 'https://www.instagram.com/mattosevargasturismo/';
export const INSTAGRAM_HANDLE = '@mattosevargasturismo';
export const EMAIL = 'contato@mattosevargasturismo.com.br';
export const ADDRESS = 'Gramado · Serra Gaúcha/RS';
export const MAPS_URL = 'https://maps.google.com/?q=Gramado+RS';

export const buildWhatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const buildInterestMessage = (tour) =>
  `Olá, Mattos! Estava vendo o site e tenho interesse na experiência "${tour}".`;

export const buildBookingMessage = (tour, people) =>
  `Olá! Quero reservar a experiência "${tour}" para ${people} ${
    people === 1 ? 'pessoa' : 'pessoas'
  }. Podem me passar mais informações?`;

export const tours = [
  {
    slug: 'maria-fumaca-vinicolas-privativo',
    title: 'Maria Fumaça & Vinícolas Privativo',
    tag: 'Mais pedido',
    description:
      'O clássico passeio de trem Maria Fumaça pelo Vale dos Vinhedos combinado com visitas privativas a vinícolas, tudo em um roteiro exclusivo para o seu grupo.',
    image: '/assets/maria-fumaca.jpg',
    meta: [
      { icon: 'clock', label: 'Dia inteiro' },
      { icon: 'users', label: 'Roteiro privativo' },
    ],
    longDescription: [
      'Embarque na locomotiva centenária entre Bento Gonçalves, Garibaldi e Carlos Barbosa, com shows folclóricos italianos, gaúchos e alemães animando os vagões, degustação de espumante e suco de uva a bordo.',
      'No atendimento privativo, a família faz um roteiro exclusivo e aproveita tudo no seu tempo e do seu jeito — dá até para conhecer dois roteiros no mesmo dia. É o formato que mais surpreende: a maioria dos nossos clientes conta que valeu investir um pouco mais por uma experiência só sua.',
      'Já no atendimento coletivo, o passeio é em grupo, com roteiro definido e tudo incluso: ingressos, degustações, ingresso do trem e almoço em cantina italiana. Como o roteiro é fixo, há algumas paradas pré-determinadas.',
    ],
    highlights: [
      'Passeio completo de Maria Fumaça, com shows folclóricos a bordo',
      'Privativo: roteiro exclusivo, no seu tempo e do seu jeito',
      'Privativo: possibilidade de dois roteiros no mesmo dia',
      'Coletivo: tudo incluso, com almoço em cantina italiana',
      'Visitas e degustações em vinícolas do Vale',
    ],
  },
  {
    slug: 'noite-alema',
    title: 'Noite Alemã',
    tag: 'Segundas e sextas',
    description:
      'Às segundas e sextas, celebre a herança germânica da Serra: buffet típico alemão, chope artesanal e bandinha ao vivo com danças em trajes típicos.',
    image: '/assets/noite-alema.jpg',
    meta: [
      { icon: 'clock', label: 'Seg e sex à noite' },
      { icon: 'users', label: 'Jantar + show' },
    ],
    longDescription: [
      'Uma noite dedicada à cultura alemã que faz parte do DNA da Serra Gaúcha: buffet com marreco recheado, joelho de porco, chucrute, spätzle e sobremesas típicas como apfelstrudel.',
      'A trilha sonora fica por conta de uma autêntica bandinha alemã, com danças em trajes Lederhosen e Dirndl e o tradicional brinde "Ein Prosit". Saídas às segundas e sextas-feiras, com transporte incluso.',
    ],
    highlights: [
      'Buffet completo de pratos típicos alemães',
      'Chope artesanal e brindes tradicionais',
      'Bandinha alemã ao vivo',
      'Danças em trajes típicos',
      'Transporte de ida e volta do hotel',
    ],
  },
  {
    slug: 'noite-italiana',
    title: 'Noite Italiana',
    tag: 'Sapore italiano',
    description:
      'Jantar farto à moda italiana com massas frescas, galeto, polenta e vinho colonial, embalado por tarantela e canções típicas ao vivo.',
    image: '/assets/noite-italiana.jpg',
    meta: [
      { icon: 'clock', label: '4 horas' },
      { icon: 'users', label: 'Jantar à italiana' },
    ],
    longDescription: [
      'Reviva a tradição da família italiana à mesa farta: rodízio de massas frescas com molhos caseiros, sopa de capeletti, galeto al primo canto, polenta e queijos coloniais.',
      'A noite é embalada por show de tarantela e canções italianas ao vivo, com vinho colonial à vontade e aquele clima de festa de família que só a Serra tem.',
    ],
    highlights: [
      'Rodízio de massas frescas e molhos caseiros',
      'Galeto al primo canto e polenta',
      'Vinho colonial à vontade',
      'Show de tarantela ao vivo',
      'Transporte de ida e volta do hotel',
    ],
  },
  {
    slug: 'vale-dos-vinhedos',
    title: 'Vale dos Vinhedos',
    tag: 'Cenário dos sonhos',
    description:
      'Um cantinho especial da Itália em Bento Gonçalves: Casa Valduga, Alma Única e Cave de Pedra, com histórias, curiosidades e belas fotos pelo caminho.',
    image: '/assets/vale-dos-vinhedos.jpg',
    meta: [
      { icon: 'clock', label: 'Das 8h às 20h' },
      { icon: 'users', label: 'Guia e motorista' },
    ],
    longDescription: [
      'O Vale dos Vinhedos é um cantinho especial da Itália em Bento Gonçalves: colinas cobertas de parreirais, capitéis históricos e vinícolas que unem tradição familiar e arquitetura premiada. São histórias, curiosidades e belas fotos ao longo de todo o percurso.',
      'O roteiro passa pela Casa Valduga — visita de 10h30, com opção de almoço na vinícola e taça de cristal de brinde —, pela Alma Única e pela Cave de Pedra. Você fica com guia e motorista à disposição no período das 8h às 20h, no seu ritmo.',
      'As degustações, ingressos e almoços são cobrados à parte, definidos junto com você conforme o que a família quiser conhecer.',
    ],
    highlights: [
      'Casa Valduga (10h30), com taça de cristal de brinde',
      'Opção de almoço dentro da vinícola',
      'Vinícola Alma Única e Vinícola Cave de Pedra',
      'Guia e motorista à disposição das 8h às 20h',
      'Degustações, ingressos e almoços à parte',
    ],
  },
];

export const findTourBySlug = (slug) => tours.find((t) => t.slug === slug);
