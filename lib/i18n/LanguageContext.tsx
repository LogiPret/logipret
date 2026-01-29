"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { Language } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    // Check URL param first
    const urlLang = searchParams.get("lang");
    if (urlLang === "en" || urlLang === "fr") {
      setLangState(urlLang);
      return;
    }

    // Check localStorage
    const stored = localStorage.getItem("logitext-lang");
    if (stored === "en" || stored === "fr") {
      setLangState(stored);
      return;
    }

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) {
      setLangState("en");
    }
  }, [searchParams]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("logitext-lang", newLang);
  };

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
