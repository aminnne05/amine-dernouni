import { useEffect, useRef, useState } from "react";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";
import { useLanguage } from "../i18n/LanguageContext";
import { highlightPulpp } from "../utils/pulpp";

/*
  Footer style JKR :
  - fixé derrière le contenu, révélé quand la page arrive en bas
  - colonnes Trouver / Suivre / Écrire
  - logo horizontal géant en tout dernier, pleine largeur, coupé en bas
*/
const reseaux = [
  { name: "Instagram", href: "https://www.instagram.com/amine_dernouni/" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-el-amine-dernouni-b270a4211/",
  },
  { name: "Pulpp", href: "https://www.wearepulpp.com/" },
];

export default function Footer() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const measure = () => setHeight(ref.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      {/* espace réservé : le contenu défile au-dessus du footer fixé */}
      <div style={{ height }} aria-hidden />
      <footer
        ref={ref}
        className="fixed bottom-0 left-0 z-0 w-full bg-encre text-ivoire"
      >
        <div className="shell flex flex-col gap-8 pb-5 pt-10 md:gap-16 md:pb-8 md:pt-20">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:colonnes md:gap-y-14">
            <div className="col-span-1 flex min-w-0 flex-col gap-2 md:col-span-5 md:gap-3">
              <p className="type-nav text-ivoire/55">Nice, France.</p>
              <a
                href="tel:+33625020042"
                className="type-nav text-ivoire transition-opacity hover:opacity-60"
              >
                +33 625 020 042
              </a>
              <a
                href="mailto:dernouniamine02@gmail.com"
                className="type-nav text-ivoire transition-opacity hover:opacity-60"
              >
                <span className="md:hidden">Email ↗</span>
                <span className="hidden md:inline">dernouniamine02@gmail.com</span>
              </a>
            </div>

            <div className="col-span-1 flex min-w-0 flex-col items-start md:col-span-9 md:col-start-8">
              <div className="flex w-full flex-col items-start">
                {reseaux.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <span className="type-index text-ivoire/65 transition-colors duration-500 ease-out group-hover:text-ivoire md:type-subtitle">
                      {highlightPulpp(name)}
                    </span>
                    <svg
                      className="h-3 w-3 shrink-0 text-ivoire/35 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ivoire"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M1 11L11 1M11 1H3.5M11 1V8.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-2 border-t border-ivoire/15 pt-4 md:flex-row md:items-center">
            <p className="type-micro text-ivoire/45">©2026 Amine Dernouni</p>
            <p className="type-micro text-ivoire/45">{t("footer.tagline")}</p>
          </div>
        </div>

        {/* Logo horizontal géant, pleine largeur, coupé en bas */}
        <div className="aspect-[13/1] w-full overflow-hidden text-ivoire">
          <LogoHorizontal className="h-auto w-full" />
        </div>
      </footer>
    </>
  );
}
