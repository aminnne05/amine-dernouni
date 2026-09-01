import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoMark from "../assets/logo/logo-mark.svg?react";
import { useLanguage } from "../i18n/LanguageContext";
import useReady from "../hooks/useReady";

const HAUTEUR = 48;

/*
  Barre reprise de wolffolins.com :
  — à l'entrée, elle se déroule depuis une hauteur nulle, contenu découpé ;
  — elle occupe toute la largeur, sans fond, en haut de page ;
  — dès qu'on défile, un fond dépoli vient se poser derrière elle.
  Toutes les bascules suivent la même courbe (ease-quint, 650 ms).
*/
export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang, t, path } = useLanguage();
  const { pathname } = useLocation();
  const ready = useReady();
  const [entered, setEntered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    const timer = setTimeout(() => setEntered(true), 260);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const navLinks = [
    { to: path("/"), label: t("nav.accueil") },
    { to: path("/projets"), label: t("nav.projets") },
    // Hors Cadre se signale par son dessin de lettre, pas par un badge.
    { to: path("/hors-cadre"), label: t("horsCadre.nav"), serif: true },
    { to: path("/a-propos"), label: t("nav.aPropos") },
    { to: path("/contact"), label: t("nav.contact") },
  ];

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const frPath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const enPath = isEn ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

  // Les pages qui s'ouvrent sur un bloc noir : la barre y flotte en clair
  // tant que le fond dépoli n'est pas posé.
  const debutSombre = ["/", "/en", "/contact", "/en/contact"].includes(pathname);
  const surFondNoir = debutSombre && !scrolled && !open;

  const encreTexte = surFondNoir ? "text-ivoire" : "text-encre";
  const encreDoux = surFondNoir ? "text-ivoire/50" : "text-taupe";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="shell pointer-events-none fixed top-0 left-0 z-50 w-full pt-3">
        <div
          className="pointer-events-auto relative mx-auto overflow-clip rounded-[var(--rayon-pastille)]"
          style={{
            height: entered ? `${HAUTEUR}px` : "0px",
            transition: "height 650ms var(--ease-quint)",
          }}
        >
          {/* fond dépoli, posé un peu après le mouvement */}
          <div
            className="absolute inset-0 rounded-[var(--rayon-pastille)] border border-encre/10 bg-ivoire/85 backdrop-blur-xl transition-opacity duration-500 ease-out"
            style={{ opacity: scrolled ? 1 : 0 }}
            aria-hidden
          />

          <div
            className="relative flex w-full items-center justify-between px-4"
            style={{ height: `${HAUTEUR}px` }}
          >
            <div className="flex items-center gap-8">
              <Link
                to={path("/")}
                onClick={() => setOpen(false)}
                className={`block w-[26px] shrink-0 transition-colors duration-500 ${encreTexte}`}
                aria-label="Amine Dernouni"
              >
                <LogoMark className="h-auto w-full" />
              </Link>

              <nav className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end
                    className={`group relative inline-flex items-center justify-center px-3 py-1 ${
                      link.serif
                        ? "font-serif text-[1.15em] leading-none"
                        : "type-index"
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`absolute inset-0 rounded-full transition-all duration-500 ${
                            surFondNoir ? "bg-ivoire" : "bg-encre"
                          } ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-10"
                          }`}
                        />
                        <span
                          className={`relative transition-colors duration-500 ${
                            isActive
                              ? surFondNoir
                                ? "text-encre"
                                : "text-ivoire"
                              : encreTexte
                          }`}
                        >
                          {link.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div
              className={`type-micro hidden items-center gap-1 transition-colors duration-500 md:flex ${encreDoux}`}
            >
              <Link
                to={frPath}
                className={`transition-colors ${lang === "fr" ? encreTexte : ""}`}
              >
                FR
              </Link>
              <span>/</span>
              <Link
                to={enPath}
                className={`transition-colors ${lang === "en" ? encreTexte : ""}`}
              >
                EN
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={open}
              className="relative z-50 -mr-1 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 transition-all duration-300 ${
                  surFondNoir ? "bg-ivoire" : "bg-encre"
                } ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 transition-all duration-300 ${
                  surFondNoir ? "bg-ivoire" : "bg-encre"
                } ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="shell fixed inset-0 z-40 flex flex-col justify-between bg-ivoire pt-24 pb-8 md:hidden">
          <div className="flex flex-col gap-3">
            <p className="type-micro text-taupe">{t("nav.menuLabel")}</p>
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `type-title flex items-center justify-between gap-4 border-t border-encre/15 py-5 transition-colors ${
                      isActive ? "text-encre" : "text-encre/60"
                    }`
                  }
                >
                  <span className="flex items-baseline gap-4">
                    <span className="type-micro text-taupe">{`0${i + 1}`}</span>
                    <span className={link.serif ? "font-serif" : undefined}>
                      {link.label}
                    </span>
                  </span>
                  <svg
                    className="h-[10px] w-[13px] shrink-0"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M0 5H13M13 5L8.5 0.5M13 5L8.5 9.5"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-encre/15 pt-4">
            <div className="flex flex-col gap-4">
              <p className="type-micro text-taupe">{t("nav.socialLabel")}</p>
              <div className="type-index flex flex-col gap-1 text-encre">
                <a
                  href="https://www.instagram.com/amine_dernouni/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-el-amine-dernouni-b270a4211/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a href="https://www.wearepulpp.com/" target="_blank" rel="noreferrer">
                  Pulpp
                </a>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="type-micro flex items-center gap-1">
                <Link
                  to={frPath}
                  onClick={() => setOpen(false)}
                  className={lang === "fr" ? "text-encre" : "text-taupe"}
                >
                  FR
                </Link>
                <span className="text-taupe">/</span>
                <Link
                  to={enPath}
                  onClick={() => setOpen(false)}
                  className={lang === "en" ? "text-encre" : "text-taupe"}
                >
                  EN
                </Link>
              </div>
              <p className="type-micro text-taupe">©2026</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
