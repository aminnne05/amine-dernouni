import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NextStepCTA from "../components/NextStepCTA";
import { projects } from "../data/projects";

const chapterLabels = [
  { key: "contexte", label: "Contexte" },
  { key: "demarche", label: "Démarche" },
  { key: "reponse", label: "Réponse" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [chapter, setChapter] = useState("contexte");

  if (!project) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-ivoire">
        <div className="text-center">
          <p className="text-sm font-light text-encre">Projet introuvable.</p>
          <Link
            to="/projets"
            className="mt-4 inline-block text-xs font-light uppercase tracking-widest text-taupe hover:text-encre"
          >
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-ivoire">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-[100px] pb-24 md:px-[27px]">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* PANNEAU GAUCHE — sticky */}
          <aside className="md:sticky md:top-[100px] md:h-fit md:w-[380px] md:shrink-0">
            <div className="flex flex-col gap-8">
              <Link
                to="/projets"
                aria-label="Retour aux projets"
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
                <h1 className="text-4xl font-bold tracking-[-0.04em] text-encre md:text-5xl">
                  {project.title}
                </h1>
                <p className="text-sm font-light leading-relaxed text-gris-texte">
                  {project.intro}
                </p>
              </div>

              {/* Détails */}
              <dl className="flex flex-col gap-2 border-t border-encre/15 pt-4 text-xs font-light">
                <div className="flex justify-between gap-4">
                  <dt className="text-taupe">Année</dt>
                  <dd className="font-medium text-encre">{project.year}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-taupe">Secteur</dt>
                  <dd className="text-right font-medium text-encre">{project.sector}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-taupe">Services</dt>
                  <dd className="text-right font-medium text-encre">{project.services}</dd>
                </div>
                {project.award && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-taupe">Prix</dt>
                    <dd className="text-right font-medium text-encre">{project.award}</dd>
                  </div>
                )}
              </dl>

              {/* Chapitres : Contexte / Démarche / Réponse */}
              <div className="flex flex-col gap-4 border-t border-encre/15 pt-4">
                <div className="flex gap-2">
                  {chapterLabels.map(({ key, label }, i) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setChapter(key)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-light tracking-wide transition-colors ${
                        chapter === key
                          ? "border-encre bg-encre text-ivoire"
                          : "border-encre/25 text-encre hover:border-encre"
                      }`}
                    >
                      {`0${i + 1} ${label}`}
                    </button>
                  ))}
                </div>
                <p className="min-h-[80px] text-sm font-light leading-relaxed text-encre">
                  {project.chapters[chapter]}
                </p>
              </div>
            </div>
          </aside>

          {/* GALERIE DROITE — défile */}
          <div className="flex flex-1 flex-col gap-4">
            {project.gallery.length > 0 ? (
              project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="w-full overflow-hidden bg-[#a6a6a6]"
                >
                  <img
                    src={img}
                    alt={`${project.title} — visuel ${i + 1}`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-[4/3] w-full items-center justify-center bg-encre/8 text-xs font-light text-encre/40"
                >
                  visuel à venir
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
