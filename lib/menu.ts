export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit?: string;
  tags?: string[];
  details?: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

export type MenuExtra = {
  label: string;
  price: number;
};

export type MenuSection = {
  id: string;
  title: string;
  kicker: string;
  intro?: string;
  note?: string;
  items: MenuItem[];
  extras?: MenuExtra[];
};

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

export const foodSections: MenuSection[] = [
  {
    id: "entradas",
    title: "Entradas",
    kicker: "Para começar",
    intro:
      "Petiscos e porções para dividir — ou não. Tudo preparado na casa, do molho à pururuca.",
    items: [
      {
        id: "batata-da-casa",
        name: "Batata da casa",
        description:
          "Batata rústica com alecrim e maionese Charbon. Escolha outra maionese da casa para acompanhar.",
        price: 43.9,
        tags: ["Para compartilhar"],
        details: [
          "Maionese de chipotle + R$ 5,00",
          "Maionese de limão siciliano + R$ 5,00",
          "Maionese de trufas negras + R$ 7,00",
        ],
        image: "/images/foto-01.webp",
        imageAlt: "Batata rústica com alecrim servida com maionese da casa",
        featured: true,
      },
      {
        id: "frango-crocante",
        name: "Frango crocante com trio de molhos",
        description:
          "Frango em tiras empanado, servido com maionese de gorgonzola, maionese de limão e ketchup defumado.",
        price: 39.9,
        tags: ["Para compartilhar"],
      },
      {
        id: "caesar-charbon",
        name: "Caesar Charbon Salad",
        description:
          "Alface romana, molho Caesar da casa, sobrecoxa de frango na Mibrasa, parmesão, mix de cogumelos e croutons de pão de azeite.",
        price: 39.9,
      },
      {
        id: "pururuca",
        name: "Pururuca Charbon",
        description: "Pururuca crocante com lemon pepper.",
        price: 24.9,
        tags: ["Para compartilhar"],
      },
      {
        id: "coxinha-de-frango",
        name: "Coxinha de frango",
        description:
          "Coxinha cremosa de frango com parmesão, servida com maionese de chipotle.",
        price: 39.9,
        unit: "6 unidades",
      },
      {
        id: "bolinho-de-pastrami",
        name: "Bolinho de pastrami",
        description:
          "Bolinho cremoso de pastrami servido com maionese de chipotle.",
        price: 43.9,
        unit: "6 unidades",
        tags: ["Produzido na casa"],
      },
      {
        id: "degustacao-maioneses",
        name: "Degustação de maioneses da casa",
        description:
          "Maionese da casa, gorgonzola, chipotle, limão siciliano, trufas negras e defumada.",
        price: 25,
        unit: "6 unidades",
        tags: ["Para compartilhar"],
      },
    ],
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    kicker: "Das 17h30 às 19h30",
    intro:
      "Open de Gin & Tônica acompanhado de uma rodada de petiscos especiais. Uma pausa necessária no fim do dia.",
    note: "Valor por pessoa. Disponível de terça a sábado, das 17h30 às 19h30.",
    items: [
      {
        id: "open-gin",
        name: "Open de Gin & Tônica + rodada de petiscos",
        description:
          "Batata da casa com alecrim e maionese da casa (meia porção), coxinha de frango (2 unidades) e pururuca Charbon com lemon pepper (meia porção).",
        price: 72.9,
        unit: "por pessoa",
        tags: ["Happy hour"],
        details: [
          "Gin tônica original — gin, limão, alecrim, zimbro e água tônica",
          "Coal — gin, xarope de amora, carvão ativado e água tônica",
          "Ginger — gin, xarope de gengibre, anis estrelado e água tônica",
          "Mandarino — gin, mix ginger com tangerina, zimbro, alecrim e água tônica",
          "Hibisco — gin, redução de hibisco, zimbro, alecrim e água tônica",
        ],
      },
    ],
  },
  {
    id: "sanduiches",
    title: "Sanduíches",
    kicker: "O coração da casa",
    intro:
      "Black Angus, pato, leitão e cogumelos passam pelo carvão e pela Mibrasa. Pães de brioche e de azeite, feitos para durar na memória.",
    note: "Todos os burgers do cardápio podem ser preparados na versão veggie de beterraba com quinoa.",
    items: [
      {
        id: "wagyu",
        name: "Burguer de Wagyu",
        description:
          "Burguer de wagyu 220g, american cheese, cebola na brasa, maionese de cebola caramelizada, mix de ervas e limão siciliano, servido no brioche.",
        price: 74.9,
        tags: ["Do chef"],
        image: "/images/foto-04.webp",
        imageAlt: "Hambúrguer de wagyu com queijo e cebola na brasa",
        featured: true,
      },
      {
        id: "burger-do-chef",
        name: "Burger do chef",
        description:
          "Burguer de pato 200g, creme de queijo de cabra fresco, cogumelos na brasa e patê de fígado de pato, servido no brioche.",
        price: 68.9,
        tags: ["Do chef"],
      },
      {
        id: "original",
        name: "Original",
        description:
          "Burguer de Black Angus 180g com queijo brie, bacon crocante da casa, maionese de trufas e semente de mostarda, servido no brioche.",
        price: 49.9,
        tags: ["Produzido na casa"],
        image: "/images/foto-03.webp",
        imageAlt: "Hambúrguer Original com queijo brie e bacon crocante",
        featured: true,
      },
      {
        id: "cogo",
        name: "Cogó",
        description:
          "Cogumelo grande empanado, recheado com gorgonzola cremoso, cebola roxa na chapa, basilicão e maionese cítrica, servido no brioche.",
        price: 52.9,
        tags: ["Veggie"],
      },
      {
        id: "queijo-quente",
        name: "Queijo quente",
        description:
          "Mix de queijos da casa, cogumelos e trufas negras, servido no pão de azeite.",
        price: 45.9,
        tags: ["Veggie"],
      },
      {
        id: "sanduba-de-leitao",
        name: "Sanduba de leitão",
        description:
          "Leitão produzido no Ecully, maionese de gorgonzola, cebola puxada no balsâmico, manjericão e semente de mostarda, servido no pão de azeite.",
        price: 52.9,
        tags: ["Produzido na casa"],
      },
      {
        id: "carcamano",
        name: "Carcamano",
        description:
          "Burguer de Black Angus 180g com maionese de gorgonzola, linguiça curada, basilicão e maionese defumada, servido no brioche.",
        price: 49.9,
      },
      {
        id: "cheddar-melt",
        name: "Cheddar Melt",
        description:
          "Burguer Black Angus 180g com cheddar melt e cebola no shoyu, servido no pão australiano.",
        price: 49.9,
      },
      {
        id: "classico",
        name: "O Clássico dos clássicos",
        description:
          "Burguer de Black Angus 180g com maionese, alface, tomate e american cheese, servido no brioche.",
        price: 47.9,
      },
      {
        id: "cheese-burger-da-chef",
        name: "Cheese Burger da chef",
        description:
          "Burguer de Black Angus 180g com queijo cheddar inglês, ketchup defumado, mostarda dijon, picles artesanal e maionese da casa, servido no brioche.",
        price: 47.9,
        tags: ["Do chef"],
      },
      {
        id: "pastrami",
        name: "Pastrami",
        description:
          "Sanduíche de pastrami produzido no Ecully, queijo brie e mix de picles da casa, servido no pão de azeite.",
        price: 66.9,
        tags: ["Produzido na casa"],
        image: "/images/foto-01.webp",
        imageAlt: "Sanduíche de pastrami com queijo brie e picles da casa",
        featured: true,
      },
      {
        id: "crostina-au-poivre",
        name: "Crostina au poivre",
        description:
          "Sanduíche com dois smash, queijo cheddar, maionese de pimenta verde e bacon crocante, servido no brioche.",
        price: 44.9,
      },
      {
        id: "crispy",
        name: "Crispy",
        description:
          "Sanduíche de frango crispy empanado, alface, maionese cítrica e american cheese.",
        price: 43.9,
      },
      {
        id: "kids",
        name: "Kids",
        description:
          "Burger 120g com american cheese, servido no brioche. É pra criança, hein?",
        price: 39.9,
        tags: ["Kids"],
      },
    ],
    extras: [
      { label: "Adicional de burger 180g", price: 17 },
      { label: "Adicional de cogumelo empanado", price: 17 },
      { label: "Adicional de alface", price: 4 },
      { label: "Adicional de bacon crocante", price: 8 },
      { label: "Adicional de fatia de queijo", price: 8 },
      { label: "Adicional de maionese", price: 5 },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    kicker: "Para terminar bem",
    items: [
      {
        id: "bolo",
        name: "Bolo",
        description:
          "Bolo quente de chocolate belga 50% com lascas crocantes de bacon da casa, flor de sal e limão siciliano.",
        price: 39.9,
        tags: ["Do chef"],
      },
      {
        id: "cookie-charbon",
        name: "Cookie Charbon",
        description:
          "Cookie da casa com sorvete artesanal de leite e ganache de caramelo salgado.",
        price: 44.9,
        image: "/images/foto-02.webp",
        imageAlt: "Cookie artesanal com sorvete e caramelo salgado",
        featured: true,
      },
      {
        id: "sorvete",
        name: "Sorvete artesanal na casquinha",
        description:
          "Escolha o sabor: chocolate belga, nata, morango ou manga.",
        price: 16.9,
        details: [
          "Chocolate belga — confira a opção zero",
          "Nata",
          "Morango — sem glúten",
          "Manga — sem glúten",
        ],
      },
      {
        id: "panqueca",
        name: "Panqueca de doce de leite argentino",
        description:
          "Panqueca recheada com doce de leite argentino, banhada com crème brûlée com toque de café, finalizada na brasa e com castanhas de caju açucaradas.",
        price: 39.9,
      },
    ],
  },
];

export const drinkSections: MenuSection[] = [
  {
    id: "drinks",
    title: "Drinks",
    kicker: "Do bar",
    intro:
      "Criações próprias e clássicos bem executados. Gelo, fogo e precisão no mesmo copo.",
    items: [
      {
        id: "offender",
        name: "Offender",
        description:
          "Bourbon, defumação de pessegueiro, xarope de camomila, mix cítrico e anis estrelado.",
        price: 44.9,
        tags: ["Autoral"],
        image: "/images/fogo.webp",
        imageAlt: "Drink autoral do Charbon com defumação",
        featured: true,
      },
      {
        id: "negroni-charbon",
        name: "Negroni Charbon",
        description:
          "Gin, campari, vermouth doce, bitter artesanal de cardamomo e carvão ativado.",
        price: 42.9,
        tags: ["Autoral"],
      },
      {
        id: "penicillin-brulee",
        name: "Penicillin Brûlée",
        description:
          "Whiskey, suco de limão siciliano, xarope de mel com especiarias e gengibre.",
        price: 39.9,
        tags: ["Autoral"],
      },
      {
        id: "bloody-mary",
        name: "Bloody Mary",
        description: "Clássico do bar, servido na medida certa.",
        price: 39.9,
      },
      {
        id: "moscow-mule",
        name: "Moscow Mule",
        description: "Vodka, limão, espuma de gengibre e água com gás.",
        price: 39.9,
      },
      {
        id: "negroni",
        name: "Negroni",
        description: "Gin, campari e vermouth doce.",
        price: 42.9,
      },
      {
        id: "fitzgerald",
        name: "Fitzgerald",
        description: "Gin, limão siciliano, açúcar e bitter.",
        price: 42.9,
      },
      {
        id: "aperol-spritz",
        name: "Aperol Spritz",
        description: "Aperol, espumante e água com gás.",
        price: 42.9,
      },
      {
        id: "caipirinha",
        name: "Caipirinha, Caipiroska ou Caipisakê",
        description: "Limão tradicional.",
        price: 39.9,
        details: [
          "Dois limões",
          "Frutas vermelhas",
          "Limão com frutas vermelhas",
        ],
      },
      {
        id: "gin-tonica",
        name: "Gin Tônica",
        description: "Gin, limão, alecrim, zimbro e água tônica.",
        price: 38.9,
      },
      {
        id: "coal",
        name: "Coal",
        description: "Gin, frutas vermelhas, carvão ativado e água tônica.",
        price: 38.9,
      },
      {
        id: "ginger",
        name: "Ginger",
        description: "Gin, xarope de gengibre, anis estrelado e água tônica.",
        price: 38.9,
      },
      {
        id: "hibisco",
        name: "Hibisco",
        description: "Gin, xarope de hibisco e água tônica.",
        price: 38.9,
      },
    ],
  },
  {
    id: "cervejas",
    title: "Cervejas",
    kicker: "Geladas",
    intro: "Long necks, latas e rótulos artesanais para acompanhar o carvão.",
    items: [
      {
        id: "heineken",
        name: "Heineken Long Neck",
        description: "Lager clássica, 330 ml.",
        price: 16.9,
      },
      {
        id: "heineken-zero",
        name: "Heineken Zero",
        description: "Versão sem álcool, 330 ml.",
        price: 16.9,
      },
      {
        id: "stella-sem-gluten",
        name: "Stella Artois Sem Glúten",
        description: "Lager sem glúten, 330 ml.",
        price: 16.9,
        tags: ["Sem glúten"],
      },
      {
        id: "trilha-pilsen",
        name: "Trilha Pilsen não filtrada",
        description: "Cerveja artesanal em lata.",
        price: 24.9,
      },
      {
        id: "trilha-xicaja",
        name: "Trilha Xicajá",
        description: "Witbier com cajá, em lata.",
        price: 29.9,
      },
      {
        id: "trilha-melonrise",
        name: "Trilha Melonrise",
        description: "Juicy IPA em lata.",
        price: 32.9,
      },
      {
        id: "brooklyn-east-ipa",
        name: "Brooklyn East IPA",
        description: "IPA, 355 ml.",
        price: 34.9,
      },
      {
        id: "maniacs-aloha",
        name: "Maniacs Aloha",
        description: "Cerveja artesanal, 355 ml.",
        price: 28.9,
      },
      {
        id: "maniacs-craft-lager",
        name: "Maniacs Craft Lager",
        description: "Lager artesanal, 355 ml.",
        price: 22.9,
      },
      {
        id: "maniacs-ipa",
        name: "Maniacs IPA",
        description: "IPA artesanal, 355 ml.",
        price: 24.9,
      },
    ],
  },
  {
    id: "sem-alcool",
    title: "Sem álcool",
    kicker: "Para todo mundo",
    items: [
      {
        id: "lemonade",
        name: "Lemonade",
        description: "Limão siciliano, água e gelo.",
        price: 16.9,
      },
      {
        id: "sodas-italianas",
        name: "Sodas italianas",
        description: "Escolha o sabor:",
        price: 19.9,
        details: [
          "Yellow — purê de pêssego, limão siciliano e água",
          "Pink — purê de frutas vermelhas, limão siciliano e água",
          "Maçã verde — xarope de maçã verde, limão siciliano e água com gás",
          "Gengibre — xarope de gengibre, limão siciliano e água com gás",
          "Dark — xarope de amora, limão siciliano e água com gás",
        ],
      },
      {
        id: "refrigerantes",
        name: "Refrigerantes",
        description: "Consulte os sabores disponíveis.",
        price: 9.9,
      },
      {
        id: "agua",
        name: "Água",
        description: "Com ou sem gás.",
        price: 8.9,
      },
      {
        id: "suco-de-tomate",
        name: "Suco de tomate",
        description: "Tomate fresco, gelo e temperos da casa.",
        price: 19.9,
      },
      {
        id: "cha-gelado",
        name: "Chá gelado da casa",
        description: "Gengibre, limão ou pêssego.",
        price: 19.9,
      },
      {
        id: "capim-santo",
        name: "Chá de capim santo",
        description: "Com mel e limão.",
        price: 19.9,
      },
      {
        id: "natural-one",
        name: "Sucos Natural One",
        description: "Uva ou laranja, 300 ml.",
        price: 15.9,
      },
    ],
  },
];

export const featuredItems: MenuItem[] = [
  ...foodSections.flatMap((section) => section.items),
  ...drinkSections.flatMap((section) => section.items),
].filter((item) => item.featured);

export const allSections = [...foodSections, ...drinkSections];
