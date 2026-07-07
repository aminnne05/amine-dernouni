import { useState } from "react";
import Reveal from "../components/Reveal";

const projectTypes = ["Branding", "Motion", "Direction artistique", "UX/UI", "Autre"];
const timelines = ["Aucune urgence", "1 à 3 mois", "Dans le mois", "Urgent"];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Branding");
  const [timeline, setTimeline] = useState("Aucune urgence");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Brief projet — ${name || "sans nom"}`);
    const body = encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\nType de projet : ${type}\nTimeline souhaitée : ${timeline}\n\n${message}`
    );
    window.location.href = `mailto:dernouniamine02@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative z-10 bg-ivoire">
      {/* HERO */}
      <section className="flex flex-col items-center gap-4 bg-encre px-6 py-24 text-center">
        <p className="text-xs font-light tracking-widest text-[#a5a5a5]">
          CONTACT
        </p>
        <p className="max-w-[600px] text-2xl font-light leading-snug tracking-[-0.02em] text-ivoire md:text-4xl">
          <span className="font-thin">Un projet auquel vous tenez ?</span>{" "}
          <span className="font-bold tracking-[-0.04em]">Construisons le ensemble.</span>
        </p>
      </section>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32 px-6 py-32 md:px-[27px]">
        {/* 01 — BRIEF */}
        <Reveal as="section" className="flex flex-col gap-8 md:grid md:grid-cols-[200px_1fr] md:items-start md:gap-10">
          <p className="shrink-0 text-sm font-light tracking-wide text-taupe">
            01 — Brief
          </p>
          <form onSubmit={handleSubmit} className="flex w-full max-w-[500px] flex-col gap-8">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Ton nom
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Écrire ici"
                className="border-b border-encre/20 bg-transparent pb-2 text-lg font-light text-encre placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@tamarque.com"
                className="border-b border-encre/20 bg-transparent pb-2 text-lg font-light text-encre placeholder:text-taupe/50 focus:border-encre focus:outline-none"
                required
              />
            </label>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Type de projet
              </span>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-light tracking-wide transition-colors ${
                      type === t
                        ? "border-encre bg-encre text-ivoire"
                        : "border-encre/25 text-encre hover:border-encre"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Timeline souhaitée
              </span>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="border-b border-encre/20 bg-transparent pb-2 text-lg font-light text-encre focus:border-encre focus:outline-none"
              >
                {timelines.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Le projet en quelques lignes
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Contexte, audience, ce qui te bloque, ce dont tu rêves..."
                rows={3}
                className="resize-none border-b border-encre/20 bg-transparent pb-2 text-base font-light text-encre placeholder:text-taupe/50 focus:border-encre focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="group mt-2 flex w-fit flex-col items-start gap-1"
            >
              <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-encre">
                ENVOYER LE BRIEF
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
          <p className="shrink-0 text-sm font-light tracking-wide text-taupe">
            02 — Direct
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Email
              </span>
              <a
                href="mailto:dernouniamine02@gmail.com"
                className="w-fit border-b border-encre/30 text-lg font-medium text-encre hover:border-encre"
              >
                dernouniamine02@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Numéro
              </span>
              <a
                href="tel:+33625020042"
                className="w-fit border-b border-encre/30 text-lg font-medium text-encre hover:border-encre"
              >
                +33 6 25 02 00 42
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light uppercase tracking-widest text-taupe/70">
                Instagram
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
