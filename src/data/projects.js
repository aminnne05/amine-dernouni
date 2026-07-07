import abracadabraImg from "../assets/images/abracadabra-doner.jpg";

export const categories = [
  "Tous",
  "Branding",
  "Direction artistique",
  "Packaging",
  "Motion",
  "UX / UI",
];

// Données extraites du Figma. image: null en attendant les visuels.
export const projects = [
  {
    slug: "ashea",
    title: "Ashéa",
    year: "2025",
    tall: false,
    image: null,
    categories: ["Branding", "Direction artistique", "Packaging"],
    sector: "Prêt-à-porter",
    services: "Identité visuelle, direction artistique, packaging",
    intro:
      "Texte d'introduction à venir.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [],
  },
  {
    slug: "vitaya",
    title: "Vitaya",
    year: "2024",
    tall: true,
    image: null,
    categories: ["Branding", "Packaging"],
    sector: "Compléments alimentaires",
    services: "Identité visuelle, packaging",
    intro:
      "Vitaya est une marque de compléments alimentaires centrée sur le bien-être au quotidien. Un accompagnement complet sur l'identité de marque et la direction artistique, du positionnement jusqu'aux visuels et au ton de voix pour les réseaux sociaux.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [],
  },
  {
    slug: "beyn-rebranding",
    title: "Beyn | Rebranding",
    year: "2025",
    tall: false,
    image: null,
    categories: ["Branding"],
    sector: "Fintech",
    services: "Branding, identité visuelle",
    award: "Meilleure identité visuelle, DC Ad' Awards",
    intro: "Texte d'introduction à venir.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [],
  },
  {
    slug: "abracadabra-doner",
    title: "Abracadabra Döner",
    year: "2023",
    tall: true,
    image: abracadabraImg,
    categories: ["Branding", "Packaging"],
    sector: "Fast-food",
    services: "Identité visuelle, packaging",
    intro:
      "Le kebab authentique depuis 2008. Un rafraîchissement de marque pensé pour parler à une nouvelle génération sans renier l'héritage.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [abracadabraImg],
  },
  {
    slug: "kabti-hkayti",
    title: "Kabti Hkayti",
    year: "2024",
    tall: false,
    image: null,
    categories: ["Branding"],
    sector: "Agence de voyage",
    services: "Identité visuelle, réseaux sociaux",
    intro: "Texte d'introduction à venir.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [],
  },
  {
    slug: "syc-maudit",
    title: "SYC | Maudit",
    year: "2026",
    tall: true,
    image: null,
    categories: ["Direction artistique", "Motion"],
    sector: "Musique",
    services: "Direction artistique, motion",
    intro: "Texte d'introduction à venir.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [],
  },
  {
    slug: "simple-profond",
    title: "Simple & profond",
    year: "2024",
    tall: true,
    image: null,
    categories: ["Direction artistique"],
    sector: "Fanzine",
    services: "Direction artistique, print",
    intro:
      "Un fanzine éditorial sur l'œuvre de Hervé Koubi, vue par des enfants de 10-11 ans, racontée par des corps. Six chapitres-gestes, un double regard, un seul objet.",
    chapters: {
      contexte:
        "Comment traduire la vision naïve et spontanée d'enfants face à une œuvre chorégraphique profonde, sans trahir ni l'un ni l'autre ?",
      demarche: "Contenu à venir.",
      reponse:
        "Photos de scène et interventions graphiques enfantines superposées. Palette duotone par chapitre sur fond kraft. Typo condensée brute pour les gestes, serif sobre pour l'analyse. Un système qui parle à l'enfant et à l'adulte en même temps.",
    },
    gallery: [],
  },
  {
    slug: "abra-kebab",
    title: "Abra Kebab",
    year: "2025",
    tall: false,
    image: null,
    categories: ["Branding", "Packaging"],
    sector: "Fast-food",
    services: "Identité visuelle, packaging",
    intro: "Texte d'introduction à venir.",
    chapters: {
      contexte: "Contenu à venir.",
      demarche: "Contenu à venir.",
      reponse: "Contenu à venir.",
    },
    gallery: [],
  },
];

export const practices = [
  {
    number: "01",
    title: "Branding",
    description:
      "Des identités cohérentes et reconnaissables : un système, une grammaire, une voix qui tiennent ensemble bien au-delà du logo.",
  },
  {
    number: "02",
    title: "Direction artistique",
    description:
      "Une direction claire pour un projet ou une marque, du concept à l'image finale, où chaque choix répond à une intention.",
  },
  {
    number: "03",
    title: "Motion design",
    description:
      "Le mouvement comme prolongement de l'identité : du rythme, une respiration, une présence à l'écran.",
  },
  {
    number: "04",
    title: "UX / UI",
    description:
      "Des interfaces nettes et lisibles, où la forme travaille pour l'usage et jamais contre lui.",
  },
];

export const collaborators = [
  "Pulpp",
  "Ashéa",
  "Vitaya",
  "Beyn",
  "Abracadabra Döner",
  "Kabti Hkayti",
  "SYC",
  "Abra Kebab",
];
