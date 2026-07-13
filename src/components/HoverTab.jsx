/*
  Bouton/lien texte avec un petit rectangle qui apparaît au survol
  (inspiré des boutons de monica-ellis.framer.website). Utilisé pour
  la nav du header, les filtres projets, les tags et les onglets.
*/
export default function HoverTab({
  as: Tag = "button",
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`group relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-colors duration-300 ${
        active ? "text-ivoire" : "text-encre"
      } ${className}`}
      {...props}
    >
      <span
        className={`absolute inset-0 border border-encre/20 transition-all duration-300 ease-out ${
          active
            ? "scale-100 border-encre bg-encre opacity-100"
            : "scale-90 bg-transparent opacity-0 group-hover:scale-100 group-hover:opacity-100"
        }`}
      />
      <span className="relative">{children}</span>
    </Tag>
  );
}
