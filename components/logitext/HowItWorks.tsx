"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppPreview } from "./AppPreview";
import {
  Upload,
  MessageSquare,
  Send,
  Users,
  CheckCircle,
  AlertTriangle,
  Edit3,
} from "lucide-react";

type StepId =
  | "csv"
  | "compose"
  | "crm"
  | "crm-hover"
  | "crm-edit"
  | "sending"
  | "done";

const steps: {
  id: StepId;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  scale: number;
  rotateY: number;
  rotateX: number;
}[] = [
  {
    id: "csv",
    title: "1. Importez vos contacts",
    description:
      "Glissez votre fichier CSV. LogiText detecte automatiquement les colonnes et nettoie les numeros de telephone.",
    icon: Upload,
    scale: 0.85,
    rotateY: -8,
    rotateX: 5,
  },
  {
    id: "compose",
    title: "2. Redigez votre message",
    description:
      "Creez des messages personnalises avec des variables dynamiques comme [Prenom], [Date] ou [Entreprise].",
    icon: MessageSquare,
    scale: 0.9,
    rotateY: 6,
    rotateX: -3,
  },
  {
    id: "crm",
    title: "3. Validez la liste",
    description:
      "Verifiez chaque contact dans le CRM integre. Les contacts invalides et suspects sont signales automatiquement.",
    icon: Users,
    scale: 0.88,
    rotateY: -5,
    rotateX: 4,
  },
  {
    id: "crm-hover",
    title: "3b. Detectez les erreurs",
    description:
      "Survolez un contact pour voir les details. Champs manquants en rouge, caracteres suspects en orange.",
    icon: AlertTriangle,
    scale: 0.9,
    rotateY: -3,
    rotateX: 2,
  },
  {
    id: "crm-edit",
    title: "3c. Corrigez en ligne",
    description:
      "Editez directement les champs problematiques. Sauvegardez avec Entree, annulez avec Echap.",
    icon: Edit3,
    scale: 0.92,
    rotateY: 4,
    rotateX: -1,
  },
  {
    id: "sending",
    title: "4. Suivez l'envoi",
    description:
      "Visualisez la progression en temps reel. Le systeme optimise le debit pour garantir la delivrabilite.",
    icon: Send,
    scale: 0.92,
    rotateY: 7,
    rotateX: -2,
  },
  {
    id: "done",
    title: "5. Bilan complet",
    description:
      "Obtenez un rapport detaille une fois la campagne terminee. Voyez qui a recu le message et les erreurs eventuelles.",
    icon: CheckCircle,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
  },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<StepId>("csv");
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInSection, setIsInSection] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Check if we're in the section
      const inSection =
        sectionRect.top < window.innerHeight * 0.5 &&
        sectionRect.bottom > window.innerHeight * 0.3;
      setIsInSection(inSection);

      // Check if we're on mobile or desktop
      const isMobile = window.innerWidth < 1024;

      // Use different trigger points for mobile vs desktop
      // Mobile: 0.95 (near bottom of screen) - works well with sticky preview at top
      // Desktop: 0.55 (middle of screen) - triggers when step text is centered
      const triggerMultiplier = isMobile ? 0.95 : 0.55;
      const triggerPoint =
        window.scrollY + window.innerHeight * triggerMultiplier;

      const refs = isMobile ? mobileStepRefs.current : desktopStepRefs.current;

      // Find active step and calculate fluid progress
      let foundIndex = 0;
      let stepProgress = 0;

      refs.forEach((ref, index) => {
        if (ref) {
          const { top, bottom, height } = ref.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;

          if (triggerPoint >= absoluteTop && triggerPoint < absoluteBottom) {
            foundIndex = index;
            // Calculate progress within this step (0 to 1)
            const progressInStep = (triggerPoint - absoluteTop) / height;
            // Total progress = completed steps + partial current step
            stepProgress =
              ((index + Math.min(progressInStep, 1)) / steps.length) * 100;
          } else if (triggerPoint >= absoluteBottom) {
            // Past this step
            foundIndex = Math.max(foundIndex, index);
            stepProgress = Math.max(
              stepProgress,
              ((index + 1) / steps.length) * 100,
            );
          }
        }
      });

      if (steps[foundIndex]) {
        const stepId = steps[foundIndex].id;
        if (activeStep !== stepId) {
          setActiveStep(stepId);
          setActiveIndex(foundIndex);
        }
        setProgress(Math.min(stepProgress, 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeStep]);

  const currentStep = steps[activeIndex];

  // Map step IDs to AppPreview step prop
  const getPreviewStep = (
    stepId: StepId,
  ):
    | "csv"
    | "compose"
    | "crm"
    | "crm-hover"
    | "crm-edit"
    | "sending"
    | "done" => {
    return stepId;
  };

  return (
    <section
      id="how-it-works"
      className="py-24 bg-logitext-bg relative"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
            Une interface intuitive
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Concu pour etre simple, rapide et efficace. Aucune formation
            necessaire.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden relative" ref={containerRef}>
          {/* Progress bar on left - only visible when in section */}
          <div
            className={`fixed left-3 top-1/2 -translate-y-1/2 z-50 h-[35vh] w-0.5 bg-white/10 rounded-full overflow-hidden transition-opacity duration-150 ${isInSection ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div
              className="w-full bg-white rounded-full"
              style={{
                height: `${progress}%`,
                transition: "height 50ms linear",
              }}
            />
            {/* Step dots */}
            <div className="absolute inset-0 flex flex-col justify-between py-0">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 -ml-[3px] rounded-full transition-all duration-150 ${
                    idx <= activeIndex ? "bg-white scale-125" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sticky Preview Container - Top portion */}
          <div className="sticky top-0 h-auto flex items-start justify-center z-20 py-2 pointer-events-none select-none">
            <div
              className="relative w-full max-w-[92vw] mx-auto transition-all duration-500 ease-out will-change-transform"
              style={{
                perspective: "1000px",
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 bg-blue-500/10 blur-[30px] rounded-full -z-10 transition-all duration-500"
                style={{
                  transform: `scale(${currentStep.scale + 0.2})`,
                }}
              />

              {/* 3D Orbiting Preview */}
              <div
                className="transition-all duration-500 ease-out"
                style={{
                  transform: `
                    scale(${currentStep.scale})
                    rotateY(${currentStep.rotateY}deg)
                    rotateX(${currentStep.rotateX}deg)
                  `,
                  transformStyle: "preserve-3d",
                }}
              >
                <AppPreview
                  step={getPreviewStep(activeStep)}
                  className="w-full shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Scrolling Text Content - Bottom half */}
          <div className="relative z-10 pl-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el: HTMLDivElement | null) => {
                  mobileStepRefs.current[index] = el;
                }}
                className="min-h-[50vh] flex items-center py-6"
              >
                <div
                  className={`transition-all duration-300 p-5 rounded-2xl w-full ${
                    activeStep === step.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-30 translate-x-4"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeStep === step.id
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-110"
                          : "bg-white/5 text-gray-500 scale-100"
                      }`}
                    >
                      <step.icon size={20} />
                    </div>
                    <h3
                      className={`text-lg font-bold transition-colors duration-200 ${
                        activeStep === step.id ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed pl-13 transition-colors duration-200 ${
                      activeStep === step.id ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-start">
          {/* Left: Text Steps */}
          <div className="space-y-[20vh] py-[10vh]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el: HTMLDivElement | null) => {
                  desktopStepRefs.current[index] = el;
                }}
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
              </div>
            ))}
          </div>

          {/* Right: Sticky Preview */}
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none select-none">
            <div className="relative w-full" style={{ perspective: "1200px" }}>
              {/* Glow effect behind the preview */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[40px] md:blur-[100px] -z-10 rounded-full will-change-transform transition-all duration-700"
                style={{
                  transform: `translate(-50%, -50%) scale(${currentStep.scale + 0.1})`,
                }}
              />

              <div
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `
                    scale(${currentStep.scale})
                    rotateY(${currentStep.rotateY}deg)
                    rotateX(${currentStep.rotateX}deg)
                  `,
                  transformStyle: "preserve-3d",
                }}
              >
                <AppPreview
                  step={getPreviewStep(activeStep)}
                  className="w-full shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
