import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import { highlightPulpp } from "../utils/pulpp";

/*
  Ligne d'index éditorial : numéro, titre en grand, mention, texte.
  À l'entrée, le filet se tire depuis la gauche, le titre monte depuis
  son masque et les petites mentions suivent d'un temps. Au survol, le
  titre glisse d'un cheveu — la retenue tient lieu de luxe.
*/
export default function IndexRow({
  number,
  title,
  meta,
  description,
  to,
  theme = "light",
  delay = 0,
}) {
  const dark = theme === "dark";
  const border = dark ? "bg-ivoire/15" : "bg-encre/15";
  const quiet = dark ? "text-ivoire/45" : "text-taupe";
  const loud = dark ? "text-ivoire" : "text-encre";
  const quietHover = dark ? "group-hover:text-ivoire" : "group-hover:text-encre";

  const [ref, visible] = useReveal();

  const petit = (extra) =>
    `transition-[opacity,transform] duration-[900ms] [transition-timing-function:var(--ease-quint)] ${
      visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    } ${extra}`;

  const content = (
    <div ref={ref} className="group relative w-full">
      {/* le filet se tire depuis la gauche */}
      <span
        className={`absolute inset-x-0 top-0 h-px origin-left ${border} transition-transform duration-[1100ms] [transition-timing-function:var(--ease-quint)] ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
        aria-hidden
      />

      <div className="colonnes w-full items-start gap-y-3 py-6 md:py-8">
        <span
          className={petit(
            `type-micro col-span-16 ${quiet} ${quietHover} md:col-span-1 md:mt-[0.36em]`
          )}
          style={{ transitionDelay: `${delay + 260}ms` }}
        >
          {number}
        </span>

        <h3 className={`col-span-16 md:col-span-8`}>
          <span
            className={`ligne-masque type-title ${loud} ${visible ? "is-in" : ""}`}
          >
            <span style={{ transitionDelay: `${delay + 120}ms` }}>
              <span className="inline-block transition-transform duration-700 ease-out group-hover:translate-x-1">
                {highlightPulpp(title)}
              </span>
            </span>
          </span>
        </h3>

        {meta ? (
          <span
            className={petit(`type-micro col-span-16 ${quiet} md:col-span-2 md:mt-[0.36em]`)}
            style={{ transitionDelay: `${delay + 320}ms` }}
          >
            {meta}
          </span>
        ) : (
          <span className="hidden md:col-span-2 md:block" />
        )}

        {description && (
          <p
            className={petit(
              `type-caption col-span-16 max-w-[42ch] ${quiet} md:col-span-5 md:mt-[0.22em]`
            )}
            style={{ transitionDelay: `${delay + 380}ms` }}
          >
            {highlightPulpp(description)}
          </p>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
