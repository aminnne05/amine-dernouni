import { useState } from "react";
import Reveal from "../components/Reveal";
import HoverTab from "../components/HoverTab";
import { useLanguage } from "../i18n/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const projectTypes = t("contact.projectTypes");
  const timelines = t("contact.timelines");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(() => projectTypes[0]);
  const [timeline, setTimeline] = useState(() => timelines[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = t("contact.mailFields");
    const subject = encodeURIComponent(
      `${t("contact.mailSubject")} — ${name || t("contact.mailNoName")}`
    );
    const body = encodeURIComponent(
      `${fields.name} : ${name}\n${fields.email} : ${email}\n${fields.type} : ${type}\n${fields.timeline} : ${timeline}\n\n${message}`
    );
    window.location.href = `mailto:dernouniamine02@gmail.com?subject=${subject}&body=${body}`;
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

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32 px-6 py-32 md:px-[27px]">
        {/* 01 — BRIEF */}
        <Reveal as="section" className="flex flex-col gap-8 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
          <p className="shrink-0 text-sm font-medium tracking-wide text-encre/70">
            {t("contact.briefLabel")}
          </p>
          <form onSubmit={handleSubmit} className="flex w-full max-w-[500px] flex-col gap-8">
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
              className="group mt-2 flex w-fit flex-col items-start gap-1"
            >
              <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-encre">
                {t("contact.submit")}
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
