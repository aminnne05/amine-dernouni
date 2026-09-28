import NextStepCTA from "../components/NextStepCTA";
import Reveal from "../components/Reveal";
import MediaReveal from "../components/MediaReveal";
import IndexRow from "../components/IndexRow";
import ServicesGrid from "../components/ServicesGrid";
import HorizontalCollaboration from "../components/HorizontalCollaboration";
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
      {/* Portrait and concise positioning. */}
      <section className="shell flex flex-col page-top page-bottom">
        <div className="colonnes items-end gap-y-12 py-6 md:py-8">
          <div className="col-span-9 col-start-1 md:col-span-3">
            <MediaReveal className="aspect-[4/5] w-full max-w-[220px] md:max-w-none">
              <img
                src={aboutPortrait}
                alt="Amine Dernouni"
                className="h-full w-full object-cover object-center"
              />
            </MediaReveal>
          </div>

          <div className="col-span-16 flex flex-col gap-6 md:col-span-7 md:col-start-10">
            <h1 className="type-title max-w-[22ch] text-encre">{t("about.heroTitle")}</h1>
            <p className="type-lede max-w-[34ch] text-encre/65">{t("about.heroBody")}</p>
            <p className="type-index mt-2 text-encre/45">{t("about.location")}</p>
            <a
              href="mailto:dernouniamine02@gmail.com"
              className="type-index w-fit text-encre underline decoration-encre/25 underline-offset-[6px] transition-colors duration-500 hover:decoration-encre"
            >
              dernouniamine02@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE */}
      <Reveal as="section" className="bg-ivoire">
        <div className="shell flex flex-col section-space section-gap">
          <h2 className="type-title text-encre">{t("about.experienceTitle")}</h2>
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

      {/* Une séquence horizontale : le défilement vertical déplace les trois
          collaborations latéralement, puis rend la page à son rythme normal. */}
      <HorizontalCollaboration
        title={t("about.collaborateTitle")}
        intro={t("collaborationsIntro")}
        items={collaborations}
      />

      {/* SERVICES */}
      <ServicesGrid
        title={t("about.servicesTitle")}
        intro={t("servicesIntro")}
        items={practices}
        className="section-space"
      />

      {/* MÉTHODOLOGIE — bloc noir */}
      <ServicesGrid
        title={t("about.methodologyTitle")}
        intro={t("about.methodologyIntro")}
        items={methodology}
        theme="soft"
        className="section-space"
      />

      <NextStepCTA />
    </div>
  );
}
