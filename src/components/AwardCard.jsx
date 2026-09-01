import { Link } from "react-router-dom";
import Reveal from "./Reveal";

/*
  Une distinction : l'année en grand chiffre comme événement visuel,
  le reste en petites capitales. Volontairement plus posé et plus rare
  que les lignes d'index des disciplines.
*/
export default function AwardCard({
  year,
  title,
  body,
  project,
  to,
  delay = 0,
  className = "",
}) {
  return (
    <Reveal delay={delay} className={`col-span-16 md:col-span-7 ${className}`}>
      <Link to={to} className="group flex flex-col gap-6 border-t border-encre pt-6">
        <span className="type-micro text-taupe">{body}</span>

        <span className="type-display block text-encre">{year}</span>

        <span className="type-index max-w-[24ch] text-encre">{title}</span>

        <span className="type-micro mt-2 flex items-center gap-2 text-taupe transition-colors duration-500 group-hover:text-encre">
          {project}
          <svg
            className="h-[7px] w-[9px] transition-transform duration-500 ease-out group-hover:translate-x-1"
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
      </Link>
    </Reveal>
  );
}
