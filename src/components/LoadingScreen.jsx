import { useEffect, useState } from "react";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState("enter"); // enter -> hold -> exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 2200);
    const t2 = setTimeout(() => setPhase("exit"), 3100);
    const t3 = setTimeout(() => onDone?.(), 4050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-hidden ${
        phase === "exit" ? "pointer-events-none" : ""
      }`}
      style={{
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 950ms cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      <div className="flex h-full w-full items-center justify-center bg-ivoire">
        <div className="w-[42vw] max-w-[320px] overflow-hidden">
          <div
            style={{
              transform: phase === "enter" ? "translateY(105%)" : "translateY(0)",
              opacity: phase === "enter" ? 0 : 1,
              transition:
                "transform 1800ms cubic-bezier(0.16,1,0.3,1), opacity 1200ms ease-out",
            }}
          >
            <LogoHorizontal className="h-auto w-full text-encre" />
          </div>
        </div>
      </div>
    </div>
  );
}
