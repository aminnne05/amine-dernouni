import { projects } from "./projects";

// Les distinctions sont déduites des projets : il suffit d'ajouter un champ
// "award" (et son équivalent dans le bloc "en") dans le content.json d'un
// projet pour qu'elle apparaisse dans la section Distinctions.
// Format attendu : "Meilleure identité visuelle, DC Ad' Awards"
function split(award) {
  if (!award) return null;
  const parts = award.split(",");
  if (parts.length < 2) return { title: award.trim(), body: "" };
  return {
    title: parts.slice(0, -1).join(",").trim(),
    body: parts[parts.length - 1].trim(),
  };
}

export function getAwards(lang = "fr") {
  return projects
    .filter((p) => p.award)
    .map((p) => {
      const source = lang === "en" && p.en?.award ? p.en.award : p.award;
      const { title, body } = split(source);
      return {
        slug: p.slug,
        project: p.title,
        year: p.year,
        cover: p.image,
        title,
        body,
      };
    })
    .sort((a, b) => Number(b.year) - Number(a.year));
}
