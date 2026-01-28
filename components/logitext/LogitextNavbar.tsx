"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Coming Soon", href: "#coming-soon" },
];

export const LogitextNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
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
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA & Language */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            FR
          </button>
          <button className="bg-logitext-primary hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_30px_rgba(10,132,255,0.5)]">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-logitext-surface border-b border-white/10 shadow-xl md:hidden p-6 flex flex-col gap-4 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-lg font-medium text-white py-2 border-b border-white/10"
            >
              {item.label}
            </a>
          ))}
          <button className="bg-logitext-primary w-full py-3 rounded-lg text-white font-bold mt-4">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};
