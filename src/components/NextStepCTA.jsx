import CTAButton from "./CTAButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function NextStepCTA() {
  const { t, path } = useLanguage();

  return (
    <section className="w-full border-t border-encre/20 bg-ivoire section-space">
      <div className="shell colonnes items-end gap-y-8">
        <h2 className="type-display col-span-16 max-w-[14ch] text-encre md:col-span-10">
          <span className="text-encre/40">{t("nextStep.titlePlain")}</span>{" "}
          <span>{t("nextStep.titleBold")}</span>
        </h2>
        <div className="col-span-16 flex flex-col items-start gap-6 md:col-span-5 md:col-start-12">
          <p className="type-body max-w-[34ch] text-encre/65">{t("nextStep.body")}</p>
          <CTAButton href={path("/contact")}>{t("nextStep.cta")}</CTAButton>
        </div>
        <a
          href="mailto:dernouniamine02@gmail.com"
          className="type-title col-span-16 mt-12 w-fit max-w-full break-all border-b border-encre/30 pb-2 text-encre transition-[border-color,color] duration-300 hover:border-encre md:mt-20 md:break-normal"
        >
          dernouniamine02@gmail.com
        </a>
      </div>
    </section>
  );
}
