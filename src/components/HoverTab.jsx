/*
  Étiquette cliquable : pastille pleine à l'état actif, contour qui se
  pose au survol. Même rondeur que la barre du header — c'est la forme
  de référence pour tout ce qui se clique sur le site.
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
      className={`type-micro group relative inline-flex items-center justify-center whitespace-nowrap rounded-[var(--rayon-pastille)] px-4 py-2 transition-colors duration-500 ${
        active ? "text-ivoire" : "text-encre"
      } ${className}`}
      {...props}
    >
      <span
        className={`absolute inset-0 rounded-[var(--rayon-pastille)] border transition-all duration-500 ease-out ${
          active
            ? "scale-100 border-encre bg-encre opacity-100"
            : "scale-95 border-encre/25 bg-transparent opacity-0 group-hover:scale-100 group-hover:opacity-100"
        }`}
      />
      <span className="relative">{children}</span>
    </Tag>
  );
}
