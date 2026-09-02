import { Link } from "react-router-dom";
import MediaReveal from "./MediaReveal";
import useReveal from "../hooks/useReveal";
import { isVideoSrc } from "../utils/media";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectCard({ project, className = "", index = 0 }) {
  const { title, year, image, slug } = project;
  const [ref, visible] = useReveal();
  const { t, path } = useLanguage();

  return (
    <Link
      ref={ref}
      to={path(`/projets/${slug}`)}
      className={`group flex w-full flex-col gap-2 ${className}`}
    >
      {/* Toutes les couvertures partagent le même rectangle 4:3 */}
      <MediaReveal
        delay={(index % 2) * 110}
        className="relative aspect-[4/3] w-full rounded-[var(--rayon-image)] bg-[#a6a6a6]"
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
