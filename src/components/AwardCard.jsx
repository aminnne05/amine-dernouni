import { Link } from "react-router-dom";
import Reveal from "./Reveal";

/*
  Une récompense : le titre du prix en grand, le projet juste dessous
  comme second temps fort. L'année et l'organisme restent en petites
  capitales, en mention.
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
      <Link to={to} className="group flex flex-col gap-5 border-t border-encre pt-5">
        <span className="type-micro flex items-baseline justify-between gap-4 text-taupe">
          <span>{body}</span>
          <span>{year}</span>
        </span>

        <h3 className="type-title max-w-[16ch] text-encre">{title}</h3>

        <span className="type-lede flex items-center gap-3 text-encre/50 transition-colors duration-500 group-hover:text-encre">
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
      </Link>
    </Reveal>
  );
}
