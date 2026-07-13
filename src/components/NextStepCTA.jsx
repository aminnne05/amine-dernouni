import CTAButton from "./CTAButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function NextStepCTA() {
  const { t, path } = useLanguage();

  return (
    <div className="flex w-full flex-col items-center gap-[18px] bg-encre py-24 md:py-[151px]">
      <p className="text-center text-xs font-light tracking-widest text-[#a5a5a5]">
        {t("nextStep.eyebrow")}
      </p>
      <p className="max-w-[480px] text-center text-2xl md:text-[32px] font-light leading-snug tracking-[-0.02em] text-ivoire">
        <span className="font-thin">{t("nextStep.titlePlain")}</span>{" "}
        <span className="font-medium tracking-[-0.04em] whitespace-nowrap">
          {t("nextStep.titleBold")}
        </span>
      </p>
      <CTAButton variant="white" href={path("/contact")}>
        {t("nextStep.cta")}
      </CTAButton>
    </div>
  );
}
