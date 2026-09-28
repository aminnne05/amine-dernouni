import { Link } from "react-router-dom";

export default function CTAButton({
  children,
  href = "#",
  className = "",
}) {
  const internal = href.startsWith("/");
  const Tag = internal ? Link : "a";

  return (
    <Tag
      {...(internal ? { to: href } : { href })}
      className={`type-micro morph-button morph-button--grey direct-button group inline-flex min-h-11 items-center gap-3 px-5 py-3 ${className}`}
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
    </Tag>
  );
}
