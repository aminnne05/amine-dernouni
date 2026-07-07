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
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex h-14 w-full max-w-[1440px] items-center justify-between bg-ivoire px-6 py-4 md:px-[27px]">
      <div className="flex items-center gap-16">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="block w-[40px] shrink-0 text-encre"
          aria-label="Amine Dernouni"
        >
          <LogoMark className="h-auto w-full" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium tracking-[-0.02em] transition-colors ${
                  isActive ? "text-encre" : "text-taupe hover:text-encre"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="hidden items-center gap-[10px] cursor-pointer md:flex">
        <button type="button" className="text-xs text-encre">
          FR
        </button>
        <button type="button" className="text-xs font-light text-encre">
          EN
        </button>
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
      <div className="fixed inset-0 top-14 z-40 flex flex-col justify-between bg-ivoire px-6 py-10 md:hidden">
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-light transition-colors ${
                  isActive ? "text-encre" : "text-taupe hover:text-encre"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-[10px] cursor-pointer">
          <button type="button" className="text-xs text-encre">
            FR
          </button>
          <button type="button" className="text-xs font-light text-encre">
            EN
          </button>
        </div>
      </div>
    )}
    </>
  );
}
