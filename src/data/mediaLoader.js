// Charge automatiquement chaque projet depuis son dossier dans src/assets/images/.
// Convention dans src/assets/images/<slug>/ :
//   - "content.json"      -> titre, année, catégories, intro, chapitres, etc.
//   - un fichier "cover.*" -> visuel de couverture (grille + carte)
//   - tout autre fichier   -> galerie de la page projet
//       nommer "01.jpg", "02.jpg"... pour un visuel seul par ligne
//       nommer "01-00.jpg", "01-01.jpg", "01-02.jpg"... pour regrouper
//       plusieurs visuels sur la même ligne (numéro avant le tiret = la
//       ligne, numéro après le tiret = l'ordre dans la ligne)
// Pour ajouter un projet : créer le dossier, y déposer ces fichiers. Rien
// d'autre à modifier dans le code.
const mediaModules = import.meta.glob(
  "../assets/images/*/*.{jpg,jpeg,png,gif,webp,mp4,webm,mov}",
  { eager: true, import: "default" }
);
const contentModules = import.meta.glob("../assets/images/*/content.json", {
  eager: true,
  import: "default",
});
// Logos clients : déposer un fichier dans src/assets/images/clients/ et il
// apparaît automatiquement dans "Ils m'ont fait confiance" sur l'accueil.
// Nommer avec un préfixe numérique ("01-pulpp.svg") pour contrôler l'ordre.
const logoModules = import.meta.glob(
  "../assets/images/clients/*.{svg,png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

function parseGalleryFilename(filename) {
  const match = filename.match(/^(\d+)-(\d+)\./);
  if (match) {
    return { row: match[1], index: Number(match[2]) };
  }
  // Pas de motif "ligne-index" : le fichier reste seul sur sa ligne.
  return { row: `_${filename}`, index: 0 };
}

const rawGalleryBySlug = {};
const mediaBySlug = {};

for (const path in mediaModules) {
  const match = path.match(/\.\.\/assets\/images\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, slug, filename] = match;
  if (!mediaBySlug[slug]) mediaBySlug[slug] = { cover: null, gallery: [] };
  if (!rawGalleryBySlug[slug]) rawGalleryBySlug[slug] = [];

  if (/^cover\./i.test(filename)) {
    mediaBySlug[slug].cover = mediaModules[path];
  } else {
    rawGalleryBySlug[slug].push({ filename, src: mediaModules[path] });
  }
}

for (const slug in rawGalleryBySlug) {
  const rows = {};
  for (const { filename, src } of rawGalleryBySlug[slug]) {
    const { row, index } = parseGalleryFilename(filename);
    if (!rows[row]) rows[row] = [];
    rows[row].push({ index, src });
  }

  const rowKeys = Object.keys(rows).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  mediaBySlug[slug].gallery = rowKeys.map((key) =>
    rows[key]
      .sort((a, b) => a.index - b.index)
      .map((item) => item.src)
  );
}

const contentBySlug = {};

for (const path in contentModules) {
  const match = path.match(/\.\.\/assets\/images\/([^/]+)\/content\.json$/);
  if (!match) continue;
  const [, slug] = match;
  contentBySlug[slug] = contentModules[path];
}

const clientLogos = Object.keys(logoModules)
  .map((path) => {
    const filename = path.split("/").pop();
    const label = filename
      .replace(/\.[^.]+$/, "") // enlève l'extension
      .replace(/^\d+[-_]/, "") // enlève un préfixe d'ordre "01-"
      .replace(/[-_]/g, " ")
      .trim(); // la casse du nom de fichier est respectée telle quelle
    return { filename, src: logoModules[path], name: label };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));

export function getProjectMedia(slug) {
  return mediaBySlug[slug] ?? { cover: null, gallery: [] };
}

export function getClientLogos() {
  return clientLogos;
}

export function getAllProjects() {
  return Object.keys(contentBySlug)
    .map((slug) => {
      const media = getProjectMedia(slug);
      return {
        slug,
        ...contentBySlug[slug],
        image: media.cover,
        gallery: media.gallery,
      };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
