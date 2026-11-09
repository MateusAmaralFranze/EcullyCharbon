export const site = {
  name: "Ecully Charbon",
  shortName: "Charbon",
  tagline: "Primitivo no fogo, contemporâneo no sabor.",
  description:
    "Hambúrgueres de Black Angus assados no carvão, no forno Mibrasa, em Perdizes, São Paulo. Cozinha contemporânea dos chefs Juliana Amorim e Guilherme Tse Candido.",
  url: "https://www.charbon.com.br",
  phone: "(11) 3871-1993",
  phoneHref: "tel:+551138711993",
  whatsapp: "551138711993",
  email: "",
  address: {
    street: "Rua Ministro Ferreira Alves, 825",
    district: "Perdizes",
    city: "São Paulo",
    state: "SP",
    postalCode: "05009-060",
    country: "BR",
    full: "Rua Ministro Ferreira Alves, 825 — Perdizes, São Paulo",
  },
  hours: [
    { days: "Terça a sábado", time: "17h às 23h" },
    { days: "Domingo", time: "16h às 23h" },
    { days: "Segunda-feira", time: "Fechado" },
  ],
  socials: {
    instagram: "https://www.instagram.com/ecullycharbon/",
    facebook: "https://www.facebook.com/Ecully-Charbon-101932424488955/",
  },
  ifood:
    "https://www.ifood.com.br/delivery/sao-paulo-sp/ecully-charbon-perdizes/e4e14510-3c5b-4838-80e2-26621e6e959c",
  maps: "https://www.google.com/maps/search/?api=1&query=Rua+Ministro+Ferreira+Alves,+825,+Perdizes,+S%C3%A3o+Paulo",
  mapEmbed:
    "https://www.google.com/maps?q=Rua+Ministro+Ferreira+Alves,+825,+Perdizes,+S%C3%A3o+Paulo+-+SP&output=embed",
  founded: 2013,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const reservationLink = whatsappLink(
  "Olá! Gostaria de reservar uma mesa no Ecully Charbon."
);
