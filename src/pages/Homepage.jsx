import CTAButton from "../components/CTAButton";
import ProjectCard from "../components/ProjectCard";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import IndexRow from "../components/IndexRow";
import AwardCard from "../components/AwardCard";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";
import shotAmine from "../assets/images/hero-portrait.jpg";
import useScrollProgress from "../hooks/useScrollProgress";
import { projects } from "../data/projects";
import { getAwards } from "../data/awards";
import { useLanguage } from "../i18n/LanguageContext";

export default function Homepage() {
  const scroll = useScrollProgress(450);
  const { lang, t, path } = useLanguage();
  const practices = t("practices");
  const awards = getAwards(lang);

  return (
    <div className="bg-ivoire">
      {/* HERO — bloc noir */}
      <Reveal as="section" className="bg-encre">
        <div className="shell flex flex-col items-center gap-14 pt-[120px] pb-20 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-28">
          <div className="hidden shrink-0 flex-col gap-1 md:flex md:w-[220px]">
            <p className="text-sm font-medium uppercase tracking-[-0.03em] text-ivoire">
              {t("homepage.role")}
            </p>
            <p className="text-sm font-light text-ivoire/60">{t("homepage.location")}</p>
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
            <CTAButton variant="white" href={path("/contact")}>
              {t("homepage.contact")}
            </CTAButton>
          </div>

          {/* mobile only : infos empilées sous la photo */}
          <div className="flex flex-col items-center gap-5 text-center md:hidden">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium uppercase tracking-[-0.03em] text-ivoire">
                {t("homepage.role")}
              </p>
              <p className="text-sm font-light text-ivoire/60">{t("homepage.location")}</p>
            </div>
            <CTAButton variant="white" href={path("/contact")}>
              {t("homepage.contact")}
            </CTAButton>
          </div>
        </div>
      </Reveal>

      <div className="flex w-full flex-col gap-32 pt-32 pb-32">
        {/* INTRO STATEMENT */}
        <Reveal as="section" className="shell flex justify-end">
          <p className="max-w-[820px] text-[30px] font-medium leading-snug tracking-[-0.04em] text-encre">
            {t("homepage.manifesto")}
          </p>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* PROJETS SÉLECTIONNÉS */}
        <Reveal as="section" className="shell flex flex-col gap-6">
          <h2 className="type-micro text-taupe">
            {t("homepage.projectsTitle")}{" "}
            <span className="text-encre/40">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </h2>
          <div className="grid w-full grid-cols-1 gap-x-[var(--gouttiere)] gap-y-12 sm:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
              />
            ))}
          </div>
          <a
            href={path("/projets")}
            className="type-micro flex items-center justify-center self-end p-[10px] text-encre hover:opacity-60"
          >
            {t("homepage.viewAll")}
          </a>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* SERVICES */}
        <Reveal as="section" className="shell flex flex-col gap-8">
          <h2 className="type-micro text-taupe">
            {t("homepage.servicesTitle")}{" "}
            <span className="text-encre/40">
              ({String(practices.length).padStart(2, "0")})
            </span>
          </h2>
          <div className="flex flex-col border-b border-encre/15">
            {practices.map((practice, i) => (
              <IndexRow
                key={practice.number}
                number={practice.number}
                title={practice.title}
                description={practice.description}
                delay={i * 60}
              />
            ))}
          </div>
        </Reveal>

        {/* DISTINCTIONS */}
        <Reveal as="section" className="shell flex flex-col gap-8">
          <h2 className="type-micro text-taupe">
            {t("homepage.awardsTitle")}{" "}
            <span className="text-encre/40">
              ({String(awards.length).padStart(2, "0")})
            </span>
          </h2>
          {awards.length > 0 ? (
            <div className="colonnes gap-y-14">
              {awards.map((award, i) => (
                <AwardCard
                  key={`${award.slug}-${award.title}`}
                  year={award.year}
                  title={award.title}
                  body={award.body}
                  project={award.project}
                  to={path(`/projets/${award.slug}`)}
                  delay={i * 90}
                  className={i % 2 === 1 ? "md:col-start-10" : ""}
                />
              ))}
            </div>
          ) : (
            <p className="type-caption text-taupe">{t("homepage.awardsEmpty")}</p>
          )}
        </Reveal>
      </div>

      <NextStepCTA />
    </div>
  );
}
