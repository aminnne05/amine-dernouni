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
      {/* ============================================
          HERO — logique ninno.space : le portrait posé petit à gauche,
          le logo dessus, et à droite une colonne de texte étroite, tout
          au même corps. Une ligne de service ferme le bloc en bas.
          ============================================ */}
      <section className="bg-encre">
        <div className="shell flex min-h-svh flex-col pt-[104px] pb-14">
          <div className="colonnes flex-1 items-end gap-y-12 py-10">
            {/* Portrait + logo, calé sur le bas de la colonne de texte */}
            <div className="col-span-9 col-start-1 md:col-span-3">
              <div className="relative w-full max-w-[220px] md:max-w-none">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[var(--rayon-image)]">
                  <img
                    src={shotAmine}
                    alt="Amine Dernouni"
                    className="h-full w-full object-cover object-center will-change-[transform]"
                    style={{
                      transform: `scale(${1 + scroll * 0.05})`,
                      opacity: 1 - scroll * 0.2,
                    }}
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-4 px-3">
                  <LogoHorizontal className="h-auto w-full text-ivoire drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]" />
                </div>
              </div>
            </div>

            {/* Colonne de texte, à droite */}
            <div className="col-span-16 flex flex-col gap-8 md:col-span-7 md:col-start-10">
              <div className="type-lede flex flex-col text-ivoire">
                <p>{t("homepage.role")}</p>
                <p className="text-ivoire/45">{t("homepage.location")}</p>
              </div>

              <p className="type-lede max-w-[34ch] text-ivoire/70">
                {t("homepage.manifesto")}
              </p>

              <a
                href="mailto:dernouniamine02@gmail.com"
                className="type-lede text-ivoire underline decoration-ivoire/30 underline-offset-[6px] transition-colors duration-500 hover:decoration-rouge"
              >
                dernouniamine02@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flex w-full flex-col gap-32 pt-32 pb-32">
        {/* PROJETS SÉLECTIONNÉS */}
        <Reveal as="section" className="shell flex flex-col gap-6">
          <h2 className="type-micro text-taupe">
            {t("homepage.projectsTitle")}{" "}
            <span className="text-rouge">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </h2>
          <div className="grid w-full grid-cols-1 gap-[var(--gouttiere)] sm:grid-cols-2">
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


        {/* SERVICES */}
        <Reveal as="section" className="shell flex flex-col gap-8">
          <h2 className="type-micro text-taupe">
            {t("homepage.servicesTitle")}{" "}
            <span className="text-rouge">
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
            <span className="text-rouge">
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
