import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import HoverTab from "../components/HoverTab";
import { projects, categories } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

export default function Projects() {
  const [active, setActive] = useState("Tous");
  const { t } = useLanguage();

  const filtered =
    active === "Tous"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <div className="relative z-10 bg-ivoire">
      <div className="shell flex flex-col gap-12 pt-[104px] pb-32">
        {/* En-tête, même construction que l'accueil : petite étiquette à
            gauche, colonne de texte étroite à droite */}
        <Reveal as="section" className="colonnes items-end gap-y-6 py-10">
          <h1 className="type-micro col-span-16 text-taupe md:col-span-4">
            {t("projectsPage.title")}{" "}
            <span className="text-encre/35">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </h1>
          <p className="type-lede col-span-16 max-w-[34ch] text-encre/60 md:col-span-7 md:col-start-10">
            {t("projectsPage.description")}
          </p>
        </Reveal>

        {/* Filtres */}
        <div className="flex flex-wrap justify-end gap-1">
          {categories.map((cat) => (
            <HoverTab
              key={cat}
              active={active === cat}
              onClick={() => setActive(cat)}
            >
              {t(`categories.${cat}`)}
            </HoverTab>
          ))}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 gap-[var(--gouttiere)] sm:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="type-lede py-16 text-center text-encre/50">
            {t("projectsPage.empty")}
          </p>
        )}
      </div>

      <NextStepCTA />
    </div>
  );
}
