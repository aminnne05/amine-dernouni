import { useEffect, useState } from "react";
import { getClientLogos } from "../data/mediaLoader";

const logos = getClientLogos();
const slotCount = Math.min(5, logos.length);
const opticalSizes = {
  "01.svg": { maxHeight: "2.1rem", maxWidth: "90%" },
  "03.svg": { maxHeight: "3rem", maxWidth: "78%" },
  "05.svg": { maxHeight: "3.2rem", maxWidth: "76%" },
  "066.svg": { maxHeight: "3.4rem", maxWidth: "64%" },
  "07.svg": { maxHeight: "3rem", maxWidth: "82%" },
  "08.svg": { maxHeight: "2.6rem", maxWidth: "90%" },
  "09.svg": { maxHeight: "2.6rem", maxWidth: "90%" },
  "10.svg": { maxHeight: "2.7rem", maxWidth: "88%" },
  "11.svg": { maxHeight: "2.8rem", maxWidth: "88%" },
};

export default function ClientLogoStrip({ title }) {
  const [visible, setVisible] = useState(() => logos.slice(0, slotCount));

  useEffect(() => {
    if (logos.length <= slotCount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setVisible((current) => {
        const available = logos.filter(
          (logo) => !current.some((shown) => shown.filename === logo.filename)
        );
        if (available.length === 0) return current;

        const slot = Math.floor(Math.random() * current.length);
        const replacement = available[Math.floor(Math.random() * available.length)];
        return current.map((logo, index) => (index === slot ? replacement : logo));
      });
    }, 1500);

    return () => window.clearInterval(timer);
  }, []);

  if (visible.length === 0) return null;

  return (
    <section className="shell flex flex-col gap-8 md:gap-12" aria-label={title}>
      <h2 className="type-title text-encre">{title}</h2>
      <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-3 md:grid-cols-5">
        {visible.map((logo, index) => (
          <div
            key={`${index}-${logo.filename}`}
            className="flex min-h-[4.5rem] items-center justify-center py-3 md:min-h-24"
          >
            <img
              key={logo.filename}
              src={logo.src}
              alt=""
              aria-hidden="true"
              className="logo-swap object-contain"
              style={opticalSizes[logo.filename] ?? { maxHeight: "2.8rem", maxWidth: "84%" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
