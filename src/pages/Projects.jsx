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
      <div className="shell flex flex-col gap-20 pt-[120px] pb-32">
        {/* En-tête : titre + description à droite (référence Moonstone) */}
        <Reveal as="section" className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="text-4xl font-medium tracking-[-0.04em] text-encre md:text-5xl">
            {t("projectsPage.title")}
          </h1>
          <p className="max-w-[420px] text-sm font-light leading-relaxed text-encre/60">
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
          <p className="py-16 text-center text-sm font-light text-encre/50">
            {t("projectsPage.empty")}
          </p>
        )}
      </div>

      <NextStepCTA />
    </div>
  );
}
