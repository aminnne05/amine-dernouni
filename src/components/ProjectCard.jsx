import { Link } from "react-router-dom";
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
      className={`group flex w-full flex-col gap-2 transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${(index % 4) * 80}ms` : "0ms" }}
    >
      {/* Toutes les couvertures partagent le même rectangle 4:3 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#a6a6a6]">
        {image ? (
          isVideoSrc(image) ? (
            <video
              src={image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-light text-white/60">
            {t("projectDetail.comingSoon")}
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-baseline gap-3">
        <span className="type-micro text-taupe">
          {`N.${String(index + 1).padStart(2, "0")}`}
        </span>
        <span className="type-index text-encre">{title}</span>
        <span className="type-micro ml-auto text-taupe">{year}</span>
      </div>
    </Link>
  );
}
