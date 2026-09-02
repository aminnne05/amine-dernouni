import { useCallback, useEffect, useState } from "react";
import { isVideoSrc } from "../utils/media";

/*
  Vue plein écran d'une pièce : on avance dans la série au clic, aux
  flèches ou au clavier, on ferme avec Échap ou la croix. Aucun texte
  en dehors du titre et du compteur.
*/
export default function Lightbox({ piece, onClose }) {
  const [index, setIndex] = useState(0);
  const total = piece?.media.length ?? 0;

  const go = useCallback(
    (step) => setIndex((i) => (i + step + total) % total),
    [total]
  );

  useEffect(() => {
    setIndex(0);
  }, [piece]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  if (!piece) return null;
  const current = piece.media[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-encre/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
    >
      {/* barre : titre à gauche, compteur et fermeture à droite */}
      <div className="shell flex shrink-0 items-center justify-between gap-6 pt-6 pb-4">
        <p className="type-index text-ivoire">
          {piece.title}
        </p>
        <div className="flex items-center gap-6">
          {total > 1 && (
            <p className="type-micro text-ivoire/45">
              {String(index + 1).padStart(2, "0")}
              <span className="text-ivoire/25"> / </span>
              {String(total).padStart(2, "0")}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--rayon-pastille)] border border-ivoire/25 text-ivoire transition-colors duration-500 hover:border-ivoire"
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* le visuel */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--marge)] pb-6">
        {isVideoSrc(current) ? (
          <video
            key={current}
            src={current}
            controls
            autoPlay
            loop
            playsInline
            className="max-h-full max-w-full rounded-[var(--rayon-image)] object-contain"
          />
        ) : (
          <img
            key={current}
            src={current}
            alt={piece.title}
            className="max-h-full max-w-full rounded-[var(--rayon-image)] object-contain"
          />
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Précédent"
              className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize"
            />
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Suivant"
              className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize"
            />
          </>
        )}
      </div>

      {/* pellicule */}
      {total > 1 && (
        <div className="shell flex shrink-0 gap-2 overflow-x-auto pb-6">
          {piece.media.map((media, i) => (
            <button
              key={media}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-[var(--rayon-image)] border transition-opacity duration-500 ${
                i === index
                  ? "border-ivoire opacity-100"
                  : "border-transparent opacity-40 hover:opacity-80"
              }`}
            >
              {isVideoSrc(media) ? (
                <video src={media} muted playsInline className="h-full w-full object-cover" />
              ) : (
                <img
                  src={media}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
