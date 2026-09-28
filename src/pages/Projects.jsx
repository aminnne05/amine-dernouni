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
      <div className="shell flex flex-col gap-[clamp(4rem,7vw,7rem)] page-top page-bottom">
        {/* Titre du catalogue et introduction */}
        <Reveal as="section" className="colonnes items-end gap-y-8">
          <h1 className="type-title col-span-16 text-encre md:col-span-7">
            {t("projectsPage.title")}
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
