import CTAButton from "../components/CTAButton";
import ProjectCard from "../components/ProjectCard";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import RevealRow from "../components/RevealRow";
import LineReveal from "../components/LineReveal";
import heroPortrait from "../assets/images/hero-portrait.jpg";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

export default function Homepage() {
  const { t, path } = useLanguage();
  const practices = t("practices");

  return (
    <div className="bg-ivoire">
      {/* ============================================
          HERO — la déclaration typographique est l'événement
          de la page ; le portrait devient une note en marge.
          ============================================ */}
      <section className="flex min-h-svh flex-col px-6 pt-[110px] pb-8 md:px-[27px] md:pt-[132px] md:pb-10">
        {/* Bandeau utilitaire */}
        <div className="mx-auto w-full max-w-[1440px] shrink-0">
          <div className="flex items-baseline justify-between gap-6 border-b border-encre/12 pb-4">
            <p className="type-label text-encre">{t("homepage.role")}</p>
            <p className="type-label text-taupe">{t("homepage.location")}</p>
          </div>
        </div>

        {/* La déclaration + le portrait, centrés dans l'espace restant */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-center py-12 md:py-16">
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h1 className="type-display text-encre">
              <LineReveal lines={t("homepage.statementLines")} delay={120} />
            </h1>

            <figure className="flex w-[128px] shrink-0 flex-col gap-3 lg:w-[200px]">
              <div className="aspect-[3/4] w-full overflow-hidden bg-ivoire-soft">
                <img
                  src={heroPortrait}
                  alt="Amine Dernouni"
                  width="800"
                  height="1067"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <figcaption className="type-label text-taupe">
                Amine Dernouni
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Pied de hero */}
        <div className="mx-auto flex w-full max-w-[1440px] shrink-0 items-end justify-between gap-6">
          <p className="type-label text-taupe">{t("homepage.scroll")}</p>
          <CTAButton variant="black" href={path("/contact")}>
            {t("homepage.contact")}
          </CTAButton>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32 pt-24 pb-32 md:pt-32">
        {/* INTRO STATEMENT */}
        <Reveal as="section" className="flex justify-end px-6 md:px-[27px]">
          <p className="type-statement max-w-[900px] text-encre">
            {t("homepage.manifesto")}
          </p>
        </Reveal>

        <div className="h-px w-full bg-encre/12" />

        {/* PROJETS SÉLECTIONNÉS */}
        <Reveal as="section" className="flex flex-col gap-6 px-6 md:px-[27px]">
          <h2 className="type-label text-taupe">
            {t("homepage.projectsTitle")}
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
            href={path("/projets")}
            className="type-label flex items-center justify-center self-end p-[10px] text-encre hover:opacity-60"
          >
            {t("homepage.viewAll")}
          </a>
        </Reveal>

        <div className="h-px w-full bg-encre/12" />

        {/* SERVICES */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:px-[27px]">
          <h2 className="type-label text-taupe">{t("homepage.servicesTitle")}</h2>
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
