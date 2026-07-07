import CTAButton from "./CTAButton";

export default function NextStepCTA() {
  return (
    <div className="flex w-full flex-col items-center gap-[18px] bg-encre py-24 md:py-[151px]">
      <p className="text-center text-xs font-light tracking-widest text-[#a5a5a5]">
        PROCHAINE ÉTAPE
      </p>
      <p className="max-w-[480px] text-center text-2xl md:text-[32px] font-light leading-snug tracking-[-0.02em] text-ivoire">
        <span className="font-thin">Un projet auquel vous tenez ?</span>{" "}
        <span className="font-bold tracking-[-0.04em] whitespace-nowrap">Parlons-en.</span>
      </p>
      <CTAButton variant="white" href="/contact">
        EN SAVOIR PLUS
      </CTAButton>
    </div>
  );
}
