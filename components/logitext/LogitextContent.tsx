"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { LogitextNavbar } from "@/components/logitext/LogitextNavbar";
import { AppPreview } from "@/components/logitext/AppPreview";
import { HowItWorks } from "@/components/logitext/HowItWorks";
import { LogitextModal } from "@/components/logitext/LogitextModal";
import { LanguageProvider, useLanguage, t } from "@/lib/i18n";
import {
  XCircle,
  DollarSign,
  UserX,
  ShieldAlert,
  Zap,
  Heart,
  Settings,
  Variable,
  CheckCircle,
  BarChart3,
  LayoutTemplate,
  Clock,
  Code,
} from "lucide-react";

const HERO_STEPS: Array<
  "csv" | "compose" | "crm" | "crm-hover" | "crm-edit" | "sending" | "done"
> = ["csv", "compose", "crm", "crm-hover", "crm-edit", "sending", "done"];

const LogitextContentInner: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroStepIndex, setHeroStepIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroStepIndex((prev) => (prev + 1) % HERO_STEPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-logitext-bg text-white selection:bg-logitext-primary/30 font-sans">
      <LogitextNavbar onOpenModal={openModal} onToggleLang={toggleLang} />
      <LogitextModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none will-change-transform">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-logitext-primary/20 rounded-full blur-[40px] md:blur-[120px] will-change-transform" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-logitext-purple/20 rounded-full blur-[40px] md:blur-[120px] will-change-transform" />
          <div className="absolute bottom-0 left-[20%] w-[60%] h-[30%] bg-blue-500/10 rounded-full blur-[30px] md:blur-[100px] will-change-transform" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t("hero", "badge", lang)}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              {t("hero", "title1", lang)}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-logitext-primary to-logitext-purple">
                {t("hero", "titleHighlight", lang)}
              </span>{" "}
              {t("hero", "title2", lang)}
            </h1>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              {t("hero", "subtitle", lang)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-gradient-to-r from-logitext-primary to-blue-600 hover:to-blue-500 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_40px_rgba(10,132,255,0.5)] transition-all transform hover:-translate-y-1"
              >
                {t("hero", "cta", lang)}
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white font-medium text-lg transition-all backdrop-blur-sm text-center"
              >
                {t("hero", "demo", lang)}
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#0D0D0D]"
                  />
                ))}
              </div>
              <p>{t("hero", "trusted", lang)}</p>
            </div>
          </div>

          <div
            ref={heroRef}
            className="relative z-10 lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-logitext-primary/10 to-transparent blur-xl md:blur-3xl -z-10 will-change-transform" />
            <div
              className="relative w-full max-w-lg"
              style={{ perspective: "1200px" }}
            >
              <div
                className="absolute top-1/2 left-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[60px] rounded-full -z-10 transition-all duration-300 ease-out"
                style={{
                  transform: `translate(calc(-50% + ${mousePos.x * 8}px), calc(-50% + ${mousePos.y * 8}px))`,
                }}
              />
              <div
                className="transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 3}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <AppPreview
                  step={HERO_STEPS[heroStepIndex]}
                  className="w-full shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 relative bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              {t("problem", "title", lang)}
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t("problem", "subtitle", lang)}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: DollarSign, color: "red", key: "expensive" },
              { icon: Settings, color: "orange", key: "complex" },
              { icon: UserX, color: "yellow", key: "noPersonalization" },
              { icon: ShieldAlert, color: "purple", key: "deliverability" },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-white/10 transition-colors"
              >
                <div
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-2 md:mb-4`}
                >
                  <item.icon className={`text-${item.color}-400`} size={16} />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">
                  {t("problem", `${item.key}.title`, lang)}
                </h3>
                <p className="text-[10px] md:text-sm text-gray-500 leading-relaxed">
                  {t("problem", `${item.key}.desc`, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {t("solution", "title", lang)}
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t("solution", "subtitle", lang)}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {[
              { icon: Zap, color: "green", key: "free" },
              { icon: Heart, color: "pink", key: "personal" },
              { icon: Settings, color: "blue", key: "simple" },
              { icon: Variable, color: "purple", key: "personalized" },
              { icon: CheckCircle, color: "emerald", key: "validated" },
              { icon: BarChart3, color: "cyan", key: "tracked" },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-white/[0.03] border border-white/5 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
              >
                <div
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className={`text-${item.color}-400`} size={16} />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">
                  {t("solution", `${item.key}.title`, lang)}
                </h3>
                <p className="text-[10px] md:text-sm text-gray-500 leading-relaxed">
                  {t("solution", `${item.key}.desc`, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Coming Soon Section */}
      <section
        id="coming-soon"
        className="py-16 md:py-24 bg-[#121212] relative"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              {t("comingSoon", "title", lang)}
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t("comingSoon", "subtitle", lang)}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: BarChart3, key: "analytics" },
              { icon: LayoutTemplate, key: "templates" },
              { icon: Clock, key: "scheduling" },
              { icon: Code, key: "api" },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-white/[0.02] border border-dashed border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 text-center opacity-60 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <item.icon className="text-gray-400" size={16} />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">
                  {t("comingSoon", `${item.key}.title`, lang)}
                </h3>
                <p className="text-[10px] md:text-sm text-gray-500">
                  {t("comingSoon", `${item.key}.desc`, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-logitext-primary/20 to-logitext-purple/20 blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-4 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("cta", "title", lang)}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("cta", "subtitle", lang)}
          </p>
          <button
            onClick={openModal}
            className="px-8 py-4 bg-gradient-to-r from-logitext-primary to-blue-600 hover:to-blue-500 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_40px_rgba(10,132,255,0.5)] transition-all transform hover:-translate-y-1"
          >
            {t("cta", "button", lang)}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} LogiText.{" "}
            {t("footer", "rights", lang)}
          </p>
        </div>
      </footer>
    </main>
  );
};

export const LogitextContent: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-logitext-bg" />}>
      <LanguageProvider>
        <LogitextContentInner />
      </LanguageProvider>
    </Suspense>
  );
};
