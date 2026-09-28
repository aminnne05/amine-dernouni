import { useParams, Link } from "react-router-dom";
import NextStepCTA from "../components/NextStepCTA";
import MediaReveal from "../components/MediaReveal";
import LineReveal from "../components/LineReveal";
import Reveal from "../components/Reveal";
import ChapterNav from "../components/ChapterNav";
import { projects } from "../data/projects";
import { isVideoSrc } from "../utils/media";
import { useLanguage } from "../i18n/LanguageContext";

function Media({ media, alt, delay = 0, className = "" }) {
  return (
    <MediaReveal delay={delay} className={`aspect-[4/3] w-full bg-ivoire-soft ${className}`}>
      {isVideoSrc(media) ? (
        <video
          src={media}
          autoPlay
          controls
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-contain"
        />
      ) : (
        <img
          src={media}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      )}
    </MediaReveal>
  );
}

/* Every case-study image occupies one 4:3 frame; source art stays uncropped. */
function GalleryGrid({ rows, title }) {
  const items = rows.flat();
  return (
    <div className="grid grid-cols-1 gap-[var(--gouttiere)] md:grid-cols-2">
      {items.map((media, j) => (
        <Media
          key={`${media}-${j}`}
          media={media}
          alt={`${title} — ${j + 1}`}
          delay={(j % 2) * 90}
          className={items.length % 2 === 1 && j === items.length - 1 ? "gallery-single" : ""}
        />
      ))}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { lang, t, path } = useLanguage();

  if (!project) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-ivoire">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="type-lede text-encre">{t("projectDetail.notFound")}</p>
          <Link
            to={path("/projets")}
            className="type-micro morph-button border border-encre/25 px-4 py-2.5 text-encre hover:border-encre"
          >
            {t("projectDetail.backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  const localized = lang === "en" && project.en ? project.en : project;

  const chapters = ["contexte", "demarche", "reponse"]
    .filter((key) => localized.chapters?.[key])
    .map((key, i) => ({
      key,
      number: `0${i + 1}`,
      label: t(`projectDetail.chapters.${key}`),
      text: localized.chapters[key],
    }));

  const details = [
    { label: t("projectDetail.details.annee"), value: project.year },
    { label: t("projectDetail.details.secteur"), value: localized.sector },
    { label: t("projectDetail.details.services"), value: localized.services },
    project.agence && {
      label: t("projectDetail.details.collaboration"),
      value: project.agence,
    },
    project.award && {
      label: t("projectDetail.details.prix"),
      value: localized.award,
    },
  ].filter(Boolean);

  // Les visuels se répartissent entre les chapitres : chaque chapitre
  // ouvre une série, comme Define / Create / Commit chez Ragged Edge.
  const rows = project.gallery ?? [];
  const ouverture = rows.slice(0, 1);
  const reste = rows.slice(1);
  const parChapitre = Math.max(1, Math.ceil(reste.length / (chapters.length || 1)));
  const groupes = chapters.map((_, i) =>
    reste.slice(i * parChapitre, (i + 1) * parChapitre)
  );
  const surplus = reste.slice(chapters.length * parChapitre);

  return (
    <div className="relative z-10 bg-ivoire">
      <div className="shell page-top page-bottom">
        {/* Project name, introduction, then concise credits. */}
        <section className="colonnes items-start gap-y-8 pb-[clamp(5rem,8vw,8rem)]">
          <div className="col-span-16 flex items-center gap-4">
            <Link
              to={path("/projets")}
              aria-label={t("projectDetail.backToProjects")}
              className="morph-button flex h-10 w-10 shrink-0 items-center justify-center border border-encre/20 text-encre hover:border-encre"
            >
              <svg className="h-[9px] w-[13px]" viewBox="0 0 14 10" fill="none">
                <path
                  d="M14 5H1M1 5L5.5 0.5M1 5L5.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </Link>
            <span className="type-micro text-encre/55">{t("projectDetail.backToProjects")}</span>
          </div>

          <h1 className="type-display col-span-16 max-w-[15ch] text-encre">
            <LineReveal lines={[project.title]} />
          </h1>

          <p className="type-lede col-span-16 max-w-[38ch] text-encre/75 md:col-span-9">
            {localized.intro}
          </p>

          <Reveal
            as="dl"
            delay={200}
            className="type-caption col-span-16 flex flex-col gap-2 md:col-span-6 md:col-start-11"
          >
            {details.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between gap-6 border-t border-encre/15 pt-2"
              >
                <dt className="text-taupe">{label}</dt>
                <dd className="text-right text-encre">{value}</dd>
              </div>
            ))}
          </Reveal>
        </section>

        {ouverture.length > 0 && (
          <div className="pb-[clamp(6rem,10vw,10rem)]">
            <GalleryGrid rows={ouverture} title={project.title} />
          </div>
        )}

        {/* CHAPITRES — chacun ouvre une série de visuels */}
        {chapters.map((chapter, i) => (
          <section key={chapter.key} id={chapter.key} className="scroll-mt-24">
            <Reveal className="colonnes gap-y-6 border-t border-encre/20 pt-[clamp(2rem,4vw,4rem)] pb-[clamp(3rem,5vw,5rem)]">
              <h2 className="type-title col-span-16 text-encre md:col-span-5">
                {chapter.label}
              </h2>
              <p className="type-body col-span-16 max-w-[55ch] text-encre/80 md:col-span-9 md:col-start-8 md:pt-1">
                {chapter.text}
              </p>
            </Reveal>

            <div className="pb-[clamp(6rem,10vw,10rem)]">
              <GalleryGrid rows={groupes[i] ?? []} title={project.title} />
            </div>
          </section>
        ))}

        {/* Visuels restants */}
        {surplus.length > 0 && (
          <GalleryGrid rows={surplus} title={project.title} />
        )}

        {rows.length === 0 && (
          <div className="flex flex-col gap-[var(--gouttiere)]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="type-micro flex aspect-[16/9] w-full items-center justify-center bg-encre/8 text-encre/40"
              >
                {t("projectDetail.comingSoon")}
              </div>
            ))}
          </div>
        )}
      </div>

      <ChapterNav chapters={chapters} />
      <NextStepCTA />
    </div>
  );
}
