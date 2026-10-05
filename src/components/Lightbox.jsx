import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { isVideoSrc } from "../utils/media";

export default function Lightbox({ piece, onClose }) {
  const lenis = useLenis();
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const total = piece?.media.length ?? 0;

  const go = useCallback(
    (step) => {
      if (total < 2) return;
      setIndex((current) => (current + step + total) % total);
    },
    [total]
  );

  useEffect(() => {
    setIndex(0);
  }, [piece]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.body.style.overflow = "hidden";
    lenis?.stop();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [go, lenis, onClose]);

  if (!piece || total === 0) return null;
  const current = piece.media[index];

  const previousButton = (
    <button
      type="button"
      onClick={() => go(-1)}
      aria-label="Précédent"
      className="morph-button group hidden shrink-0 flex-col items-center gap-2 border border-ivoire/20 px-3 py-4 text-ivoire/70 transition-colors duration-500 hover:border-ivoire/60 hover:text-ivoire md:flex"
    >
      <span className="text-3xl leading-none transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true">←</span>
      <span className="type-micro">Précédent</span>
    </button>
  );

  const nextButton = (
    <button
      type="button"
      onClick={() => go(1)}
      aria-label="Suivant"
      className="morph-button group hidden shrink-0 flex-col items-center gap-2 border border-ivoire/20 px-3 py-4 text-ivoire/70 transition-colors duration-500 hover:border-ivoire/60 hover:text-ivoire md:flex"
    >
      <span className="text-3xl leading-none transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
      <span className="type-micro">Suivant</span>
    </button>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-encre/98 text-ivoire backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header className="shell flex shrink-0 items-center justify-between gap-6 border-b border-ivoire/15 py-4 md:py-5">
        <p className="type-index min-w-0 truncate">{piece.title}</p>
        <div className="flex shrink-0 items-center gap-5">
          <p className="type-micro tabular-nums text-ivoire/65" aria-live="polite">
            {String(index + 1).padStart(2, "0")}
            <span className="px-1 text-ivoire/30">/</span>
            {String(total).padStart(2, "0")}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer la galerie"
            className="morph-button group flex min-h-11 items-center gap-3 border border-ivoire/35 px-3 py-2 text-ivoire transition-colors duration-500 hover:border-ivoire focus-visible:outline focus-visible:outline-1 focus-visible:outline-ivoire"
          >
            <span className="relative z-10 text-lg leading-none" aria-hidden="true">×</span>
            <span className="type-micro relative z-10">Fermer</span>
          </button>
        </div>
      </header>

      <div className="shell flex min-h-0 flex-1 items-center gap-1 py-3 md:gap-4 md:py-5">
        {total > 1 && previousButton}
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
          {isVideoSrc(current) ? (
            <video
              key={current}
              src={current}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <img
              key={current}
              src={current}
              alt={`${piece.title} — ${index + 1} sur ${total}`}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
        {total > 1 && nextButton}
      </div>

      {total > 1 && (
        <>
          <div className="shell flex shrink-0 items-center justify-between border-t border-ivoire/15 py-3 md:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              className="type-micro morph-button border border-ivoire/25 px-3 py-2 text-ivoire/85"
            >
              ← Précédent
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="type-micro morph-button border border-ivoire/25 px-3 py-2 text-ivoire/85"
            >
              Suivant →
            </button>
          </div>
          <nav
            className="shell flex shrink-0 gap-2 overflow-x-auto border-t border-ivoire/15 py-3 md:py-4"
            aria-label="Choisir une image"
          >
            {piece.media.map((media, slide) => (
              <button
                key={media}
                type="button"
                onClick={() => setIndex(slide)}
                aria-label={`Diapositive ${slide + 1}`}
                aria-pressed={slide === index}
                className={`relative h-12 w-[4.5rem] shrink-0 overflow-hidden border transition-opacity duration-300 sm:h-14 sm:w-20 ${
                  slide === index
                    ? "border-ivoire opacity-100"
                    : "border-ivoire/20 opacity-55 hover:opacity-90"
                }`}
              >
                {isVideoSrc(media) ? (
                  <video
                    src={media}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={media}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                {isVideoSrc(media) && (
                  <span className="absolute inset-x-0 bottom-0 bg-encre/75 py-0.5 text-center text-[11px] leading-none text-ivoire">
                    VIDÉO
                  </span>
                )}
              </button>
            ))}
          </nav>
        </>
      )}
    </div>,
    document.body
  );
}
