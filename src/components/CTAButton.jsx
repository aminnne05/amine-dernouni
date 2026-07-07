export default function CTAButton({ children, variant = "black", href = "#", className = "" }) {
  const textColor = variant === "white" ? "text-ivoire" : "text-encre-soft";
  const lineColor = variant === "white" ? "bg-ivoire" : "bg-encre-soft";

  return (
    <a
      href={href}
      className={`group inline-flex flex-col items-start justify-center px-1 ${className}`}
    >
      <span className="flex items-center gap-2 py-1">
        <span
          className={`text-xs font-medium tracking-[1.4px] whitespace-nowrap ${textColor}`}
        >
          {children}
        </span>
        <svg
          className={`h-[8px] w-[10px] transition-transform group-hover:translate-x-1 ${textColor}`}
          viewBox="0 0 11 9"
          fill="none"
        >
          <path
            d="M0 4.5H10M10 4.5L6.5 1M10 4.5L6.5 8"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </span>
      <span className={`h-px w-full ${lineColor}`} />
    </a>
  );
}
