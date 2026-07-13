import { getAllProjects } from "./mediaLoader";

export const categories = [
  "Tous",
  "Branding",
  "Direction artistique",
  "Packaging",
  "Motion",
  "UX / UI",
];

// Chaque projet (texte + visuels) est chargé automatiquement depuis son
// dossier dans src/assets/images/<slug>/ — voir mediaLoader.js.
export const projects = getAllProjects();

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
