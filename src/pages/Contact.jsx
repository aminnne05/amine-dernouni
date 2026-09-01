import { useState } from "react";
import Reveal from "../components/Reveal";
import HoverTab from "../components/HoverTab";
import { useLanguage } from "../i18n/LanguageContext";

const FORM_ENDPOINT = "https://formspree.io/f/xpqvwlzo";

export default function Contact() {
  const { t } = useLanguage();
  const projectTypes = t("contact.projectTypes");
  const timelines = t("contact.timelines");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(() => projectTypes[0]);
  const [timeline, setTimeline] = useState(() => timelines[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const resetForm = () => {
    setName("");
    setEmail("");
    setType(projectTypes[0]);
    setTimeline(timelines[0]);
    setMessage("");
    setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const fields = t("contact.mailFields");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [fields.name]: name,
          [fields.email]: email,
          [fields.type]: type,
          [fields.timeline]: timeline,
          message,
          _subject: `${t("contact.mailSubject")} — ${name || t("contact.mailNoName")}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative z-10 bg-ivoire">
      {/* HERO */}
      <section className="bg-encre">
        <div className="shell colonnes items-end gap-y-6 pt-[104px] pb-24">
          <p className="type-micro col-span-16 text-ivoire/45 md:col-span-4">
            {t("contact.eyebrow")}
          </p>
          <p className="type-lede col-span-16 max-w-[34ch] text-ivoire md:col-span-7 md:col-start-10">
            <span className="text-ivoire/45">{t("contact.titlePlain")}</span>{" "}
            <span>{t("contact.titleBold")}</span>
          </p>
        </div>
      </section>

      <div className="shell flex flex-col gap-32 py-32">
        {/* 01 — BRIEF */}
        <Reveal as="section" className="colonnes gap-y-8">
          <p className="type-micro col-span-16 text-taupe md:col-span-4">
            {t("contact.briefLabel")}
          </p>
          <form onSubmit={handleSubmit} className="col-span-16 flex w-full flex-col gap-8 md:col-span-7 md:col-start-10">
            {status === "success" ? (
              <div className="flex flex-col gap-3 py-4">
                <p className="type-lede text-encre">{t("contact.successTitle")}</p>
                <p className="type-caption text-encre/60">{t("contact.successBody")}</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="type-micro mt-2 w-fit rounded-[var(--rayon-pastille)] border border-encre/25 px-4 py-2.5 text-taupe transition-colors duration-500 hover:border-encre hover:text-encre"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <>
                <label className="flex flex-col gap-2">
                  <span className="type-micro text-taupe">
                    {t("contact.yourName")}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("contact.namePlaceholder")}
                    className="type-lede rounded-[var(--rayon-image)] border border-encre/20 bg-transparent px-4 py-3 text-encre transition-colors duration-500 placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="type-micro text-taupe">
                    {t("contact.email")}
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.emailPlaceholderForm")}
                    className="type-lede rounded-[var(--rayon-image)] border border-encre/20 bg-transparent px-4 py-3 text-encre transition-colors duration-500 placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                    required
                  />
                </label>

                <div className="flex flex-col gap-3">
                  <span className="type-micro text-taupe">
                    {t("contact.projectType")}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {projectTypes.map((pt) => (
                      <HoverTab key={pt} active={type === pt} onClick={() => setType(pt)}>
                        {pt}
                      </HoverTab>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="type-micro text-taupe">
                    {t("contact.timeline")}
                  </span>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="type-lede rounded-[var(--rayon-image)] border border-encre/20 bg-transparent px-4 py-3 text-encre transition-colors duration-500 focus:border-encre focus:outline-none"
                  >
                    {timelines.map((tl) => (
                      <option key={tl} value={tl}>
                        {tl}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="type-micro text-taupe">
                    {t("contact.projectDescription")}
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.descPlaceholder")}
                    rows={1}
                    className="type-lede resize-none rounded-[var(--rayon-image)] border border-encre/20 bg-transparent px-4 py-3 text-encre transition-colors duration-500 placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="type-micro group mt-2 flex w-fit items-center gap-2 rounded-[var(--rayon-pastille)] border border-encre/25 px-4 py-2.5 text-encre transition-colors duration-500 hover:border-encre disabled:opacity-50"
                >
                  {status === "sending" ? t("contact.sending") : t("contact.submit")}
                  <svg
                    className="h-[8px] w-[10px] transition-transform duration-500 ease-out group-hover:translate-x-1"
                    viewBox="0 0 11 9"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M0 4.5H10M10 4.5L6.5 1M10 4.5L6.5 8" stroke="currentColor" />
                  </svg>
                </button>
                {status === "error" && (
                  <p className="type-caption text-encre/70">
                    {t("contact.errorTitle")} {t("contact.errorBody")}
                  </p>
                )}
              </>
            )}
          </form>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* 02 — DIRECT */}
        <Reveal as="section" className="colonnes gap-y-8">
          <p className="type-micro col-span-16 text-taupe md:col-span-4">
            {t("contact.directLabel")}
          </p>
          <div className="col-span-16 flex flex-col gap-8 md:col-span-7 md:col-start-10">
            <div className="flex flex-col gap-1">
              <span className="type-micro text-taupe">
                {t("contact.email")}
              </span>
              <a
                href="mailto:dernouniamine02@gmail.com"
                className="type-lede w-fit text-encre underline decoration-encre/25 underline-offset-[6px] transition-colors duration-500 hover:decoration-encre"
              >
                dernouniamine02@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-micro text-taupe">
                {t("contact.numberLabel")}
              </span>
              <a
                href="tel:+33625020042"
                className="type-lede w-fit text-encre underline decoration-encre/25 underline-offset-[6px] transition-colors duration-500 hover:decoration-encre"
              >
                +33 6 25 02 00 42
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-micro text-taupe">
                {t("contact.instagramLabel")}
              </span>
              <a
                href="https://www.instagram.com/amine_dernoui"
                target="_blank"
                rel="noreferrer"
                className="type-lede w-fit text-encre underline decoration-encre/25 underline-offset-[6px] transition-colors duration-500 hover:decoration-encre"
              >
                @amine_dernoui
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
