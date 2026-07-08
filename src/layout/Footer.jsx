import { useEffect, useRef, useState } from "react";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";

/*
  Footer style JKR :
  - fixé derrière le contenu, révélé quand la page arrive en bas
  - colonnes Trouver / Suivre / Écrire
  - logo horizontal géant en tout dernier, pleine largeur, coupé en bas
*/
export default function Footer() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

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
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 pb-8 pt-20 md:px-[27px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-light uppercase tracking-widest text-ivoire/50">
                Trouver
              </p>
              <div className="text-sm font-light leading-relaxed">
                <p>Nice, France.</p>
                <a
                  href="tel:+33625020042"
                  className="block transition-opacity hover:opacity-60"
                >
                  +33 625 020 042
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-light uppercase tracking-widest text-ivoire/50">
                Suivre
              </p>
              <div className="flex flex-col gap-1 text-sm font-light">
                <a
                  href="https://www.instagram.com/amine_dernouni/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-60"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-el-amine-dernouni-b270a4211/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-60"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.wearepulpp.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-60"
                >
                  Pulpp
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-light uppercase tracking-widest text-ivoire/50">
                Écrire
              </p>
              <a
                href="mailto:dernouniamine02@gmail.com"
                className="text-sm font-light transition-opacity hover:opacity-60"
              >
                dernouniamine02@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-2 border-t border-ivoire/15 pt-4 pb-4 text-xs font-light text-ivoire/50 md:flex-row md:items-center">
            <p>©2026 Amine Dernouni</p>
            <p>Directeur artistique, Nice.</p>
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
