import { useState } from "react";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import MediaReveal from "../components/MediaReveal";
import { getHorsCadre } from "../data/horsCadre";
import { isVideoSrc } from "../utils/media";
import { useLanguage } from "../i18n/LanguageContext";

const pieces = getHorsCadre();

/*
  Hors Cadre — la galerie personnelle. Pas de structure de cas client :
  l'image d'abord, le titre en serif, et rien d'autre. Les couvertures
  gardent leur format d'origine et se rangent en colonnes.
*/
export default function HorsCadre() {
  const [open, setOpen] = useState(null);
  const { t } = useLanguage();

  return (
    <div className="relative z-10 bg-ivoire">
      <div className="shell flex flex-col gap-12 pt-[104px] pb-32">
        <Reveal as="section" className="colonnes items-end gap-y-6 py-10">
          <h1 className="type-micro col-span-16 text-taupe md:col-span-4">
            {t("horsCadre.title")}{" "}
            <span className="text-rouge">
              ({String(pieces.length).padStart(2, "0")})
            </span>
          </h1>
          <p className="type-lede col-span-16 max-w-[38ch] text-encre/60 md:col-span-11 md:col-start-6">
            {t("horsCadre.lede")}
          </p>
        </Reveal>

        {pieces.length > 0 ? (
          <div className="columns-2 gap-[var(--gouttiere)] md:columns-3">
            {pieces.map((piece, i) => (
              <button
                key={piece.slug}
                type="button"
                onClick={() => setOpen(piece)}
                className="group mb-[var(--gouttiere)] block w-full break-inside-avoid text-left"
              >
                <MediaReveal className="rounded-[var(--rayon-image)] bg-ivoire-soft">
                  {isVideoSrc(piece.cover) ? (
                    <video
                      src={piece.cover}
                      muted
                      loop
                      playsInline
                      className="w-full"
                    />
                  ) : (
                    <img
                      src={piece.cover}
                      alt={piece.title}
                      loading={i < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full"
                    />
                  )}
                </MediaReveal>
                <p className="type-index mt-2 flex items-baseline gap-2 text-encre">
                  {piece.title}
                  {piece.media.length > 1 && (
                    <span className="type-micro ml-2 align-middle text-taupe">
                      {String(piece.media.length).padStart(2, "0")}
                    </span>
                  )}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <p className="type-lede py-16 text-encre/50">{t("horsCadre.empty")}</p>
        )}
      </div>

      {open && <Lightbox piece={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
