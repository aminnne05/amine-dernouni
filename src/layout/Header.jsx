import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoMark from "../assets/logo/logo-mark.svg?react";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/projets", label: "Projets" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-1/2 z-50 flex h-16 w-full max-w-[1440px] -translate-x-1/2 items-center justify-between border-b border-encre/10 bg-ivoire/70 px-6 py-4 backdrop-blur-xl md:px-[27px]">
        <div className="flex items-center gap-16">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block w-[40px] shrink-0 text-encre"
            aria-label="Amine Dernouni"
          >
            <LogoMark className="h-auto w-full" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-[-0.01em]"
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

        <div className="hidden items-center md:flex">
          <span className="text-xs text-encre">FR</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-encre transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-encre transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-ivoire px-6 pt-28 pb-8 md:hidden">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-light uppercase tracking-widest text-taupe">
              (Menu)
            </p>
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
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
              <p className="text-xs font-light uppercase tracking-widest text-taupe">
                (Réseaux)
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
            <p className="text-xs font-light text-taupe">©2026</p>
          </div>
        </div>
      )}
    </>
  );
}
