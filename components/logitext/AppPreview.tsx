"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Send,
  Users,
  BarChart3,
  UploadCloud,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Pause,
  Play,
  Search,
  Filter,
  Edit,
  Clock,
  Paperclip,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Contact names for sending animation (5 valid contacts from step 3)
const CONTACTS_TO_SEND = [
  { name: "Jean T.", status: "ok" },
  { name: "Marie L.", status: "ok" },
  { name: "Pierre M.", status: "ok" },
  { name: "Sophie G.", status: "ok" },
  { name: "Luc B.", status: "ok" },
];

export const AppPreview: React.FC<{
  step?:
    | "csv"
    | "compose"
    | "crm"
    | "crm-hover"
    | "crm-edit"
    | "sending"
    | "done";
  className?: string;
}> = ({ step = "csv", className = "" }) => {
  // Animated sending state
  const [sentCount, setSentCount] = useState(0);
  const [sendingIndex, setSendingIndex] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const prevStepRef = useRef(step);

  // Reset and animate when entering sending step
  useEffect(() => {
    if (step === "sending" && prevStepRef.current !== "sending") {
      // Reset state when entering sending step
      setSentCount(0);
      setSendingIndex(0);
    }
    prevStepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (step === "sending") {
      // Animate sending messages one by one
      animationRef.current = setInterval(() => {
        setSendingIndex((prev) => {
          if (prev < CONTACTS_TO_SEND.length) {
            setSentCount((c) => Math.min(c + 1, CONTACTS_TO_SEND.length));
            return prev + 1;
          }
          // Stop at max
          if (animationRef.current) {
            clearInterval(animationRef.current);
          }
          return prev;
        });
      }, 800);

      return () => {
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
      };
    }
  }, [step]);
  return (
    <div
      className={`relative bg-[#1C1C1E] border border-white/10 rounded-xl shadow-2xl overflow-hidden font-sans text-white ${className}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.1), 0 20px 40px -10px rgba(0,0,0,0.5)",
      }}
    >
      {/* App Header (Mac Style - Always Visible) */}
      <div className="bg-[#2C2C2E] px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0 h-[44px]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="text-xs font-medium text-gray-400 font-mono">
          LogiText v2.4 <span className="text-gray-600">|</span> Demo
        </div>
        <div className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-gray-400">
          FR
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative h-[320px] md:h-[550px] bg-[#1C1C1E] flex flex-col">
        {/* ==================================================================================
            STEP 1: CSV SELECTION (Matches Screen 1)
           ================================================================================== */}
        {step === "csv" && (
          <div className="absolute inset-0 p-4 md:p-8 flex flex-col animate-fade-in">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-xs md:text-sm font-bold">
                1
              </div>
              <h2 className="text-base md:text-xl font-semibold">
                Sélectionnez vos contacts
              </h2>
            </div>

            <div className="flex-1 border-2 border-dashed border-white/10 rounded-xl bg-white/[0.02] flex flex-col items-center justify-center gap-2 md:gap-4 hover:border-[#007AFF]/50 hover:bg-[#007AFF]/5 transition-all cursor-pointer group mb-4 md:mb-8">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#007AFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="text-[#007AFF]" size={20} />
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-lg font-medium text-white mb-1">
                  Glissez votre fichier CSV
                </h3>
                <p className="text-xs text-gray-500">
                  ou cliquez pour parcourir
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] md:text-xs uppercase text-gray-500 font-semibold tracking-wider">
                Fichiers recents :
              </h4>
              <div className="bg-[#2C2C2E] rounded-lg p-2 md:p-3 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-blue-400" />
                  <span className="text-xs md:text-sm">
                    clients_janvier.csv
                  </span>
                  <span className="text-[9px] md:text-[10px] bg-[#007AFF]/20 text-[#007AFF] px-1.5 py-0.5 rounded font-medium">
                    6 contacts
                  </span>
                </div>
                <span className="text-[10px] text-gray-500">2h</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 2: COMPOSE MESSAGE (Matches Screen 2)
           ================================================================================== */}
        {step === "compose" && (
          <div className="absolute inset-0 p-4 md:p-6 flex flex-col animate-fade-in">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-xs md:text-sm font-bold">
                2
              </div>
              <h2 className="text-base md:text-xl font-semibold">
                Rédigez votre message
              </h2>
            </div>

            <div className="mb-3 md:mb-4">
              <label className="text-[10px] md:text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1 md:mb-2 block">
                Insérer :
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Prénom", "Nom", "Entreprise", "Date"].map((v) => (
                  <button
                    key={v}
                    className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md text-[10px] md:text-xs font-medium"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 bg-[#1C1C1E] rounded-lg md:rounded-xl border border-white/20 p-2 md:p-4 font-mono text-xs md:text-sm leading-relaxed text-gray-300 relative shadow-inner">
              Bonjour{" "}
              <span className="bg-[#007AFF]/30 text-[#007AFF] px-1 py-0.5 rounded text-[10px] md:text-sm font-bold">
                [Prénom]
              </span>
              ,<br />
              Votre RDV du{" "}
              <span className="bg-[#007AFF]/30 text-[#007AFF] px-1 py-0.5 rounded text-[10px] md:text-sm font-bold">
                [Date]
              </span>{" "}
              est confirmé.
            </div>

            <div className="mt-3 md:mt-6 flex justify-between items-center">
              <button className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                <ChevronLeft size={12} /> Retour
              </button>
              <button className="bg-[#007AFF] text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1">
                Continuer <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 3: CRM TABLE - Base view with invalid + suspect
           ================================================================================== */}
        {step === "crm" && (
          <div className="absolute inset-0 flex flex-col animate-fade-in overflow-hidden">
            <div className="p-2 md:p-4 pb-1 shrink-0">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#007AFF] flex items-center justify-center text-[10px] md:text-xs font-bold">
                  3
                </div>
                <h2 className="text-xs md:text-lg font-semibold">
                  Destinataires
                </h2>
              </div>
              <div className="flex items-center justify-between text-[9px] md:text-xs text-gray-400">
                <div className="flex gap-2">
                  <span className="text-white font-medium">[Tout]</span>
                  <span>[Aucun]</span>
                  <span className="text-[#FFB300] ml-1">
                    Suspects{" "}
                    <span className="bg-[#FFB300] text-black px-1 rounded text-[8px] font-bold">
                      1
                    </span>
                  </span>
                  <span className="text-[#FF453A]">
                    Invalides{" "}
                    <span className="bg-[#FF453A] text-white px-1 rounded text-[8px] font-bold">
                      1
                    </span>
                  </span>
                </div>
                <span className="text-[#007AFF] font-bold bg-[#007AFF]/10 px-1 py-0.5 rounded text-[9px]">
                  5/6
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden bg-[#151516] border-y border-white/5">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#2C2C2E] text-[8px] md:text-[10px] uppercase text-gray-500 font-medium">
                  <tr>
                    <th className="p-1 w-4 text-center border-b border-white/5">
                      ☑
                    </th>
                    <th className="p-1 w-5 border-b border-white/5"></th>
                    <th className="p-1 border-b border-white/5">Prenom</th>
                    <th className="p-1 border-b border-white/5">Nom</th>
                    <th className="p-1 border-b border-white/5">Tel</th>
                  </tr>
                </thead>
                <tbody className="text-[9px] md:text-xs divide-y divide-white/5">
                  {/* Row 1: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Jean</td>
                    <td className="p-1 text-white">Tremblay</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0101
                    </td>
                  </tr>
                  {/* Row 2: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Marie</td>
                    <td className="p-1 text-white">Lavoie</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0102
                    </td>
                  </tr>
                  {/* Row 3: Suspect - number in lastname */}
                  <tr className="bg-[#FFB300]/5">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <AlertCircle size={9} className="text-[#FFB300]" />
                    </td>
                    <td className="p-1 text-white">Pierre</td>
                    <td className="p-1 text-[#FFB300]">
                      Martin
                      <span className="bg-[#FF453A]/30 text-[#FF453A] px-0.5 rounded font-bold">
                        3
                      </span>
                    </td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0103
                    </td>
                  </tr>
                  {/* Row 4: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Sophie</td>
                    <td className="p-1 text-white">Gagnon</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0104
                    </td>
                  </tr>
                  {/* Row 5: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Luc</td>
                    <td className="p-1 text-white">Bergeron</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0105
                    </td>
                  </tr>
                  {/* Row 6: Invalid - missing phone */}
                  <tr className="bg-[#FF453A]/5 opacity-60">
                    <td className="p-1 text-center text-gray-500">☐</td>
                    <td className="p-1">
                      <XCircle size={9} className="text-[#FF453A]" />
                    </td>
                    <td className="p-1 text-white">Robert</td>
                    <td className="p-1 text-white">Dupont</td>
                    <td className="p-1 text-[#FF453A] italic text-[8px]">
                      (vide)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-2 border-t border-white/10 shrink-0 flex justify-between items-center bg-[#1C1C1E]">
              <button className="bg-white/10 text-white px-2 py-1 rounded text-[9px] font-medium flex items-center gap-1">
                <Edit size={9} /> Editer
              </button>
              <button className="bg-[#30D158] text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1">
                <Send size={9} /> Envoyer (5)
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 3b: CRM HOVER - Show tooltips on invalid/suspect
           ================================================================================== */}
        {step === "crm-hover" && (
          <div className="absolute inset-0 flex flex-col animate-fade-in overflow-hidden">
            <div className="p-2 md:p-4 pb-1 shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#007AFF] flex items-center justify-center text-[10px] md:text-xs font-bold">
                  3
                </div>
                <h2 className="text-xs md:text-lg font-semibold">
                  Destinataires
                </h2>
              </div>
            </div>
            <div className="flex-1 overflow-visible bg-[#151516] border-y border-white/5 relative">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#2C2C2E] text-[8px] md:text-[10px] uppercase text-gray-500 font-medium">
                  <tr>
                    <th className="p-1 w-4 text-center border-b border-white/5">
                      ☑
                    </th>
                    <th className="p-1 w-5 border-b border-white/5"></th>
                    <th className="p-1 border-b border-white/5">Prenom</th>
                    <th className="p-1 border-b border-white/5">Nom</th>
                    <th className="p-1 border-b border-white/5">Tel</th>
                  </tr>
                </thead>
                <tbody className="text-[9px] md:text-xs divide-y divide-white/5">
                  {/* Row 1: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Jean</td>
                    <td className="p-1 text-white">Tremblay</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0101
                    </td>
                  </tr>
                  {/* Row 2: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Marie</td>
                    <td className="p-1 text-white">Lavoie</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0102
                    </td>
                  </tr>
                  {/* Row 3: Suspect - hovered */}
                  <tr className="bg-[#FFB300]/10">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <AlertCircle size={9} className="text-[#FFB300]" />
                    </td>
                    <td className="p-1 text-white">Pierre</td>
                    <td className="p-1 relative">
                      <span
                        className="text-[#FFB300] animate-pulse px-0.5"
                        style={{
                          boxShadow: "inset 0 0 0 1px #FFB300",
                          borderRadius: "2px",
                        }}
                      >
                        Martin
                        <span className="bg-[#FF453A]/40 text-[#FF453A] px-0.5 rounded font-bold">
                          3
                        </span>
                      </span>
                      {/* Tooltip positioned next to the field */}
                      <div className="absolute left-full ml-1 top-1/2 -translate-y-1/2 bg-[#2C2C2E] border-l-2 border-[#FFB300] rounded px-1.5 py-1 shadow-lg z-20 whitespace-nowrap">
                        <div className="text-[#FFB300] text-[7px] font-semibold">
                          Caractere suspect
                        </div>
                        <div className="text-[9px] bg-[#1C1C1E] px-1 rounded mt-0.5">
                          Martin
                          <span className="bg-[#FF453A]/30 text-[#FF453A] px-0.5 rounded font-bold">
                            3
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0103
                    </td>
                  </tr>
                  {/* Row 4: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Sophie</td>
                    <td className="p-1 text-white">Gagnon</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0104
                    </td>
                  </tr>
                  {/* Row 5: Valid */}
                  <tr>
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Luc</td>
                    <td className="p-1 text-white">Bergeron</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0105
                    </td>
                  </tr>
                  {/* Row 6: Invalid - hovered */}
                  <tr className="bg-[#FF453A]/10 opacity-80">
                    <td className="p-1 text-center text-gray-500">☐</td>
                    <td className="p-1">
                      <XCircle size={9} className="text-[#FF453A]" />
                    </td>
                    <td className="p-1 text-white">Robert</td>
                    <td className="p-1 text-white">Dupont</td>
                    <td className="p-1 relative">
                      <span
                        className="text-[#FF453A] italic animate-pulse px-0.5 text-[8px]"
                        style={{
                          boxShadow: "inset 0 0 0 1px #FF453A",
                          borderRadius: "2px",
                        }}
                      >
                        (vide)
                      </span>
                      {/* Tooltip positioned next to the field */}
                      <div className="absolute left-full ml-1 top-1/2 -translate-y-1/2 bg-[#2C2C2E] border-l-2 border-[#FF453A] rounded px-1.5 py-1 shadow-lg z-20 whitespace-nowrap">
                        <div className="text-[#FF453A] text-[7px] font-semibold">
                          Champ manquant
                        </div>
                        <div className="text-gray-400 text-[6px]">
                          Telephone requis
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-2 border-t border-white/10 shrink-0 flex justify-center gap-2 bg-[#1C1C1E]">
              <button className="bg-[#007AFF] text-white px-2 py-1 rounded text-[9px] font-medium flex items-center gap-1">
                <Edit size={9} /> Corriger
              </button>
              <button className="bg-white/10 text-white px-2 py-1 rounded text-[9px] font-medium">
                Ignorer
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 3c: CRM EDIT - Editing the missing phone
           ================================================================================== */}
        {step === "crm-edit" && (
          <div className="absolute inset-0 flex flex-col animate-fade-in overflow-hidden">
            <div className="p-2 md:p-4 pb-1 shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#007AFF] flex items-center justify-center text-[10px] md:text-xs font-bold">
                  3
                </div>
                <h2 className="text-xs md:text-lg font-semibold">
                  Mode Edition
                </h2>
                <span className="text-[8px] bg-[#007AFF]/20 text-[#007AFF] px-1 rounded ml-1">
                  ACTIF
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-visible bg-[#151516] border-y border-white/5 relative">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#2C2C2E] text-[8px] md:text-[10px] uppercase text-gray-500 font-medium">
                  <tr>
                    <th className="p-1 w-4 text-center border-b border-white/5">
                      ☑
                    </th>
                    <th className="p-1 w-5 border-b border-white/5"></th>
                    <th className="p-1 border-b border-white/5">Prenom</th>
                    <th className="p-1 border-b border-white/5">Nom</th>
                    <th className="p-1 border-b border-white/5">Tel</th>
                  </tr>
                </thead>
                <tbody className="text-[9px] md:text-xs divide-y divide-white/5">
                  {/* Row 1: Valid - dimmed */}
                  <tr className="opacity-40">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Jean</td>
                    <td className="p-1 text-white">Tremblay</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0101
                    </td>
                  </tr>
                  {/* Row 2: Valid - dimmed */}
                  <tr className="opacity-40">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Marie</td>
                    <td className="p-1 text-white">Lavoie</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0102
                    </td>
                  </tr>
                  {/* Row 3: Suspect - dimmed */}
                  <tr className="opacity-40">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <AlertCircle size={9} className="text-[#FFB300]" />
                    </td>
                    <td className="p-1 text-white">Pierre</td>
                    <td className="p-1 text-[#FFB300]">Martin3</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0103
                    </td>
                  </tr>
                  {/* Row 4: Valid - dimmed */}
                  <tr className="opacity-40">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Sophie</td>
                    <td className="p-1 text-white">Gagnon</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0104
                    </td>
                  </tr>
                  {/* Row 5: Valid - dimmed */}
                  <tr className="opacity-40">
                    <td className="p-1 text-center text-blue-500">☑</td>
                    <td className="p-1">
                      <CheckCircle2 size={9} className="text-[#30D158]" />
                    </td>
                    <td className="p-1 text-white">Luc</td>
                    <td className="p-1 text-white">Bergeron</td>
                    <td className="p-1 text-gray-400 text-[8px]">
                      514-555-0105
                    </td>
                  </tr>
                  {/* Row 6: Invalid - BEING EDITED */}
                  <tr className="bg-[#007AFF]/10">
                    <td className="p-1 text-center text-gray-500">☐</td>
                    <td className="p-1">
                      <XCircle size={9} className="text-[#FF453A]" />
                    </td>
                    <td className="p-1 text-white">Robert</td>
                    <td className="p-1 text-white">Dupont</td>
                    <td
                      className="p-1 relative"
                      style={{ overflow: "visible" }}
                    >
                      <input
                        type="text"
                        defaultValue="+1514555"
                        className="bg-[#1C1C1E] border-2 border-[#007AFF] rounded px-1 py-0.5 text-white text-[8px] w-16 outline-none"
                        readOnly
                      />
                      <span className="animate-pulse text-white">|</span>
                      {/* Action buttons below */}
                      <div className="absolute top-full left-0 mt-0.5 flex gap-1 z-20">
                        <button className="bg-[#2C2C2E] text-gray-300 px-1 py-0.5 rounded text-[6px] flex items-center gap-0.5 shadow whitespace-nowrap">
                          Annuler <span className="opacity-50">Esc</span>
                        </button>
                        <button className="bg-[#30D158] text-white px-1 py-0.5 rounded text-[6px] flex items-center gap-0.5 shadow whitespace-nowrap">
                          Sauver <span className="opacity-70">Enter</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-2 border-t border-white/10 shrink-0 bg-[#1C1C1E]">
              <div className="text-center text-[8px] text-gray-400">
                Cliquez sur une cellule pour modifier - Entree pour sauvegarder
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 4: SENDING (Matches Screen 4)
           ================================================================================== */}
        {step === "sending" && (
          <div className="absolute inset-0 flex flex-col p-4 md:p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="text-sm md:text-xl font-semibold flex items-center gap-2">
                <div className="relative">
                  <RefreshCw
                    className={`text-[#007AFF] ${sentCount < CONTACTS_TO_SEND.length ? "animate-spin" : ""}`}
                    size={16}
                  />
                </div>
                {sentCount < CONTACTS_TO_SEND.length
                  ? "Envoi..."
                  : "Envoi termine"}
              </h2>
              <span className="text-[10px] md:text-xs font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
                {sentCount}/{CONTACTS_TO_SEND.length}
              </span>
            </div>

            {/* Progress */}
            <div className="bg-[#2C2C2E] rounded-full h-2 md:h-3 w-full mb-1 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#007AFF] to-purple-500 transition-all duration-500 ease-out"
                style={{
                  width: `${(sentCount / CONTACTS_TO_SEND.length) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] md:text-xs text-gray-500 mb-4 md:mb-8 font-mono">
              <span>
                {sentCount < CONTACTS_TO_SEND.length
                  ? `~00:0${CONTACTS_TO_SEND.length - sentCount}`
                  : "00:00"}
              </span>
              <span>
                {Math.round((sentCount / CONTACTS_TO_SEND.length) * 100)}%
              </span>
            </div>

            {/* Console Logs */}
            <div className="flex-1 bg-[#0D0D0D] rounded-lg border border-white/10 p-2 md:p-3 overflow-hidden font-mono text-[10px] md:text-xs flex flex-col relative">
              <div className="space-y-1.5 md:space-y-2">
                {CONTACTS_TO_SEND.map((contact, idx) => {
                  if (idx < sentCount) {
                    return (
                      <div
                        key={idx}
                        className="flex gap-1"
                        style={{ opacity: 0.6 + idx * 0.1 }}
                      >
                        <span className="text-green-500">OK</span>
                        <span className="text-gray-400">{contact.name}</span>
                      </div>
                    );
                  } else if (
                    idx === sendingIndex &&
                    sentCount < CONTACTS_TO_SEND.length
                  ) {
                    return (
                      <div key={idx} className="flex gap-1">
                        <span className="text-blue-500 animate-pulse">...</span>
                        <span className="text-blue-400">{contact.name}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <button className="mt-3 md:mt-6 w-full py-2 bg-[#FF9F0A]/10 border border-[#FF9F0A]/30 text-[#FF9F0A] rounded-lg text-xs font-medium flex justify-center items-center gap-1">
              <Pause size={12} /> Pause
            </button>
          </div>
        )}

        {/* ==================================================================================
            STEP 5: DONE (Matches Screen 5)
           ================================================================================== */}
        {step === "done" && (
          <div className="absolute inset-0 flex flex-col p-4 md:p-8 items-center justify-center animate-fade-in text-center">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-[#30D158] rounded-full flex items-center justify-center">
                  <CheckCircle2
                    size={20}
                    className="text-black"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
              Termine !
            </h2>
            <p className="text-xs md:text-base text-gray-400 mb-4 md:mb-8">
              6 contacts traites.
            </p>

            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full mb-4 md:mb-8">
              <div className="bg-[#2C2C2E] p-2 md:p-4 rounded-lg md:rounded-xl border border-white/5 flex flex-col items-center">
                <span className="text-xl md:text-3xl font-bold text-[#30D158]">
                  5
                </span>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-500">
                  Envoyes
                </span>
              </div>
              <div className="bg-[#2C2C2E] p-2 md:p-4 rounded-lg md:rounded-xl border border-white/5 flex flex-col items-center">
                <span className="text-xl md:text-3xl font-bold text-[#FF453A]">
                  0
                </span>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-500">
                  Erreur
                </span>
              </div>
              <div className="bg-[#2C2C2E] p-2 md:p-4 rounded-lg md:rounded-xl border border-white/5 flex flex-col items-center">
                <span className="text-xl md:text-3xl font-bold text-[#FF9F0A]">
                  1
                </span>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-500">
                  Invalide
                </span>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <button className="flex-1 py-2 md:py-3 bg-[#2C2C2E] rounded-lg text-xs md:text-sm text-gray-300 font-medium border border-white/5">
                Logs
              </button>
              <button className="flex-1 py-2 md:py-3 bg-[#007AFF] rounded-lg text-xs md:text-sm text-white font-bold">
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
