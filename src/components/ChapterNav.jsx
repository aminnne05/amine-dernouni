import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/*
  Index des chapitres tenu en bas à gauche, repris de la page Wise de
  raggededge.com : une pastille discrète qui déplie la liste et laisse
  sauter d'un chapitre à l'autre sans remonter toute la page. Elle ne
  se montre qu'une fois le premier écran passé.
*/
export default function ChapterNav({ chapters }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [courant, setCourant] = useState("apercu");

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.5);
        // le chapitre courant est le dernier dont le titre est passé
        // au-dessus du tiers haut de l'écran
        const seuil = window.innerHeight * 0.35;
        let actif = "apercu";
        for (const c of chapters) {
          const el = document.getElementById(c.key);
          if (el && el.getBoundingClientRect().top <= seuil) actif = c.key;
        }
        setCourant(actif);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [chapters]);

  const aller = (id) => {
    const el = id === "apercu" ? null : document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  const entrees = [{ key: "apercu", label: t("projectDetail.overview") }, ...chapters];

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-40 hidden flex-col items-start gap-1 p-[var(--marge)] md:flex"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 650ms var(--ease-quint), opacity 400ms ease-out",
      }}
    >
      {open && (
        <div className="pointer-events-auto mb-1 flex flex-col items-start gap-1">
          {entrees.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => aller(c.key)}
              className={`type-micro morph-button relative overflow-hidden border bg-ivoire/85 px-4 py-2 backdrop-blur-xl transition-colors duration-500 ${
                courant === c.key
                  ? "border-encre text-encre"
                  : "border-encre/15 text-taupe hover:border-encre/40 hover:text-encre"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="type-micro morph-button relative pointer-events-auto flex items-center gap-2 overflow-hidden border border-encre/15 bg-ivoire/85 px-4 py-2.5 text-encre backdrop-blur-xl transition-colors duration-500 hover:border-encre"
      >
        {t("projectDetail.chaptersLabel")}
        <svg
          className="h-[7px] w-[10px] transition-transform duration-500 ease-out"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          viewBox="0 0 10 7"
          fill="none"
          aria-hidden
        >
          <path d="M1 5.5L5 1.5L9 5.5" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
    </div>
  );
}
