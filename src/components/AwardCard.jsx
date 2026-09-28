import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function AwardCard({
  year,
  title,
  body,
  project,
  to,
  delay = 0,
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <Link
        to={to}
        className="group grid w-full grid-cols-[minmax(0,1fr)_44px] items-start gap-x-4 gap-y-4 border-t border-encre/20 py-7 transition-[padding,background-color] duration-500 hover:bg-encre/[0.035] md:grid-cols-[10%_minmax(0,1fr)_minmax(12rem,27%)_44px] md:gap-x-5 md:py-9 md:hover:px-3"
      >
        <span className="type-index col-span-1 text-encre/45 md:pt-1">{year}</span>
        <h3 className="type-subtitle col-span-1 col-start-1 max-w-[27ch] text-encre transition-transform duration-500 ease-out group-hover:translate-x-1 md:col-start-2">
          {title}
        </h3>
        <div className="type-index col-span-1 col-start-1 flex flex-col gap-1 text-encre/70 md:col-start-3 md:pt-1">
          <span>{body}</span>
          <span className="text-encre/45">{project}</span>
        </div>
        <span className="col-start-2 row-start-1 flex h-10 w-10 items-center justify-center rounded-[8px] border border-encre/20 text-encre transition-[background-color,color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-encre group-hover:text-ivoire md:col-start-4" aria-hidden="true">
          ↗
        </span>
      </Link>
    </Reveal>
  );
}
