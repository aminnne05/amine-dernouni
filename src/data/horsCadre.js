// Hors Cadre — travaux personnels : covers, affiches, propositions non retenues.
// Convention dans src/assets/images/hors-cadre/<slug>/ :
//   - "content.json"      -> { "order": 1, "title": "…" }  (le titre suffit)
//   - un fichier "cover.*" -> le visuel affiché dans la galerie
//   - tout autre fichier   -> les visuels de la vue plein écran, dans
//                             l'ordre alphabétique ("01.jpg", "02.mp4"…)
// Pour ajouter une pièce : créer le dossier, y déposer les fichiers.
const mediaModules = import.meta.glob(
  "../assets/images/hors-cadre/*/*.{jpg,jpeg,png,gif,webp,avif,mp4,webm,mov}",
  { eager: true, import: "default" }
);
const contentModules = import.meta.glob(
  "../assets/images/hors-cadre/*/content.json",
  { eager: true, import: "default" }
);

const bySlug = {};

for (const path in mediaModules) {
  const match = path.match(/hors-cadre\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, slug, filename] = match;
  if (!bySlug[slug]) bySlug[slug] = { cover: null, media: [] };
  if (/^cover\./i.test(filename)) {
    bySlug[slug].cover = mediaModules[path];
  } else {
    bySlug[slug].media.push({ filename, src: mediaModules[path] });
  }
}

for (const slug in bySlug) {
  bySlug[slug].media = bySlug[slug].media
    .sort((a, b) =>
      a.filename.localeCompare(b.filename, undefined, { numeric: true })
    )
    .map((item) => item.src);
}

const contentBySlug = {};
for (const path in contentModules) {
  const match = path.match(/hors-cadre\/([^/]+)\/content\.json$/);
  if (!match) continue;
  contentBySlug[match[1]] = contentModules[path];
}

export function getHorsCadre() {
  return Object.keys(contentBySlug)
    .map((slug) => {
      const media = bySlug[slug] ?? { cover: null, media: [] };
      // La couverture ouvre toujours la série, même si elle n'est pas
      // reprise dans les autres fichiers du dossier.
      const suite = media.media.length > 0 ? media.media : [];
      return {
        slug,
        ...contentBySlug[slug],
        cover: media.cover ?? suite[0] ?? null,
        media: media.cover ? [media.cover, ...suite] : suite,
      };
    })
    .filter((piece) => piece.cover)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
