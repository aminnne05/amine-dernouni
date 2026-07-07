import CTAButton from "../components/CTAButton";
import ProjectCard from "../components/ProjectCard";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import LogoWordmark from "../assets/logo/logo-wordmark.svg?react";
import shotAmine from "../assets/images/SHOT_AMINE.jpg";
import useScrollProgress from "../hooks/useScrollProgress";
import { projects, practices, collaborators } from "../data/projects";

export default function Homepage() {
  const scroll = useScrollProgress(450);

  return (
    <div className="bg-ivoire">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32 pt-[129px] pb-32">
        {/* HERO */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:flex-row md:justify-end md:gap-16 md:px-[27px]">
          <div className="h-[220px] w-[150px] shrink-0 md:h-[380px] md:w-[240px]">
            <img
              src={shotAmine}
              alt="Amine Dernouni"
              className="h-full w-full object-cover object-center will-change-[filter,transform]"
              style={{
                filter: `blur(${scroll * 14}px)`,
                transform: `scale(${1 + scroll * 0.06})`,
                opacity: 1 - scroll * 0.25,
              }}
            />
          </div>
          <div className="flex w-full max-w-[600px] flex-col gap-8">
            <div className="flex flex-1 flex-col justify-center gap-3">
              <div className="w-[220px] text-encre">
                <LogoWordmark className="h-auto w-full" />
              </div>
              <p className="text-sm font-medium uppercase tracking-[-0.03em] text-encre">
                Directeur artistique
              </p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-sm font-light text-encre">Nice, France.</p>
              <CTAButton variant="black" href="/contact">
                CONTACT
              </CTAButton>
            </div>
          </div>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* INTRO STATEMENT */}
        <Reveal as="section" className="flex justify-end px-6 md:px-[27px]">
          <p className="max-w-[820px] text-[26px] font-bold leading-snug tracking-[-0.04em] text-encre">
            Je travaille à l'endroit où l'esthétique rejoint l'intention.
            Chaque projet a une matière propre : je la lis, je la cadre, je
            lui donne une forme qui a du sens autant que de l'allure. Pour
            qu'au premier regard, l'image et l'idée ne fassent plus qu'une.
          </p>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* PROJETS SÉLECTIONNÉS */}
        <Reveal as="section" className="flex flex-col items-end gap-2 px-6 md:px-[27px]">
          <div className="flex w-full flex-col items-start gap-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
            <h2 className="shrink-0 text-xl font-bold tracking-[-0.03em] text-encre">
              Projets séléctionnés
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[300px]">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  className={project.tall ? "sm:row-span-2" : ""}
                />
              ))}
            </div>
          </div>
          <a
            href="/projets"
            className="flex items-center justify-center p-[10px] text-xs font-light uppercase tracking-widest text-encre hover:opacity-70"
          >
            Voir tous les projets
          </a>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* PRATIQUES */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
          <h2 className="shrink-0 text-xl font-bold tracking-[-0.03em] text-encre">
            Pratiques
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-[21px] md:gap-y-[33px]">
            {practices.map((practice, i) => (
              <Reveal
                key={practice.number}
                className="flex flex-col gap-4"
                delay={(i % 2) * 100}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-light text-encre">
                    {practice.number}
                  </span>
                  <div className="h-px flex-1 bg-encre/20" />
                </div>
                <h3 className="text-base font-bold tracking-[-0.03em] text-encre">
                  {practice.title}
                </h3>
                <p className="text-base font-light leading-relaxed text-gris-texte text-justify">
                  {practice.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* COLLABORATIONS */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
          <h2 className="shrink-0 text-xl font-bold tracking-[-0.03em] text-encre">
            Collaborations
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-encre">
            Je travaille avec des marques qui se lancent, des marques
            installées qui veulent se repositionner, des artistes qui
            cherchent à donner forme à leur direction, et des agences en
            quête du bon équilibre entre intention stratégique et exigence
            visuelle.
          </p>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* COLLABORATEURS */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
          <h2 className="shrink-0 text-xl font-bold tracking-[-0.03em] text-encre">
            Ils m'ont fait confiance
          </h2>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {collaborators.map((name) => (
              <span
                key={name}
                className="text-sm font-medium uppercase tracking-[2px] text-taupe transition-colors hover:text-encre"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <NextStepCTA />
    </div>
  );
}
