import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MediaReveal from "./MediaReveal";
import useReveal from "../hooks/useReveal";
import { isVideoSrc } from "../utils/media";
import { createPreviewOrder } from "../utils/previewOrder";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectCard({ project, className = "", index = 0 }) {
  const { title, year, image, gallery = [], slug } = project;
  const [ref, visible] = useReveal();
  const { t, path } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const previewImages = useMemo(
    () => [...new Set(gallery.flat().filter((src) => src && !isVideoSrc(src)))],
    [gallery]
  );
  const [slides, setSlides] = useState(() => createPreviewOrder(previewImages));

  const startSlideshow = (event) => {
    if (event?.pointerType === "touch" || previewImages.length < 2) return;
    setSlides(createPreviewOrder(previewImages));
    setSlideIndex(0);
    setHovered(true);
  };

  useEffect(() => {
    if (
      !hovered ||
      slides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 700);
    return () => window.clearInterval(timer);
  }, [hovered, slides.length]);

  const stopSlideshow = () => {
    setHovered(false);
    setSlideIndex(0);
  };

  return (
    <Link
      ref={ref}
      to={path(`/projets/${slug}`)}
      className={`group flex w-full flex-col gap-2 ${className}`}
      onPointerEnter={startSlideshow}
      onPointerLeave={stopSlideshow}
      onFocus={startSlideshow}
      onBlur={stopSlideshow}
    >
      {/* Toutes les couvertures partagent le même rectangle 4:3 */}
      <MediaReveal
        delay={(index % 2) * 110}
        glisse={index % 2 === 0}
        className="relative aspect-[4/3] w-full bg-[#a6a6a6]"
      >
        {image ? (
          isVideoSrc(image) ? (
            <video
              src={image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : (
          <div className="type-micro absolute inset-0 flex items-center justify-center text-white/60">
            {t("projectDetail.comingSoon")}
          </div>
        )}
        {slides.length > 1 && slides.map((src, slide) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[260ms] ease-out ${
              hovered && slide === slideIndex ? "z-10 opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </MediaReveal>
      <div
        className={`flex shrink-0 items-baseline gap-3 transition-[opacity,transform] duration-[900ms] [transition-timing-function:var(--ease-quint)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: `${(index % 2) * 110 + 380}ms` }}
      >
        <span className="type-micro text-taupe">
          {`N.${String(index + 1).padStart(2, "0")}`}
        </span>
        <span className="type-index text-encre">{title}</span>
        <span className="type-micro ml-auto text-taupe">{year}</span>
      </div>
    </Link>
  );
}
