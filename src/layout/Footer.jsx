import { useEffect, useRef, useState } from "react";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";
import { useLanguage } from "../i18n/LanguageContext";

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
        <div className="shell flex flex-col gap-16 pb-8 pt-20">
          <div className="colonnes gap-y-14">
            {/* Coordonnées, à gauche et discrètes */}
            <div className="col-span-16 flex flex-col gap-10 md:col-span-5">
              <div className="flex flex-col gap-3">
                <p className="type-micro text-ivoire/45">{t("footer.find")}</p>
                <div className="type-index text-ivoire">
                  <p>Nice, France.</p>
                  <a
                    href="tel:+33625020042"
                    className="block transition-opacity hover:opacity-60"
                  >
                    +33 625 020 042
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="type-micro text-ivoire/45">{t("footer.write")}</p>
                <a
                  href="mailto:dernouniamine02@gmail.com"
                  className="type-index text-ivoire transition-opacity hover:opacity-60"
                >
                  dernouniamine02@gmail.com
                </a>
              </div>
            </div>

            {/* Réseaux — à droite, alignés au bord, en grand */}
            <div className="col-span-16 flex flex-col items-end gap-5 md:col-span-9 md:col-start-8">
              <p className="type-micro text-ivoire/45">
                {t("footer.follow")}{" "}
                <span className="text-ivoire/25">
                  ({String(reseaux.length).padStart(2, "0")})
                </span>
              </p>
              <div className="flex w-full flex-col items-end">
                {reseaux.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4"
                  >
                    <span className="type-display text-ivoire/55 transition-colors duration-500 ease-out group-hover:text-ivoire">
                      {name}
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
