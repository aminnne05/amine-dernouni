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
      <section className="bg-ivoire">
        <div className="shell colonnes items-end gap-y-12 page-top pb-[clamp(6rem,9vw,9rem)]">
          <h1 className="type-display col-span-16 max-w-[14ch] text-encre md:col-span-10">
            <span className="text-encre/40">{t("contact.titlePlain")}</span>{" "}
            <span className="block">{t("contact.titleBold")}</span>
          </h1>
          <p className="type-lede col-span-16 max-w-[24ch] text-encre/65 md:col-span-5 md:col-start-12">
            {t("contact.intro")}
          </p>
          <div className="col-span-16 mt-4 flex flex-wrap items-end gap-x-6 gap-y-5 md:mt-16">
            <a
              href="mailto:dernouniamine02@gmail.com"
              className="type-title max-w-full break-all border-b border-encre/30 pb-2 text-encre transition-colors duration-300 hover:border-encre md:break-normal"
            >
              dernouniamine02@gmail.com
            </a>
          </div>
        </div>
      </section>

      <div className="shell border-t border-encre/20 section-space">
        <Reveal as="section" className="colonnes items-start gap-y-14">
          <div className="col-span-16 flex flex-col gap-10 md:col-span-5">
            <div className="flex flex-col gap-5">
              <h2 className="type-subtitle text-encre">{t("contact.directLabel")}</h2>
              <p className="type-body max-w-[30ch] text-encre/55">{t("contact.directIntro")}</p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="tel:+33625020042" className="type-body w-fit text-encre/70 transition-colors hover:text-encre">
                +33 6 25 02 00 42
              </a>
              <a
                href="https://www.instagram.com/amine_dernouni/"
                target="_blank"
                rel="noreferrer"
                className="type-body w-fit text-encre/70 transition-colors hover:text-encre"
              >
                Instagram ↗
              </a>
            </div>
          </div>

          <div className="col-span-16 md:col-span-9 md:col-start-8">
            <h2 className="type-subtitle mb-8 text-encre">{t("contact.briefLabel")}</h2>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
            {status === "success" ? (
              <div className="flex flex-col gap-3 py-4">
                <p className="type-lede text-encre">{t("contact.successTitle")}</p>
                <p className="type-caption text-encre/60">{t("contact.successBody")}</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="type-micro morph-button morph-button--grey relative mt-2 w-fit px-5 py-3"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="type-body font-medium text-encre">
                    {t("contact.yourName")}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("contact.namePlaceholder")}
                    className="type-body border-0 border-b border-encre/25 bg-transparent px-0 py-3 text-encre transition-colors duration-500 placeholder:text-taupe/60 focus:border-encre focus:outline-none"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="type-body font-medium text-encre">
                    {t("contact.email")}
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.emailPlaceholderForm")}
                    className="type-body border-0 border-b border-encre/25 bg-transparent px-0 py-3 text-encre transition-colors duration-500 placeholder:text-taupe/60 focus:border-encre focus:outline-none"
                    required
                  />
                </label>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="type-body font-medium text-encre">
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
                  <span className="type-body font-medium text-encre">
                    {t("contact.timeline")}
                  </span>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="type-body border-0 border-b border-encre/25 bg-transparent px-0 py-3 text-encre transition-colors duration-500 focus:border-encre focus:outline-none"
                  >
                    {timelines.map((tl) => (
                      <option key={tl} value={tl}>
                        {tl}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="type-body font-medium text-encre">
                    {t("contact.projectDescription")}
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.descPlaceholder")}
                    rows={4}
                    className="type-body resize-none border-0 border-b border-encre/25 bg-transparent px-0 py-3 text-encre transition-colors duration-500 placeholder:text-taupe/60 focus:border-encre focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="type-micro morph-button morph-button--grey direct-button group relative mt-2 flex w-fit items-center gap-2 px-5 py-3 disabled:opacity-50"
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
          </div>
        </Reveal>
      </div>
    </div>
  );
}
