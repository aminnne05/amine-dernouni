import { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { translations } from "./translations";

const LanguageContext = createContext({
  lang: "fr",
  t: (key) => key,
  path: (p) => p,
});

function getFromDict(dict, key) {
  return key.split(".").reduce((node, part) => node?.[part], dict);
}

export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";

  const value = useMemo(() => {
    const dict = translations[lang];
    const t = (key) => getFromDict(dict, key) ?? getFromDict(translations.fr, key) ?? key;
    const path = (p) => {
      if (lang !== "en") return p;
      return p === "/" ? "/en" : `/en${p}`;
    };
    return { lang, t, path };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
