export default function CTAButton({
  children,
  variant = "black",
  href = "#",
  className = "",
}) {
  const dark = variant === "white";
  const tone = dark
    ? "border-ivoire/30 text-ivoire hover:border-ivoire"
    : "border-encre/25 text-encre hover:border-encre";

  return (
    <a
      href={href}
      className={`type-micro group inline-flex items-center gap-2 rounded-[var(--rayon-pastille)] border px-4 py-2.5 transition-colors duration-500 ${tone} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <svg
        className="h-[8px] w-[10px] transition-transform duration-500 ease-out group-hover:translate-x-1"
        viewBox="0 0 11 9"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 4.5H10M10 4.5L6.5 1M10 4.5L6.5 8"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </a>
  );
}
