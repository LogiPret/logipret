"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppPreview } from "./AppPreview";
import { Upload, MessageSquare, Send, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    id: "csv",
    title: "1. Importez vos contacts",
    description:
      "Glissez votre fichier CSV. LogiText détecte automatiquement les colonnes et nettoie les numéros de téléphone.",
    icon: Upload,
  },
  {
    id: "compose",
    title: "2. Rédigez votre message",
    description:
      "Créez des messages personnalisés avec des variables dynamiques comme [Prénom], [Date] ou [Entreprise].",
    icon: MessageSquare,
  },
  {
    id: "crm",
    title: "3. Validez la liste",
    description:
      "Vérifiez chaque contact dans le CRM intégré. Filtrez les numéros invalides ou incomplets avant l'envoi.",
    icon: Users,
  },
  {
    id: "sending",
    title: "4. Suivez l'envoi",
    description:
      "Visualisez la progression en temps réel. Le système optimise le débit pour garantir la délivérabilité.",
    icon: Send,
  },
  {
    id: "done",
    title: "5. Bilan complet",
    description:
      "Obtenez un rapport détaillé une fois la campagne terminée. Voyez qui a reçu le message et les erreurs éventuelles.",
    icon: CheckCircle,
  },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<
    "csv" | "compose" | "crm" | "sending" | "done"
  >("csv");
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const { top, bottom } = ref.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;

          if (
            scrollPosition >= absoluteTop &&
            scrollPosition < absoluteBottom
          ) {
            const stepId = steps[index].id as
              | "csv"
              | "compose"
              | "crm"
              | "sending"
              | "done";
            if (activeStep !== stepId) {
              setActiveStep(stepId);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeStep]);

  return (
    <section
      id="how-it-works"
      className="py-24 bg-logitext-bg relative"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
            Une interface intuitive
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Conçu pour être simple, rapide et efficace. Aucune formation
            nécessaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text Steps */}
          <div className="space-y-[20vh] py-[10vh]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el: any) => (stepRefs.current[index] = el)}
                className={`transition-all duration-500 p-8 rounded-2xl border backdrop-blur-sm ${
                  activeStep === step.id
                    ? "bg-white/5 border-blue-500/50 opacity-100 scale-100 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                    : "bg-transparent border-transparent opacity-30 scale-95 grayscale"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      activeStep === step.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    <step.icon size={24} />
                  </div>
                  <h3
                    className={`text-2xl font-bold ${activeStep === step.id ? "text-white" : "text-gray-500"}`}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-400 leading-relaxed pl-16">
                  {step.description}
                </p>

                {/* Mobile Preview - Visible only on small screens */}
                <div className="mt-8 lg:hidden block relative z-0">
                  <AppPreview
                    step={step.id as any}
                    className="w-full transform scale-95 origin-top"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky Preview */}
          <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center">
            <div className="relative w-full">
              {/* Glow effect behind the preview - GPU accelerated */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[40px] md:blur-[100px] -z-10 rounded-full will-change-transform" />

              <AppPreview
                step={activeStep}
                className="w-full shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
