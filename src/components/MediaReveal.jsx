import useReveal from "../hooks/useReveal";

/*
  Cadre qui se dévoile par le bas, l'image revenant à sa taille pendant
  l'ouverture. `glisse` ajoute le léger glissement au défilement, réservé
  aux grands visuels.
*/
export default function MediaReveal({
  children,
  className = "",
  delay = 0,
  glisse = false,
}) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`devoile overflow-hidden ${glisse ? "glisse" : ""} ${
        visible ? "is-in" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
