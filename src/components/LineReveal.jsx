import useReveal from "../hooks/useReveal";

/*
  Chaque ligne monte depuis son masque, l'une après l'autre. Le texte
  est découpé à la main (tableau de lignes) pour garder la maîtrise des
  césures : c'est une décision de composition, pas un calcul.
*/
export default function LineReveal({
  lines = [],
  stagger = 90,
  delay = 0,
  className = "",
}) {
  const [ref, visible] = useReveal();

  return (
    <span ref={ref} className="block">
      {lines.map((line, i) => (
        <span
          key={i}
          className={`ligne-masque ${visible ? "is-in" : ""} ${className}`}
        >
          <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
