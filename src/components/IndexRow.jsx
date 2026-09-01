import { Link } from "react-router-dom";
import Reveal from "./Reveal";

/*
  Ligne d'index éditorial : numéro, titre en grand, mention, texte.
  Tout est lisible d'un coup — pas d'encart au survol. Le survol se
  contente d'éclaircir la mention et de faire glisser le titre d'un
  cheveu ; la retenue tient lieu de luxe.
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
  const border = dark ? "border-ivoire/15" : "border-encre/15";
  const quiet = dark ? "text-ivoire/45" : "text-taupe";
  const loud = dark ? "text-ivoire" : "text-encre";
  const quietHover = dark
    ? "group-hover:text-ivoire"
    : "group-hover:text-encre";

  const content = (
    <div
      className={`colonnes group w-full items-baseline gap-y-3 border-t ${border} py-6 md:py-8`}
    >
      <span
        className={`type-micro col-span-16 ${quiet} ${quietHover} transition-colors duration-500 md:col-span-1`}
      >
        {number}
      </span>

      <h3
        className={`type-title col-span-16 ${loud} transition-transform duration-700 ease-out group-hover:translate-x-1 md:col-span-8`}
      >
        {title}
      </h3>

      {meta ? (
        <span className={`type-micro col-span-16 ${quiet} md:col-span-2`}>
          {meta}
        </span>
      ) : (
        <span className="hidden md:col-span-2 md:block" />
      )}

      {description && (
        <p className={`type-caption col-span-16 max-w-[42ch] ${quiet} md:col-span-5`}>
          {description}
        </p>
      )}
    </div>
  );

  return (
    <Reveal delay={delay} className="w-full">
      {to ? (
        <Link to={to} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </Reveal>
  );
}
