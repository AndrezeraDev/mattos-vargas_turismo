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
  `Olá, Sergio e Maria Alice! Estava vendo o site e tenho interesse na experiência "${tour}".`;

export const buildBookingMessage = (tour, people) =>
  `Olá! Quero reservar a experiência "${tour}" para ${people} ${
    people === 1 ? 'pessoa' : 'pessoas'
  }. Podem me passar mais informações?`;

export const tours = [
  {
    slug: 'transfer-receptivo-privado',
    title: 'Transfer Receptivo Privado',
    tag: 'Exclusivo',
    description:
      'Receptivo privativo e exclusivo do aeroporto até a Serra Gaúcha. Nos envie seus horários de chegada e retorno e cuidamos de todo o resto, no seu ritmo.',
    image: '/assets/transfer-privativo.jpg',
    meta: [
      { icon: 'clock', label: 'Horário flexível' },
      { icon: 'users', label: 'Só a sua família' },
    ],
    longDescription: [
      'Chegue à Serra Gaúcha com a tranquilidade de quem é esperado. Nosso transfer receptivo é privativo e exclusivo: o veículo é só para você e sua família, sem esperas e sem dividir o carro com desconhecidos.',
      'Acompanhamos seu voo em tempo real, ajudamos com as malas e já aproveitamos o trajeto para dar as primeiras dicas da Serra. Basta nos enviar seus horários de chegada e retorno — montamos toda a logística da sua estadia.',
    ],
    highlights: [
      'Veículo privativo, exclusivo para o seu grupo',
      'Monitoramento do voo em tempo real',
      'Motorista e guia especialistas em bem receber',
      'Cadeirinha infantil mediante reserva',
      'Apoio completo durante toda a estadia',
    ],
  },
  {
    slug: 'parque-da-ovelha',
    title: 'Parque da Ovelha',
    tag: 'Experiência de fazenda',
    description:
      'Uma manhã encantadora de vida no campo: interaja com as ovelhas e cordeirinhos, conheça o trabalho de tosa e viva a rotina de uma fazenda da Serra.',
    image: '/assets/parque-da-ovelha.jpg',
    meta: [
      { icon: 'clock', label: 'Meio dia' },
      { icon: 'users', label: 'Perfeito com crianças' },
    ],
    longDescription: [
      'O Parque da Ovelha é uma experiência de fazenda que encanta todas as idades: você entra na rotina do campo, alimenta os cordeirinhos, acompanha demonstrações de tosa e descobre como a lã vira fio e peça artesanal.',
      'Um passeio afetivo, educativo e cheio de fotos lindas, no cenário rural da Serra Gaúcha. Ideal para famílias com crianças — e para adultos que querem desacelerar.',
    ],
    highlights: [
      'Interação com ovelhas e cordeirinhos',
      'Demonstração de tosa e trabalho com a lã',
      'Cenário rural incrível para fotos',
      'Experiência guiada e no seu ritmo',
      'Transporte privativo saindo do seu hotel',
    ],
  },
  {
    slug: 'almoco-harmonizado-vinicola',
    title: 'Almoço Harmonizado em Vinícola',
    tag: 'Gastronomia',
    description:
      'Almoço especial dentro de uma vinícola da Serra, com menu harmonizado taça a taça com os rótulos da casa e visita guiada à cave.',
    image: '/assets/vinicola-almoco.jpg',
    meta: [
      { icon: 'clock', label: '4 horas' },
      { icon: 'map', label: 'Vinícola + cave' },
    ],
    longDescription: [
      'Uma experiência gastronômica completa: você visita a vinícola, conhece a cave e o processo de produção e finaliza com um almoço em que cada prato é harmonizado com um vinho ou espumante da casa.',
      'O sommelier conduz a harmonização explicando cada encontro de aromas e sabores. Uma tarde inesquecível entre parreirais — e com traslado privativo, para você brindar sem preocupação.',
    ],
    highlights: [
      'Menu completo harmonizado taça a taça',
      'Visita guiada à cave e à produção',
      'Condução por sommelier da vinícola',
      'Cenário de parreirais para fotos',
      'Transporte privativo ida e volta',
    ],
  },
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
      'Antes ou depois do trem, seguimos em roteiro privativo pelas vinícolas do Vale dos Vinhedos, com degustações escolhidas a dedo para o seu grupo. Sem pressa de excursão: o dia é seu.',
    ],
    highlights: [
      'Passeio completo de Maria Fumaça',
      'Shows folclóricos a bordo',
      'Visitas privativas a vinícolas do Vale',
      'Degustações de vinhos e espumantes',
      'Transporte privativo durante todo o dia',
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
    slug: 'enoturismo-bento-goncalves',
    title: 'Enoturismo em Bento Gonçalves',
    tag: 'Capital do vinho',
    description:
      'Um dia dedicado ao vinho na capital brasileira do enoturismo: vinícolas premiadas, degustações guiadas e os cenários do interior de Bento Gonçalves.',
    image: '/assets/enoturismo-bento.jpg',
    meta: [
      { icon: 'clock', label: 'Dia inteiro' },
      { icon: 'map', label: 'Vinícolas premiadas' },
    ],
    longDescription: [
      'Bento Gonçalves é a capital brasileira do vinho — e a gente conhece cada cantina, das grandes casas premiadas às pequenas produções familiares que não aparecem nos roteiros tradicionais.',
      'O dia inclui degustações guiadas, visita à produção e paradas nos cenários mais bonitos do interior, com almoço típico opcional em cantina colonial. Roteiro montado sob medida para o seu gosto.',
    ],
    highlights: [
      'Visitas a vinícolas premiadas e cantinas familiares',
      'Degustações guiadas de vinhos e espumantes',
      'Roteiro personalizado ao seu gosto',
      'Almoço típico opcional em cantina',
      'Transporte privativo o dia todo',
    ],
  },
  {
    slug: 'vale-dos-vinhedos',
    title: 'Vale dos Vinhedos',
    tag: 'Cenário dos sonhos',
    description:
      'Percorra a região vinícola mais famosa do Brasil: paisagens de parreirais a perder de vista, vinícolas charmosas e degustações memoráveis.',
    image: '/assets/vale-dos-vinhedos.jpg',
    meta: [
      { icon: 'clock', label: '6 horas' },
      { icon: 'map', label: 'Estrada do vinho' },
    ],
    longDescription: [
      'O Vale dos Vinhedos é um dos destinos mais encantadores do Brasil: colinas cobertas de parreirais, capitéis históricos e vinícolas que unem tradição familiar e arquitetura premiada.',
      'Montamos o roteiro conforme a estação — da vindima no verão aos tons dourados do outono — com paradas para degustação, fotos e compras direto do produtor.',
    ],
    highlights: [
      'Paisagens de parreirais a perder de vista',
      'Degustações em vinícolas selecionadas',
      'Roteiro ajustado à estação do ano',
      'Compras direto do produtor',
      'Transporte privativo com guia local',
    ],
  },
  {
    slug: 'rota-boas-compras',
    title: 'Rota Boas Compras na Serra',
    tag: 'Compras inteligentes',
    description:
      'Te ajudamos a encontrar as melhores opções em couro, malhas e calçados de Gramado e Canela. Sabe aquela bota ou jaqueta que você procura? Nós temos!',
    image: '/assets/rota-compras.jpg',
    meta: [
      { icon: 'clock', label: 'Meio dia' },
      { icon: 'map', label: 'Gramado e Canela' },
    ],
    longDescription: [
      'A Serra Gaúcha é referência em couro, malhas e calçados — mas só quem é da região sabe onde estão as melhores fábricas e lojas com preço justo. Nessa rota, levamos você direto aos bons endereços.',
      'Sabe aquela bota de couro ou aquela jaqueta que você procura há tempos? Nós sabemos onde encontrar, com qualidade e vantagens exclusivas para nossos clientes.',
    ],
    highlights: [
      'Couro, malhas, calçados e muito mais',
      'Lojas e fábricas selecionadas em Gramado e Canela',
      'Vantagens exclusivas para nossos clientes',
      'Consultoria de compras durante o passeio',
      'Transporte privativo porta a porta',
    ],
  },
];

export const findTourBySlug = (slug) => tours.find((t) => t.slug === slug);
