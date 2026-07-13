import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import HoverTab from "../components/HoverTab";
import { projects, categories } from "../data/projects";

export default function Projects() {
  const [active, setActive] = useState("Tous");

  const filtered =
    active === "Tous"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <div className="relative z-10 bg-ivoire">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-6 pt-[129px] pb-32 md:px-[27px]">
        {/* En-tête : titre + description à droite (référence Moonstone) */}
        <Reveal as="section" className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="text-4xl font-medium tracking-[-0.04em] text-encre md:text-5xl">
            Sélection de projets
          </h1>
          <p className="max-w-[420px] text-sm font-light leading-relaxed text-encre/60">
            Une sélection de projets où l'image et l'idée ne font qu'une :
            identités, campagnes, packagings et directions artistiques,
            pensés du concept à la déclinaison.
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
              {cat}
            </HoverTab>
          ))}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[300px]">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              className={project.tall ? "sm:row-span-2" : ""}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm font-light text-encre/50">
            Aucun projet dans cette catégorie pour le moment.
          </p>
        )}
      </div>

      <NextStepCTA />
    </div>
  );
}
