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

// Le contenu des "practices" (titres/descriptions FR + EN) vit dans
// src/i18n/translations.js — voir useLanguage().t("practices").
