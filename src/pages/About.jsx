import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import IndexRow from "../components/IndexRow";
import aboutPortrait from "../assets/images/about-portrait.jpg";
import { useLanguage } from "../i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const practices = t("practices");
  const collaborations = t("collaborations");
  const experience = t("experience");
  const methodology = t("methodology");

  return (
    <div className="relative z-10 bg-ivoire">
      {/* ============================================
          HERO — même construction que l'accueil : portrait posé petit à
          gauche, colonne de texte étroite à droite, tout au même corps.
          ============================================ */}
      <section className="shell flex flex-col pt-[104px] pb-28">
        <div className="colonnes items-end gap-y-12 py-10">
          <div className="col-span-9 col-start-1 md:col-span-3">
            <div className="aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-[var(--rayon-image)] md:max-w-none">
              <img
                src={aboutPortrait}
                alt="Amine Dernouni"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="col-span-16 flex flex-col gap-8 md:col-span-7 md:col-start-10">
            <p className="type-lede max-w-[34ch] text-encre/45">
              {t("about.heroSegments").map((seg, i) => (
                <span key={i} className={seg.bold ? "text-encre" : undefined}>
                  {seg.text}
                </span>
              ))}
            </p>
            <p className="type-lede text-encre/45">{t("about.location")}</p>
            <a
              href="mailto:dernouniamine02@gmail.com"
              className="type-lede text-encre underline decoration-encre/25 underline-offset-[6px] transition-colors duration-500 hover:decoration-encre"
            >
              dernouniamine02@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE */}
      <Reveal as="section" className="bg-ivoire">
        <div className="shell flex flex-col gap-8 py-24">
          <h2 className="type-micro text-taupe">
            {t("about.experienceTitle")}{" "}
            <span className="text-encre/40">
              ({String(experience.length).padStart(2, "0")})
            </span>
          </h2>
          <div className="flex flex-col border-b border-encre/15">
            {experience.map((job, i) => (
              <IndexRow
                key={i}
                number={String(i + 1).padStart(2, "0")}
                title={job.role}
                meta={job.dates}
                description={job.place}
                delay={i * 50}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* AVEC QUI JE COLLABORE — bloc noir */}
      <Reveal as="section" className="bg-encre">
        <div className="shell flex flex-col gap-8 py-24">
          <h2 className="type-micro text-ivoire/45">
            {t("about.collaborateTitle")}{" "}
            <span className="text-ivoire/25">
              ({String(collaborations.length).padStart(2, "0")})
            </span>
          </h2>
          <div className="flex flex-col border-b border-ivoire/15">
            {collaborations.map((c, i) => (
              <IndexRow
                key={c.number}
                number={c.number}
                title={c.who}
                description={c.text}
                theme="dark"
                delay={i * 60}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* SERVICES */}
      <Reveal as="section" className="bg-ivoire">
        <div className="shell flex flex-col gap-8 py-24">
          <h2 className="type-micro text-taupe">
            {t("about.servicesTitle")}{" "}
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
        </div>
      </Reveal>

      {/* MÉTHODOLOGIE — bloc noir */}
      <Reveal as="section" className="bg-encre">
        <div className="shell flex flex-col gap-8 py-24">
          <div className="colonnes gap-y-4">
            <h2 className="type-micro col-span-16 text-ivoire/45 md:col-span-4">
              {t("about.methodologyTitle")}{" "}
              <span className="text-ivoire/25">
                ({String(methodology.length).padStart(2, "0")})
              </span>
            </h2>
            <p className="type-lede col-span-16 max-w-[34ch] text-ivoire/60 md:col-span-7 md:col-start-10">
              {t("about.methodologyIntro")}
            </p>
          </div>
          <div className="flex flex-col border-b border-ivoire/15">
            {methodology.map((step, i) => (
              <IndexRow
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.text}
                theme="dark"
                delay={i * 60}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <NextStepCTA />
    </div>
  );
}
