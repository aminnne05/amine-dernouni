import CTAButton from "../components/CTAButton";
import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import RevealRow from "../components/RevealRow";
import aboutPortrait from "../assets/images/about-portrait.jpg";
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
      {/* HERO */}
      <Reveal
        as="section"
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pt-[129px] pb-32 md:flex-row md:items-end md:gap-16 md:px-[27px]"
      >
        <div className="mx-auto aspect-[3/4] w-full max-w-[200px] shrink-0 overflow-hidden md:mx-0 md:max-w-[220px]">
          <img
            src={aboutPortrait}
            alt="Amine Dernouni"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <p className="max-w-[820px] text-[30px] font-medium leading-snug tracking-[-0.04em] text-encre/50">
            <span className="text-encre">Directeur artistique</span> formé
            entre deux cultures, je travaille{" "}
            <span className="text-encre">
              le branding, la direction artistique, le motion et l'UX/UI
            </span>
            . Mon œil s'est aiguisé{" "}
            <span className="text-encre">
              en agence, puis en freelance et au sein du studio que j'ai
              co-fondé
            </span>
            . Curieux jusqu'à l'obsession, je m'attarde sur le détail qui fait
            qu'une idée sonne juste.{" "}
            <span className="text-encre">
              Rigoureux dans la méthode, libre dans la forme.
            </span>
          </p>
          <div className="flex items-end justify-between">
            <p className="text-sm font-light text-encre">Nice, France.</p>
            <CTAButton variant="black" href="/contact">
              CONTACT
            </CTAButton>
          </div>
        </div>
      </Reveal>

      {/* EXPÉRIENCE */}
      <Reveal as="section" className="bg-ivoire">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 border-t border-encre/15 px-6 py-20 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10 md:px-[27px]">
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
        </div>
      </Reveal>

      {/* AVEC QUI JE COLLABORE — bloc noir */}
      <Reveal as="section" className="bg-encre">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-24 md:px-[27px]">
          <h2 className="text-xl font-medium tracking-[-0.03em] text-ivoire">
            Avec qui je collabore
          </h2>
          <div className="flex flex-col">
            {collaborations.map((c, i) => (
              <RevealRow
                key={c.number}
                title={c.who}
                number={c.number}
                paragraph={c.text}
                theme="dark"
                delay={i * 60}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* SERVICES */}
      <Reveal as="section" className="bg-ivoire">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-24 md:px-[27px]">
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
        </div>
      </Reveal>

      {/* MÉTHODOLOGIE — bloc noir, révélation en accordéon */}
      <Reveal as="section" className="bg-encre">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-24 md:px-[27px]">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
            <h2 className="shrink-0 text-xl font-medium tracking-[-0.03em] text-ivoire">
              Méthodologie
            </h2>
            <p className="text-sm font-light leading-relaxed text-ivoire/60">
              Quatre étapes, jamais sautées. Survole chaque étape pour voir le
              détail. Le but est qu'à chaque livraison, tu saches exactement
              où on en est et pourquoi.
            </p>
          </div>
          <div className="flex flex-col">
            {methodology.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 60}
                className="group/step border-t border-ivoire/15 py-6 last:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-light text-ivoire/40">
                    {step.number}
                  </span>
                  <span className="text-xl font-medium tracking-[-0.02em] text-ivoire transition-colors duration-300 md:text-2xl">
                    {step.title}
                  </span>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover/step:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-[600px] pt-3 text-base font-light leading-relaxed text-ivoire/60">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <NextStepCTA />
    </div>
  );
}
