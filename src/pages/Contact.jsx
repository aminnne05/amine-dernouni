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
      <section className="flex flex-col items-center gap-4 bg-encre px-6 py-24 text-center">
        <p className="text-sm font-medium tracking-widest text-ivoire/60">
          {t("contact.eyebrow")}
        </p>
        <p className="max-w-[600px] text-2xl font-light leading-snug tracking-[-0.02em] text-ivoire md:text-4xl">
          <span className="font-thin">{t("contact.titlePlain")}</span>{" "}
          <span className="font-medium tracking-[-0.04em]">{t("contact.titleBold")}</span>
        </p>
      </section>

      <div className="shell flex flex-col gap-32 py-32">
        {/* 01 — BRIEF */}
        <Reveal as="section" className="flex flex-col gap-8 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
          <p className="shrink-0 text-sm font-medium tracking-wide text-encre/70">
            {t("contact.briefLabel")}
          </p>
          <form onSubmit={handleSubmit} className="flex w-full max-w-[500px] flex-col gap-8">
            {status === "success" ? (
              <div className="flex flex-col gap-3 py-4">
                <p className="text-lg font-medium text-encre">{t("contact.successTitle")}</p>
                <p className="text-sm font-light text-encre/60">{t("contact.successBody")}</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-2 w-fit text-xs font-light uppercase tracking-widest text-taupe hover:text-encre"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                    {t("contact.yourName")}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("contact.namePlaceholder")}
                    className="border-b border-encre/20 bg-transparent pb-2 text-lg font-light text-encre placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                    {t("contact.email")}
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.emailPlaceholderForm")}
                    className="border-b border-encre/20 bg-transparent pb-2 text-lg font-light text-encre placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                    required
                  />
                </label>

                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
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
                  <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                    {t("contact.timeline")}
                  </span>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="border-b border-encre/20 bg-transparent pb-2 text-lg font-light text-encre focus:border-encre focus:outline-none"
                  >
                    {timelines.map((tl) => (
                      <option key={tl} value={tl}>
                        {tl}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                    {t("contact.projectDescription")}
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.descPlaceholder")}
                    rows={1}
                    className="resize-none border-b border-encre/20 bg-transparent pb-2 text-base font-light text-encre placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-2 flex w-fit flex-col items-start gap-1 disabled:opacity-50"
                >
                  <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-encre">
                    {status === "sending" ? t("contact.sending") : t("contact.submit")}
                    <svg
                      className="h-[8px] w-[10px] transition-transform group-hover:translate-x-1"
                      viewBox="0 0 11 9"
                      fill="none"
                    >
                      <path d="M0 4.5H10M10 4.5L6.5 1M10 4.5L6.5 8" stroke="currentColor" />
                    </svg>
                  </span>
                  <span className="h-px w-full bg-encre" />
                </button>
                {status === "error" && (
                  <p className="text-xs font-light text-encre/70">
                    {t("contact.errorTitle")} {t("contact.errorBody")}
                  </p>
                )}
              </>
            )}
          </form>
        </Reveal>

        <div className="h-px w-full bg-encre/15" />

        {/* 02 — DIRECT */}
        <Reveal as="section" className="flex flex-col gap-8 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
          <p className="shrink-0 text-sm font-medium tracking-wide text-encre/70">
            {t("contact.directLabel")}
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                {t("contact.email")}
              </span>
              <a
                href="mailto:dernouniamine02@gmail.com"
                className="w-fit border-b border-encre/30 text-lg font-medium text-encre hover:border-encre"
              >
                dernouniamine02@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                {t("contact.numberLabel")}
              </span>
              <a
                href="tel:+33625020042"
                className="w-fit border-b border-encre/30 text-lg font-medium text-encre hover:border-encre"
              >
                +33 6 25 02 00 42
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium uppercase tracking-wide text-encre/70">
                {t("contact.instagramLabel")}
              </span>
              <a
                href="https://www.instagram.com/amine_dernoui"
                target="_blank"
                rel="noreferrer"
                className="w-fit border-b border-encre/30 text-lg font-medium text-encre hover:border-encre"
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
