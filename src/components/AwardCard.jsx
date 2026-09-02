import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import MediaReveal from "./MediaReveal";

/*
  Une récompense occupe toute la largeur : la couverture du projet à
  gauche comme seule tache d'image, le prix en grand au centre, la
  mention rejetée à droite. Rien à voir avec les lignes d'index des
  disciplines — c'est un fait, pas une liste.
*/
export default function AwardCard({
  year,
  title,
  body,
  project,
  cover,
  to,
  delay = 0,
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <Link
        to={to}
        className="colonnes group w-full items-center gap-y-5 border-t border-encre py-8 md:py-10"
      >
        {cover && (
          <MediaReveal className="col-span-6 rounded-[var(--rayon-image)] bg-ivoire-soft md:col-span-3">
            <img
              src={cover}
              alt={project}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </MediaReveal>
        )}

        <div className="col-span-16 flex flex-col gap-3 md:col-span-8 md:col-start-5">
          <h3 className="type-title max-w-[18ch] text-encre">{title}</h3>
          <span className="type-index flex items-center gap-3 text-encre/50 transition-colors duration-500 group-hover:text-encre">
            {project}
            <svg
              className="h-[9px] w-[11px] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
              viewBox="0 0 11 9"
              fill="none"
              aria-hidden
            >
              <path
                d="M0 4.5H10M10 4.5L6.5 1M10 4.5L6.5 8"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </span>
        </div>

        <div className="type-micro col-span-16 flex items-baseline gap-3 text-taupe md:col-span-3 md:col-start-14 md:flex-col md:items-end md:gap-1 md:text-right">
          <span>{body}</span>
          <span className="text-rouge">{year}</span>
        </div>
      </Link>
    </Reveal>
  );
}
