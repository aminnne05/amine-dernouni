import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import ClientLogoStrip from "../components/ClientLogoStrip";
import Lightbox from "../components/Lightbox";
import NextStepCTA from "../components/NextStepCTA";
import ServicesGrid from "../components/ServicesGrid";
import Reveal from "../components/Reveal";
import LineReveal from "../components/LineReveal";
import MediaReveal from "../components/MediaReveal";
import AwardCard from "../components/AwardCard";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";
import shotAmine from "../assets/images/hero-portrait.jpg";
import useScrollProgress from "../hooks/useScrollProgress";
import { projects } from "../data/projects";
import { getAwards } from "../data/awards";
import { getHorsCadre } from "../data/horsCadre";
import { isVideoSrc } from "../utils/media";
import { useLanguage } from "../i18n/LanguageContext";

export default function Homepage() {
  const scroll = useScrollProgress(450);
  const { lang, t, path } = useLanguage();
  const practices = t("practices");
  const awards = getAwards(lang);
  const horsCadrePieces = getHorsCadre().slice(0, 2);
  const [openPiece, setOpenPiece] = useState(null);

  return (
    <div className="bg-ivoire">
      {/* Introduction resserrée pour laisser les premiers projets entrer
          dans le premier écran, comme sur la référence Antinomy. */}
      <section className="bg-encre">
        <div className="shell flex flex-col pt-[88px] pb-8 md:pb-8">
          <div className="colonnes items-end gap-y-7 py-6 md:gap-y-12 md:py-7">
            {/* Portrait + logo, calé sur le bas de la colonne de texte */}
            <div className="col-span-9 col-start-1 md:col-span-3">
              <div className="relative w-full max-w-[128px] md:max-w-none">
                <MediaReveal className="aspect-[4/5] w-full">
                  <img
                    src={shotAmine}
                    alt="Amine Dernouni"
                    className="h-full w-full object-cover object-center"
                    style={{ opacity: 1 - scroll * 0.2 }}
                  />
                </MediaReveal>
                <div className="pointer-events-none absolute inset-x-0 bottom-4 px-3">
                  <LogoHorizontal className="h-auto w-full text-ivoire drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]" />
                </div>
              </div>
            </div>

            {/* Colonne de texte, à droite */}
            <div className="col-span-16 flex flex-col gap-5 md:col-span-7 md:col-start-10 md:gap-8">
              <div className="type-lede flex flex-col text-ivoire">
                <LineReveal lines={[t("homepage.role")]} delay={120} />
                <span className="text-ivoire/45">
                  <LineReveal lines={[t("homepage.location")]} delay={210} />
                </span>
              </div>

              <Reveal delay={320} as="p" className="type-lede max-w-[34ch] text-ivoire/70">
                {t("homepage.manifesto")}
              </Reveal>

              <Reveal delay={440}>
                <a
                  href="mailto:dernouniamine02@gmail.com"
                  className="type-lede text-ivoire underline decoration-ivoire/30 underline-offset-[6px] transition-colors duration-500 hover:decoration-rouge"
                >
                  dernouniamine02@gmail.com
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="flex w-full flex-col gap-[clamp(7rem,11vw,11rem)] pt-[clamp(5rem,7vw,7rem)] pb-[clamp(7rem,10vw,10rem)]">
        {/* PROJETS SÉLECTIONNÉS */}
        <Reveal as="section" className="shell flex flex-col gap-8 md:gap-12">
          <h2 className="type-title text-encre">
            {t("homepage.projectsTitle")}{" "}
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
          <Link
            to={path("/projets")}
            className="morph-button morph-button--grey type-micro self-end px-5 py-3"
          >
            {t("homepage.viewAll")}
          </Link>
        </Reveal>

        {/* HORS CADRE — une galerie distincte de la sélection client */}
        {horsCadrePieces.length > 0 && (
          <Reveal as="section" className="shell colonnes items-start gap-y-10">
            <div className="col-span-16 flex flex-col items-start gap-5 md:col-span-4">
              <h2 className="type-title text-encre">{t("horsCadre.title")}</h2>
              <p className="type-body max-w-[25ch] text-encre/65">{t("horsCadre.lede")}</p>
              <Link
                to={path("/hors-cadre")}
                className="morph-button morph-button--grey type-micro px-5 py-3"
              >
                {t("horsCadre.viewAll")} <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="col-span-16 grid grid-cols-2 items-start gap-[var(--gouttiere)] md:col-span-11 md:col-start-6">
              {horsCadrePieces.map((piece, index) => (
                <button
                  key={piece.slug}
                  type="button"
                  onClick={() => setOpenPiece(piece)}
                  className={`group min-w-0 text-left ${index === 1 ? "md:mt-12" : ""}`}
                  aria-label={`Ouvrir ${piece.title}`}
                >
                  <MediaReveal
                    glisse={index === 1}
                    className="aspect-square w-full overflow-hidden"
                  >
                    {isVideoSrc(piece.cover) ? (
                      <video
                        src={piece.cover}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    ) : (
                      <img
                        src={piece.cover}
                        alt={piece.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    )}
                  </MediaReveal>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="type-caption min-w-0 flex-1 text-encre">{piece.title}</span>
                    <span className="text-encre/45 transition-transform duration-500 ease-out group-hover:translate-x-1" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </Reveal>
        )}


        {/* SERVICES */}
        <ServicesGrid
          title={t("homepage.servicesTitle")}
          intro={t("servicesIntro")}
          items={practices}
        />

        <ClientLogoStrip title={t("homepage.clientsTitle")} />

        {/* DISTINCTIONS */}
        <Reveal as="section" className="shell flex flex-col gap-8 md:gap-12">
          <h2 className="type-title text-encre">{t("homepage.awardsTitle")}</h2>
          {awards.length > 0 ? (
            <div className="flex flex-col border-b border-encre/20">
              {awards.map((award, i) => (
                <AwardCard
                  key={`${award.slug}-${award.title}`}
                  year={award.year}
                  title={award.title}
                  body={award.body}
                  project={award.project}
                  to={path(`/projets/${award.slug}`)}
                  delay={i * 90}
                />
              ))}
            </div>
          ) : (
            <p className="type-caption text-taupe">{t("homepage.awardsEmpty")}</p>
          )}
        </Reveal>
      </div>

      {openPiece && <Lightbox piece={openPiece} onClose={() => setOpenPiece(null)} />}
      <NextStepCTA />
    </div>
  );
}
