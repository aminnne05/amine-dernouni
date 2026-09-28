import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function HorizontalCollaboration({ title, intro, items }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressLine = progressRef.current;
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let maxX = 0;

    const syncIndicator = (progress) => {
      progressLine.style.transform = `scaleX(${progress})`;
      const next = Math.min(items.length - 1, Math.round(progress * (items.length - 1)));
      setActive((current) => (current === next ? current : next));
    };

    const update = () => {
      frame = 0;
      if (!desktop.matches || reduced.matches) return;

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      track.style.transform = `translate3d(${-maxX * progress}px, 0, 0)`;
      syncIndicator(progress);
    };

    const updateManualRail = () => {
      if (desktop.matches && !reduced.matches) return;
      const distance = Math.max(1, track.scrollWidth - track.clientWidth);
      syncIndicator(Math.min(1, Math.max(0, track.scrollLeft / distance)));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const measure = () => {
      if (!desktop.matches || reduced.matches) {
        section.style.height = "";
        track.style.transform = "";
        progressLine.style.transform = "scaleX(0)";
        setActive(0);
        return;
      }

      maxX = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `calc(100vh + ${maxX}px)`;
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    track.addEventListener("scroll", updateManualRail, { passive: true });
    desktop.addEventListener("change", measure);
    reduced.addEventListener("change", measure);
    measure();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      track.removeEventListener("scroll", updateManualRail);
      desktop.removeEventListener("change", measure);
      reduced.removeEventListener("change", measure);
      section.style.height = "";
      track.style.transform = "";
    };
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-encre/15 bg-ivoire md:min-h-screen"
    >
      <div className="collab-sticky-shell flex flex-col md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <Reveal className="shell grid shrink-0 grid-cols-1 gap-7 pt-[clamp(5.5rem,8vw,8rem)] pb-[clamp(3rem,5vw,5rem)] md:colonnes">
          <h2 className="type-title md:col-span-5">{title}</h2>
          <p className="type-lede max-w-[38ch] text-encre/70 md:col-span-7 md:col-start-9">
            {intro}
          </p>
          <div className="flex items-center gap-4 md:col-span-7 md:col-start-9">
            <span className="type-micro tabular-nums text-encre/55">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-encre/15">
              <span
                ref={progressRef}
                className="absolute inset-0 origin-left scale-x-0 bg-encre transition-transform duration-150"
              />
            </span>
          </div>
        </Reveal>

        <div className="min-h-0 border-t border-encre/15 md:flex-1">
          <div
            ref={trackRef}
            tabIndex="0"
            aria-label={title}
            className="collab-track no-scrollbar flex w-max min-w-full snap-x snap-mandatory overflow-x-auto md:h-full md:overflow-visible md:will-change-transform"
          >
            {items.map((item) => (
              <article
                key={item.number}
                className="collab-panel flex min-h-[25rem] w-[88vw] shrink-0 snap-start flex-col border-r border-encre/15 px-[var(--marge)] py-8 md:h-full md:min-h-0 md:w-[48vw] md:py-[clamp(2.5rem,4vw,4.5rem)]"
              >
                <span className="type-index text-encre/45">{item.number}.</span>

                <div className="my-auto grid gap-5 md:grid-cols-8 md:items-start md:gap-x-[var(--gouttiere)]">
                  <h3 className="type-title md:col-span-3">{item.who}</h3>
                  <p className="type-body max-w-[34ch] text-encre/65 md:col-span-5">
                    {item.text}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-x-5 gap-y-1 border-t border-encre/15 pt-5">
                  {item.tags?.map((tag) => (
                    <li key={tag} className="type-caption text-encre/55">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
