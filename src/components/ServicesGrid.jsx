import { useId, useState } from "react";
import Reveal from "./Reveal";

export default function ServicesGrid({
  title,
  intro,
  items,
  theme = "light",
  className = "",
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const idPrefix = useId().replace(/:/g, "");
  const dark = theme === "dark";
  const soft = theme === "soft";
  const strong = dark ? "text-ivoire" : "text-encre";
  const quiet = dark ? "text-ivoire/70" : "text-encre/70";
  const faint = dark ? "text-ivoire/45" : "text-encre/45";
  const border = dark ? "border-ivoire/18" : "border-encre/20";

  return (
    <Reveal
      as="section"
      className={`${dark ? "bg-encre" : soft ? "bg-ivoire-soft" : "bg-ivoire"} ${className}`}
    >
      <div className="shell flex flex-col section-gap">
        <div className="colonnes items-start gap-y-6">
          <h2 className={`type-title col-span-16 md:col-span-5 ${strong}`}>{title}</h2>
          {intro && (
            <p className={`type-lede col-span-16 max-w-[36ch] md:col-span-7 md:col-start-10 ${quiet}`}>
              {intro}
            </p>
          )}
        </div>

        <div className={`border-b ${border}`}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${idPrefix}-panel-${index}`;
            const triggerId = `${idPrefix}-trigger-${index}`;
            const points = item.deliverables ?? item.points ?? [];
            const description = item.description ?? item.text;

            return (
              <article key={item.title} className={`border-t ${border}`}>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-x-3 py-6 text-left md:colonnes md:py-8"
                >
                  <span className={`type-micro col-start-1 ${faint}`} aria-hidden="true">
                    {item.number ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`type-subtitle col-start-2 transition-transform duration-500 ease-out group-hover:translate-x-1 md:col-span-10 md:col-start-3 ${strong}`}>
                    {item.title}
                  </h3>
                  <span
                    className={`col-start-3 flex h-9 w-9 items-center justify-center justify-self-end rounded-[8px] border transition-transform duration-500 md:col-start-16 ${
                      dark
                        ? "border-ivoire/25 text-ivoire"
                        : "border-encre/20 text-encre"
                    } ${isOpen ? "rotate-45" : "group-hover:rotate-90"}`}
                    aria-hidden="true"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path d="M6 0V12M0 6H12" stroke="currentColor" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-700 [transition-timing-function:var(--ease-quint)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pl-[3.25rem] md:colonnes md:pb-10 md:pl-0">
                      <p className={`type-body max-w-[42ch] md:col-span-6 md:col-start-3 ${quiet}`}>
                        {description}
                      </p>

                      {points.length > 0 && (
                        <ul className={`mt-6 flex flex-col md:col-span-6 md:col-start-11 md:mt-0 ${strong}`}>
                          {points.map((point) => (
                            <li
                              key={point}
                              className={`type-caption grid grid-cols-[1rem_minmax(0,1fr)] gap-2 border-t py-2.5 first:border-t-0 first:pt-0 ${border}`}
                            >
                              <span aria-hidden="true">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
