"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useLanguage, t } from "@/lib/i18n";

interface LogitextNavbarProps {
  onOpenModal?: () => void;
  onToggleLang?: () => void;
}

export const LogitextNavbar: React.FC<LogitextNavbarProps> = ({
  onOpenModal,
  onToggleLang,
}) => {
  const { lang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInHowItWorks, setIsInHowItWorks] = useState(false);

  const navItems = [
    { labelKey: "features", href: "#features" },
    { labelKey: "howItWorks", href: "#how-it-works" },
    { labelKey: "comingSoon", href: "#coming-soon" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check if we're in the how-it-works section on mobile
      const howItWorksSection = document.getElementById("how-it-works");
      if (howItWorksSection && window.innerWidth < 768) {
        const rect = howItWorksSection.getBoundingClientRect();
        const inSection =
          rect.top < 100 && rect.bottom > window.innerHeight * 0.3;
        setIsInHowItWorks(inSection);
      } else {
        setIsInHowItWorks(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      // Offset for fixed navbar
      const navbarHeight = 80;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar - Full */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b hidden md:block ${
          isScrolled
            ? "bg-logitext-bg/70 backdrop-blur-xl border-white/10 py-3 md:py-4 shadow-lg"
            : "bg-transparent border-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/logitext"
            className="text-2xl font-bold text-white tracking-tight"
          >
            Logi<span className="text-logitext-primary">Text</span>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.labelKey}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {t("nav", item.labelKey, lang)}
              </a>
            ))}
          </div>

          {/* CTA & Language */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLang}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              onClick={onOpenModal}
              className="bg-logitext-primary hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_30px_rgba(10,132,255,0.5)]"
            >
              {t("nav", "getStarted", lang)}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile - Logo only, sticky after scroll - hidden in HowItWorks */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden ${
          isScrolled && !isInHowItWorks
            ? "bg-[#0D0D0D]/95 backdrop-blur-xl py-2 shadow-lg opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="px-4">
          <Link
            href="/logitext"
            className="text-lg font-bold text-white tracking-tight"
          >
            Logi<span className="text-logitext-primary">Text</span>
          </Link>
        </div>
      </div>

      {/* Mobile - Initial navbar in hero (not fixed) */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-40 py-4 px-4">
        <Link
          href="/logitext"
          className="text-2xl font-bold text-white tracking-tight"
        >
          Logi<span className="text-logitext-primary">Text</span>
        </Link>
      </div>
    </>
  );
};
