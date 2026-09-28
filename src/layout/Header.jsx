import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoMark from "../assets/logo/logo-mark.svg?react";
import { useLanguage } from "../i18n/LanguageContext";
import useReady from "../hooks/useReady";

const HAUTEUR = 52;

/* Barre noire compacte : forme pleine, contraste franc, sans contour dépoli. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang, t, path } = useLanguage();
  const { pathname } = useLocation();
  const ready = useReady();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    const timer = setTimeout(() => setEntered(true), 260);
    return () => clearTimeout(timer);
  }, [ready]);

  const navLinks = [
    { to: path("/"), label: t("nav.accueil") },
    { to: path("/projets"), label: t("nav.projets") },
    { to: path("/a-propos"), label: t("nav.aPropos") },
    { to: path("/contact"), label: t("nav.contact") },
  ];

  // Hors Cadre ferme la barre, tenu à l'écart des pages client.
  const horsCadre = { to: path("/hors-cadre"), label: t("horsCadre.nav") };

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const frPath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const enPath = isEn ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

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
          className="pointer-events-auto relative mx-auto overflow-hidden rounded-[8px] bg-encre/90 shadow-[0_8px_28px_rgba(29,29,27,0.12)] backdrop-blur-lg"
          style={{
            height: entered ? `${HAUTEUR}px` : "0px",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0) scale(1)" : "translateY(-10px) scale(.97)",
            transition: "height 760ms var(--ease-doux), opacity 420ms ease-out, transform 760ms var(--ease-quint)",
          }}
        >
          <div
            className="relative flex w-full items-center justify-between px-4"
            style={{ height: `${HAUTEUR}px` }}
          >
            <div className="flex items-center gap-8">
              <Link
                to={path("/")}
                onClick={() => setOpen(false)}
                className="block w-[26px] shrink-0 text-ivoire transition-opacity duration-500 hover:opacity-65"
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
                    className={({ isActive }) =>
                      `type-nav inline-flex items-center justify-center rounded-[6px] px-3 py-1.5 transition-colors duration-300 ${
                        isActive
                          ? "bg-[#d8d8d6] text-encre"
                          : "text-ivoire hover:bg-ivoire/15"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Hors Cadre : tenu à l'écart des pages client, mais gardé
                  dans le premier tiers de la barre. */}
              <NavLink
                to={horsCadre.to}
                end
                className={({ isActive }) =>
                  `type-nav ml-10 hidden items-center justify-center rounded-[6px] px-3 py-1.5 transition-colors duration-300 md:inline-flex ${
                    isActive
                      ? "bg-[#d8d8d6] text-encre"
                      : "text-ivoire hover:bg-ivoire/15"
                  }`
                }
              >
                {horsCadre.label}
              </NavLink>
            </div>

            <div className="type-nav hidden items-center gap-1 text-ivoire/55 md:flex">
              <Link
                to={frPath}
                className={`transition-colors hover:text-ivoire ${lang === "fr" ? "text-ivoire" : ""}`}
              >
                FR
              </Link>
              <span>/</span>
              <Link
                to={enPath}
                className={`transition-colors hover:text-ivoire ${lang === "en" ? "text-ivoire" : ""}`}
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
              <span className={`h-px w-5 bg-ivoire transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-ivoire transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="shell fixed inset-0 z-40 flex flex-col justify-between bg-ivoire pt-24 pb-8 md:hidden">
          <div className="flex flex-col gap-3">
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `type-subtitle flex items-center justify-between gap-4 border-t border-encre/15 py-5 transition-colors ${
                      isActive ? "text-encre" : "text-encre/60"
                    }`
                  }
                >
                  <span className="flex items-baseline gap-4">
                    <span className="type-micro text-taupe">{`0${i + 1}`}</span>
                    {link.label}
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

            <NavLink
              to={horsCadre.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `type-subtitle mt-10 flex items-center justify-between gap-4 border-t border-encre/15 py-5 transition-colors ${
                  isActive ? "text-encre" : "text-encre/60"
                }`
              }
            >
              <span className="flex items-baseline gap-4">
                <span className="type-micro text-taupe">05</span>
                {horsCadre.label}
              </span>
              <svg className="h-[10px] w-[13px] shrink-0" viewBox="0 0 14 10" fill="none">
                <path
                  d="M0 5H13M13 5L8.5 0.5M13 5L8.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </NavLink>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-encre/15 pt-4">
            <div className="flex flex-col gap-4">
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
                  <span className="text-rouge">Pulpp</span>
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
