import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NextStepCTA from "../components/NextStepCTA";
import HoverTab from "../components/HoverTab";
import { projects } from "../data/projects";
import { isVideoSrc } from "../utils/media";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [chapter, setChapter] = useState("contexte");
  const { lang, t, path } = useLanguage();

  const chapterLabels = [
    { key: "contexte", label: t("projectDetail.chapters.contexte") },
    { key: "demarche", label: t("projectDetail.chapters.demarche") },
    { key: "reponse", label: t("projectDetail.chapters.reponse") },
  ];

  if (!project) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-ivoire">
        <div className="text-center">
          <p className="text-sm font-light text-encre">{t("projectDetail.notFound")}</p>
          <Link
            to={path("/projets")}
            className="mt-4 inline-block text-xs font-light uppercase tracking-widest text-taupe hover:text-encre"
          >
            {t("projectDetail.backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  const localized = lang === "en" && project.en ? project.en : project;

  return (
    <div className="relative z-10 bg-ivoire">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-[100px] pb-24 md:px-[27px] md:pb-0">
        <div className="flex flex-col gap-12 md:h-[calc(100vh-100px)] md:flex-row md:gap-16 md:overflow-hidden">
          {/* PANNEAU GAUCHE — fixe, ne défile pas */}
          <aside className="md:h-full md:w-[380px] md:shrink-0 md:overflow-hidden">
            <div className="flex flex-col gap-8">
              <Link
                to={path("/projets")}
                aria-label={t("projectDetail.backToProjects")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-encre/15 text-encre transition-colors hover:border-encre"
              >
                <svg
                  className="h-[10px] w-[14px]"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    d="M14 5H1M1 5L5.5 0.5M1 5L5.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </Link>

              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-medium tracking-[-0.04em] text-encre md:text-5xl">
                  {project.title}
                </h1>
                <p className="text-sm font-light leading-relaxed text-encre/60">
                  {localized.intro}
                </p>
              </div>

              {/* Détails */}
              <dl className="flex flex-col gap-2 border-t border-encre/15 pt-8 text-xs font-light">
                <div className="flex justify-between gap-4">
                  <dt className="text-taupe">{t("projectDetail.details.annee")}</dt>
                  <dd className="font-medium text-encre">{project.year}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-taupe">{t("projectDetail.details.secteur")}</dt>
                  <dd className="text-right font-medium text-encre">{localized.sector}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-taupe">{t("projectDetail.details.services")}</dt>
                  <dd className="text-right font-medium text-encre">{localized.services}</dd>
                </div>
                {project.agence && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-taupe">{t("projectDetail.details.collaboration")}</dt>
                    <dd className="text-right font-medium text-encre">{project.agence}</dd>
                  </div>
                )}
                {project.award && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-taupe">{t("projectDetail.details.prix")}</dt>
                    <dd className="text-right font-medium text-encre">{localized.award}</dd>
                  </div>
                )}
              </dl>

              {/* Chapitres : Contexte / Démarche / Réponse */}
              <div className="flex flex-col gap-4 border-t border-encre/15 pt-4">
                <div className="flex flex-wrap gap-1">
                  {chapterLabels.map(({ key, label }, i) => (
                    <HoverTab
                      key={key}
                      active={chapter === key}
                      onClick={() => setChapter(key)}
                      className="text-xs"
                    >
                      {`0${i + 1} ${label}`}
                    </HoverTab>
                  ))}
                </div>
                <p className="min-h-[80px] text-sm font-light leading-relaxed text-encre">
                  {localized.chapters[chapter]}
                </p>
              </div>
            </div>
          </aside>

          {/* GALERIE DROITE — seule zone qui défile en desktop */}
          <div className="flex flex-1 flex-col gap-4 md:h-full md:overflow-y-auto md:overscroll-contain md:pb-16 md:pr-1">
            {project.gallery.length > 0 ? (
              project.gallery.map((row, i) => (
                <div key={i} className="flex gap-4">
                  {row.map((media, j) =>
                    isVideoSrc(media) ? (
                      <div
                        key={j}
                        className="w-full flex-1 overflow-hidden bg-[#a6a6a6]"
                      >
                        <video
                          src={media}
                          controls
                          loop
                          muted
                          playsInline
                          className="h-auto w-full"
                        />
                      </div>
                    ) : (
                      <div
                        key={j}
                        className="w-full flex-1 overflow-hidden bg-[#a6a6a6]"
                      >
                        <img
                          src={media}
                          alt={`${project.title} — ${t("projectDetail.visualAlt")} ${i + 1}.${j + 1}`}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-[4/3] w-full items-center justify-center bg-encre/8 text-xs font-light text-encre/40"
                >
                  {t("projectDetail.comingSoon")}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <NextStepCTA />
    </div>
  );
}
