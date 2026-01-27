"use client";

import React, { useState } from "react";
import { QuoteModal } from "./QuoteModal";

export const Hero: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-6 border-b border-white">
      <div className="max-w-[1800px] mx-auto w-full py-24 md:py-0">
        {/* Label */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-12 bg-white"></div>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/80">
            Logiprêt Inc. &copy; 2025
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-[2.5rem] leading-[0.9] sm:text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter md:leading-[0.85] text-white mb-12 uppercase">
          La croissance
          <br />
          des courtiers,
          <br />
          <span className="text-black drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            industrialisée.
          </span>
        </h1>

        {/* Subtext & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white pt-8">
          <div className="md:col-span-5 lg:col-span-5">
            <p className="text-base sm:text-lg md:text-2xl font-medium leading-snug md:leading-tight text-white/90">
              Nous déployons des systèmes mesurables qui génèrent de la demande,
              structurent vos ventes et maximisent votre territoire.
            </p>
            {/* Quote Button */}
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="mt-6 bg-white text-brand-blue font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Obtenir une soumission
            </button>
          </div>
          <div className="md:col-span-7 lg:col-span-7 flex flex-col md:flex-row items-end md:items-center justify-end gap-6">
            <div className="font-mono text-xs max-w-[200px] text-right hidden md:block text-white/70">
              DÉFILEZ POUR
              <br />
              DÉCOUVRIR NOS CAPACITÉS
            </div>
            <div className="w-6 h-6 border-r-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Centered Scroll Arrow */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-70 transition-all hover:scale-110 animate-bounce"
        aria-label="Scroll to services"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12L16 20L24 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </button>
    </section>
  );
};
