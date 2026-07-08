import CTAButton from "../components/CTAButton";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import LogoWordmark from "../assets/logo/logo-wordmark.svg?react";
import shotAmine from "../assets/images/SHOT_AMINE.jpg";
import { practices } from "../data/projects";

const experience = [
  { role: "Co-fondateur", place: "Pulpp", dates: "2025 Sep. — Présent" },
  { role: "Directeur Artistique", place: "Freelance", dates: "2025 Sep. — Présent" },
  { role: "Design Manager", place: "Geometric El Djazair", dates: "2025 Jan. — 2025 Aoû." },
  { role: "Designer Graphique", place: "Geometric El Djazair", dates: "2023 Jan. — 2024 Déc." },
  { role: "Stagiaire en Design Graphique", place: "Geometric El Djazair", dates: "2022 Sep. — 2022 Déc." },
];

const collaborations = [
  {
    number: "01",
    who: "Marques",
    text: "Existantes ou en création, packaging, identité, refonte complète.",
  },
  {
    number: "02",
    who: "Agences",
    text: "Renfort sur des projets ponctuels ou collaboration longue durée.",
  },
  {
    number: "03",
    who: "Artistes",
    text: "Musiciens, producteurs, covers, lyric videos, visuels de tournée.",
  },
];

const methodology = [
  {
    number: "01.",
    title: "Compréhension",
    text: "Tout commence par les bonnes questions. Questionnaire, recherches, échanges : je creuse l'intention du projet, son contexte et ce qui le rend singulier, jusqu'à dégager une direction claire avant même d'ouvrir un outil.",
  },
  {
    number: "02.",
    title: "Exploration",
    text: "L'idée prend forme. Moodboards, croquis, premières pistes : je teste, je trie, je cadre. C'est l'étape où la direction se traduit en visuel, où l'on retient ce qui sonne juste et où l'on écarte le reste.",
  },
  {
    number: "03.",
    title: "Distribution",
    text: "Place à la finalisation. Déclinaisons sur tous les supports, mise au propre, préparation des fichiers : je m'assure que l'univers reste cohérent partout où il vit, et qu'il arrive à sa cible dans les meilleures conditions.",
  },
];

export default function About() {
  return (
    <div className="relative z-10 bg-ivoire">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32 pt-[129px] pb-32">
        {/* HERO */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:flex-row md:justify-end md:gap-16 md:px-[27px]">
          <div className="h-[220px] w-[150px] shrink-0 overflow-hidden md:h-[380px] md:w-[240px]">
            <img
              src={shotAmine}
              alt="Amine Dernouni"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex w-full max-w-[600px] flex-col gap-8">
            <div className="flex flex-1 flex-col justify-center gap-4">
              <div className="w-[180px] text-encre">
                <LogoWordmark className="h-auto w-full" />
              </div>
              <p className="max-w-[500px] text-sm font-light leading-relaxed text-encre">
                Directeur artistique formé entre deux cultures, je travaille
                le branding, la direction artistique, le motion et l'UX/UI.
                Mon œil s'est aiguisé en agence, puis en freelance et au sein
                du studio que j'ai co-fondé. Curieux jusqu'à l'obsession, je
                m'attarde sur le détail qui fait qu'une idée sonne juste.
                Rigoureux dans la méthode, libre dans la forme.
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

        {/* EXPÉRIENCE */}
        <Reveal as="section" className="flex flex-col gap-6 px-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
          <h2 className="shrink-0 text-xl font-medium tracking-[-0.03em] text-encre">
            Expérience
          </h2>
          <div className="flex flex-col gap-5">
            {experience.map((job, i) => (
              <div key={i} className="flex flex-col gap-1 border-t border-encre/15 pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-base font-medium text-encre">{job.role}</p>
                  <p className="shrink-0 text-xs font-light text-encre">
                    {job.dates}
                  </p>
                </div>
                <p className="text-xs font-light text-taupe">{job.place}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* AVEC QUI JE COLLABORE */}
        <Reveal as="section" className="flex flex-col gap-6 px-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
          <h2 className="shrink-0 text-xl font-medium leading-snug tracking-[-0.03em] text-encre">
            Avec qui
            <br />
            je collabore
          </h2>
          <div className="flex flex-col gap-4">
            {collaborations.map((c) => (
              <div
                key={c.number}
                className="flex flex-col gap-1 border-t border-encre/15 pt-4 md:flex-row md:items-center md:gap-8"
              >
                <div className="flex items-center gap-4 md:w-[160px] md:shrink-0">
                  <span className="text-xs font-light text-taupe">{c.number}</span>
                  <span className="text-base font-medium text-encre">{c.who}</span>
                </div>
                <p className="text-sm font-light text-gris-texte">{c.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* PRATIQUES (identique à la homepage) */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
          <h2 className="shrink-0 text-xl font-medium tracking-[-0.03em] text-encre">
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
                <h3 className="text-base font-medium tracking-[-0.03em] text-encre">
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

        {/* MÉTHODOLOGIE */}
        <Reveal as="section" className="flex flex-col gap-8 px-6 md:px-[27px]">
          <div className="flex flex-col gap-3 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
            <h2 className="shrink-0 text-xl font-medium tracking-[-0.03em] text-encre">
              Méthodologie
            </h2>
            <p className="text-sm font-light leading-relaxed text-encre">
              Quatre étapes, jamais sautées. Le but est qu'à chaque livraison,
              tu saches exactement où on en est et pourquoi.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {methodology.map((step) => (
              <div
                key={step.number}
                className="flex flex-col gap-2 border-t border-encre/15 pt-4 md:flex-row md:items-start md:gap-12"
              >
                <span className="shrink-0 text-sm font-light text-encre">
                  {step.number}
                </span>
                <span className="shrink-0 text-sm font-medium text-encre md:w-[160px]">
                  {step.title}
                </span>
                <p className="flex-1 text-base font-light leading-relaxed text-gris-texte text-justify">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <NextStepCTA />
    </div>
  );
}
