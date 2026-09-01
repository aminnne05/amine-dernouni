import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoMark from "../assets/logo/logo-mark.svg?react";
import { useLanguage } from "../i18n/LanguageContext";
import useReady from "../hooks/useReady";

const HAUTEUR = 52;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang, t, path } = useLanguage();
  const { pathname } = useLocation();
  const ready = useReady();
  const [entered, setEntered] = useState(false);

  // Entrée reprise de wolffolins.com : la barre se déroule depuis une
  // hauteur nulle, son contenu découpé, pendant que le fond translucide
  // se pose un peu plus lentement derrière.
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
      <header
        className="fixed top-0 left-0 z-50 w-full overflow-clip"
        style={{
          height: entered ? `${HAUTEUR}px` : "0px",
          transition: "height 650ms var(--ease-quint)",
        }}
      >
        <div
          className="absolute inset-0 border-b border-encre/10 bg-ivoire/70 backdrop-blur-xl transition-opacity duration-500 ease-out"
          style={{ opacity: entered ? 1 : 0 }}
          aria-hidden
        />
        <div
          className="shell relative flex w-full items-center justify-between"
          style={{ height: `${HAUTEUR}px` }}
        >
        <div className="flex items-center gap-10">
          <Link
            to={path("/")}
            onClick={() => setOpen(false)}
            className="block w-[30px] shrink-0 text-encre"
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
                className="type-index group relative inline-flex items-center justify-center px-3 py-1.5"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute inset-0 border transition-all duration-300 ease-out ${
                        isActive
                          ? "scale-100 border-encre bg-encre opacity-100"
                          : "scale-90 border-encre/20 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                    <span
                      className={`relative transition-colors duration-300 ${
                        isActive ? "text-ivoire" : "text-encre"
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

        <div className="type-micro hidden items-center gap-1 md:flex">
          <Link
            to={frPath}
            className={`transition-colors ${lang === "fr" ? "font-medium text-encre" : "text-taupe hover:text-encre"}`}
          >
            FR
          </Link>
          <span className="text-taupe">/</span>
          <Link
            to={enPath}
            className={`transition-colors ${lang === "en" ? "font-medium text-encre" : "text-taupe hover:text-encre"}`}
          >
            EN
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={open}
          className="relative z-50 -mr-1 flex h-8 w-8 flex-col items-center justify-end gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-encre transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-encre transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
        </div>
      </header>

      {open && (
        <div className="shell fixed inset-0 z-40 flex flex-col justify-between bg-ivoire pt-24 pb-8 md:hidden">
          <div className="flex flex-col gap-3">
            <p className="type-micro text-taupe">
              {t("nav.menuLabel")}
            </p>
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-4 border-t border-encre/15 py-5 text-2xl font-medium tracking-[-0.02em] transition-colors ${
                      isActive ? "text-encre" : "text-encre/60"
                    }`
                  }
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs font-light text-taupe">{`0${i + 1}`}</span>
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
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-encre/15 pt-4">
            <div className="flex flex-col gap-4">
              <p className="type-micro text-taupe">
                {t("nav.socialLabel")}
              </p>
              <div className="flex flex-col gap-1 text-sm font-light text-encre">
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
              <div className="flex items-center gap-1 text-xs">
                <Link
                  to={frPath}
                  onClick={() => setOpen(false)}
                  className={lang === "fr" ? "font-medium text-encre" : "text-taupe"}
                >
                  FR
                </Link>
                <span className="text-taupe">/</span>
                <Link
                  to={enPath}
                  onClick={() => setOpen(false)}
                  className={lang === "en" ? "font-medium text-encre" : "text-taupe"}
                >
                  EN
                </Link>
              </div>
              <p className="text-xs font-light text-taupe">©2026</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
