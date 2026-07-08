import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import { isVideoSrc } from "../utils/media";

export default function ProjectCard({
  project,
  className = "",
  index = 0,
  fixedHeight = false,
}) {
  const { title, year, image, slug, tall } = project;
  const [ref, visible] = useReveal();

  return (
    <Link
      ref={ref}
      to={`/projets/${slug}`}
      className={`group flex flex-col gap-1 transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${fixedHeight ? "" : "w-full"} ${tall ? "h-[421px]" : "h-[300px]"} ${fixedHeight ? "" : "sm:h-full"} ${className}`}
      style={{ transitionDelay: visible ? `${(index % 4) * 80}ms` : "0ms" }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#a6a6a6]">
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
            visuel à venir
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center justify-between">
        <span className="text-sm font-medium text-encre">{title}</span>
        <span className="text-xs font-normal text-taupe">{year}</span>
      </div>
    </Link>
  );
}
