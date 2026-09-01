import CTAButton from "./CTAButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function NextStepCTA() {
  const { t, path } = useLanguage();

  return (
    <section className="w-full bg-encre py-28 md:py-36">
      <div className="shell colonnes items-end gap-y-8">
        <p className="type-micro col-span-16 text-ivoire/45 md:col-span-4">
          {t("nextStep.eyebrow")}
        </p>
        <div className="col-span-16 flex flex-col items-start gap-8 md:col-span-11 md:col-start-6">
          <p className="type-title max-w-[20ch] text-ivoire">
            <span className="text-ivoire/45">{t("nextStep.titlePlain")}</span>{" "}
            <span>{t("nextStep.titleBold")}</span>
          </p>
          <CTAButton variant="white" href={path("/contact")}>
            {t("nextStep.cta")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
