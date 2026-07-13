import CTAButton from "../components/CTAButton";
import ProjectCard from "../components/ProjectCard";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import RevealRow from "../components/RevealRow";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";
import shotAmine from "../assets/images/hero-portrait.jpg";
import useScrollProgress from "../hooks/useScrollProgress";
import { projects, practices } from "../data/projects";

export default function Homepage() {
  const scroll = useScrollProgress(450);

  return (
    <div className="bg-ivoire">
      {/* HERO — bloc noir */}
      <Reveal as="section" className="bg-encre">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-6 pt-[129px] pb-20 md:flex-row md:items-center md:justify-between md:gap-8 md:px-[27px] md:pb-28">
          <div className="hidden shrink-0 flex-col gap-1 md:flex md:w-[220px]">
            <p className="text-sm font-medium uppercase tracking-[-0.03em] text-ivoire">
              Directeur artistique
            </p>
            <p className="text-sm font-light text-ivoire/60">Nice, France.</p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] shrink-0 md:mx-0 md:max-w-[340px]">
            <div className="aspect-[3/4] w-full overflow-hidden">
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
            <div className="pointer-events-none absolute bottom-6 left-1/2 w-[135%] -translate-x-1/2 md:bottom-10">
              <LogoHorizontal className="h-auto w-full text-ivoire drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]" />
            </div>
          </div>

          <div className="hidden shrink-0 md:flex md:w-[220px] md:justify-end">
            <CTAButton variant="white" href="/contact">
              CONTACT
            </CTAButton>
          </div>

          {/* mobile only : infos empilées sous la photo */}
          <div className="flex flex-col items-center gap-5 text-center md:hidden">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium uppercase tracking-[-0.03em] text-ivoire">
                Directeur artistique
              </p>
              <p className="text-sm font-light text-ivoire/60">Nice, France.</p>
            </div>
            <CTAButton variant="white" href="/contact">
              CONTACT
            </CTAButton>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32 pt-32 pb-32">
        {/* INTRO STATEMENT */}
        <Reveal as="section" className="flex justify-end px-6 md:px-[27px]">
          <p className="max-w-[820px] text-[30px] font-medium leading-snug tracking-[-0.04em] text-encre">
            Je travaille à l'endroit où l'esthétique rejoint l'intention.
            Chaque projet a une matière propre : je la lis, je la cadre, je
            lui donne une forme qui a du sens autant que de l'allure. Pour
            qu'au premier regard, l'image et l'idée ne fassent plus qu'une.
          </p>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* PROJETS SÉLECTIONNÉS */}
        <Reveal as="section" className="flex flex-col gap-6 px-6 md:px-[27px]">
          <h2 className="text-xl font-medium tracking-[-0.03em] text-encre">
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
          <a
            href="/projets"
            className="flex items-center justify-center self-end p-[10px] text-xs font-light uppercase tracking-widest text-encre hover:opacity-70"
          >
            Voir tous les projets
          </a>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* SERVICES */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:px-[27px]">
          <h2 className="text-xl font-medium tracking-[-0.03em] text-encre">
            Services
          </h2>
          <div className="flex flex-col">
            {practices.map((practice, i) => (
              <RevealRow
                key={practice.number}
                title={practice.title}
                number={practice.number}
                paragraph={practice.description}
                theme="light"
                delay={i * 60}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <NextStepCTA />
    </div>
  );
}
