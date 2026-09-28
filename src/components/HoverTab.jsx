/* One quiet filter control, sized and shaped like the main buttons. */
export default function HoverTab({
  as: Tag = "button",
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`type-micro morph-button inline-flex min-h-10 items-center justify-center whitespace-nowrap border px-4 py-2 ${
        active
          ? "morph-button--grey border-transparent"
          : "border-encre/20 bg-transparent text-encre/70 hover:border-encre hover:bg-encre hover:text-ivoire"
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
