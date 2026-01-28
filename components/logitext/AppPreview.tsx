"use client";

import React from "react";
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

export const AppPreview: React.FC<{
  step?: "csv" | "compose" | "crm" | "sending" | "done";
  className?: string;
}> = ({ step = "csv", className = "" }) => {
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
      <div className="relative h-[450px] md:h-[550px] bg-[#1C1C1E] flex flex-col">
        {/* ==================================================================================
            STEP 1: CSV SELECTION (Matches Screen 1)
           ================================================================================== */}
        {step === "csv" && (
          <div className="absolute inset-0 p-8 flex flex-col animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h2 className="text-xl font-semibold">
                Sélectionnez vos contacts
              </h2>
            </div>

            <div className="flex-1 border-2 border-dashed border-white/10 rounded-xl bg-white/[0.02] flex flex-col items-center justify-center gap-4 hover:border-[#007AFF]/50 hover:bg-[#007AFF]/5 transition-all cursor-pointer group mb-8">
              <div className="w-16 h-16 rounded-full bg-[#007AFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="text-[#007AFF]" size={32} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">
                  Glissez votre fichier CSV ici
                </h3>
                <p className="text-sm text-gray-500">
                  ou cliquez pour parcourir
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
                Fichiers récents :
              </h4>
              <div className="bg-[#2C2C2E] rounded-lg p-3 flex items-center justify-between border border-white/5 hover:bg-white/10 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-blue-400" />
                  <span className="text-sm">clients_janvier.csv</span>
                </div>
                <span className="text-xs text-gray-500 group-hover:hidden">
                  il y a 2h
                </span>
                <XCircle
                  size={14}
                  className="text-gray-500 hidden group-hover:block hover:text-red-400"
                />
              </div>
              <div className="bg-[#2C2C2E] rounded-lg p-3 flex items-center justify-between border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">
                    contacts_vip.csv
                  </span>
                </div>
                <span className="text-xs text-gray-600">hier</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 2: COMPOSE MESSAGE (Matches Screen 2)
           ================================================================================== */}
        {step === "compose" && (
          <div className="absolute inset-0 p-6 flex flex-col animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h2 className="text-xl font-semibold">Rédigez votre message</h2>
            </div>

            <div className="mb-4">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2 block">
                Insérer :
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Prénom", "Nom", "Entreprise", "Date"].map((v) => (
                  <button
                    key={v}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md text-xs font-medium hover:-translate-y-0.5 transition-transform shadow-lg shadow-blue-900/20"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 bg-[#1C1C1E] rounded-xl border border-white/20 p-4 font-mono text-sm leading-relaxed text-gray-300 focus-within:border-[#007AFF] focus-within:ring-1 focus-within:ring-[#007AFF] transition-all relative shadow-inner">
              Bonjour{" "}
              <span className="bg-[#007AFF]/30 text-[#007AFF] px-1.5 py-0.5 rounded border border-[#007AFF]/20 font-bold">
                [Prénom]
              </span>
              ,<br />
              <br />
              Votre rendez-vous du{" "}
              <span className="bg-[#007AFF]/30 text-[#007AFF] px-1.5 py-0.5 rounded border border-[#007AFF]/20 font-bold">
                [Date]
              </span>{" "}
              est confirmé.
              <br />
              Merci de votre confiance!
              <br />
              <br />
              L'équipe LogiPrêt.
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="text-gray-500 text-sm hover:text-white flex items-center gap-1">
                <ChevronLeft size={14} /> Retour
              </button>
              <button className="bg-[#007AFF] hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                Continuer <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 3: CRM TABLE / SELECT (Matches Screen 3)
           ================================================================================== */}
        {step === "crm" && (
          <div className="absolute inset-0 flex flex-col animate-fade-in">
            <div className="p-6 pb-2 shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h2 className="text-xl font-semibold">
                  Sélectionnez les destinataires
                </h2>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                  </div>
                  <button className="bg-[#2C2C2E] border border-white/10 p-2 rounded-lg text-gray-400 hover:text-white">
                    <Filter size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex gap-2">
                    <span className="text-white font-medium cursor-pointer hover:underline">
                      [Tout]
                    </span>
                    <span className="hover:text-white cursor-pointer hover:underline">
                      [Aucun]
                    </span>
                  </div>
                  <span className="text-[#007AFF] font-bold bg-[#007AFF]/10 px-2 py-0.5 rounded">
                    47 / 52 sélectionnés
                  </span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto bg-[#151516] border-y border-white/5 scrollbar-thin scrollbar-thumb-white/10">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#2C2C2E] text-xs uppercase text-gray-500 sticky top-0 font-medium z-10">
                  <tr>
                    <th className="p-3 w-8 text-center border-b border-white/5">
                      ☑
                    </th>
                    <th className="p-3 w-8 border-b border-white/5">#</th>
                    <th className="p-3 border-b border-white/5">Statut</th>
                    <th className="p-3 border-b border-white/5">Prénom</th>
                    <th className="p-3 border-b border-white/5">Nom</th>
                    <th className="p-3 border-b border-white/5 hidden sm:table-cell">
                      Téléphone
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {[
                    {
                      id: 1,
                      f: "Jean",
                      l: "Tremblay",
                      p: "514-555-1234",
                      s: "valid",
                    },
                    {
                      id: 2,
                      f: "Marie",
                      l: "Lavoie",
                      p: "438-555-5678",
                      s: "valid",
                    },
                    {
                      id: 3,
                      f: "Pierre",
                      l: "Martin",
                      p: "514-555-9999",
                      s: "valid",
                    },
                    { id: 4, f: "Robert", l: "(vide)", p: "N/A", s: "invalid" },
                    {
                      id: 5,
                      f: "François",
                      l: "Dubois",
                      p: "514-555-0000",
                      s: "suspect",
                    },
                    {
                      id: 6,
                      f: "Sophie",
                      l: "Gagnon",
                      p: "438-555-1111",
                      s: "valid",
                    },
                    {
                      id: 7,
                      f: "Julie",
                      l: "Caron",
                      p: "514-555-2222",
                      s: "valid",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`hover:bg-white/5 group transition-colors ${row.s === "invalid" ? "opacity-50" : ""}`}
                    >
                      <td className="p-3 text-center text-blue-500 font-bold">
                        {row.s === "valid" || row.s === "suspect" ? "☑" : "☐"}
                      </td>
                      <td className="p-3 text-gray-500 font-mono text-xs">
                        {row.id}
                      </td>
                      <td className="p-3">
                        {row.s === "valid" && (
                          <CheckCircle2 size={16} className="text-[#30D158]" />
                        )}
                        {row.s === "invalid" && (
                          <XCircle size={16} className="text-[#FF453A]" />
                        )}
                        {row.s === "suspect" && (
                          <AlertCircle size={16} className="text-[#FF9F0A]" />
                        )}
                      </td>
                      <td className="p-3 text-white font-medium">{row.f}</td>
                      <td className="p-3 text-white font-medium">{row.l}</td>
                      <td className="p-3 text-gray-400 font-mono text-xs hidden sm:table-cell">
                        {row.p}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-white/10 shrink-0 flex justify-between items-center bg-[#1C1C1E]">
              <button className="text-gray-500 text-xs hover:text-white">
                ← Retour
              </button>
              <button className="bg-[#30D158] hover:bg-green-600 text-white pl-4 pr-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-green-900/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                <Send size={14} /> Envoyer (47)
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================================
            STEP 4: SENDING (Matches Screen 4)
           ================================================================================== */}
        {step === "sending" && (
          <div className="absolute inset-0 flex flex-col p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <div className="relative">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-25 animate-ping"></span>
                  <RefreshCw
                    className="animate-spin text-[#007AFF]"
                    size={20}
                  />
                </div>
                Envoi en cours...
              </h2>
              <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                23 / 47
              </span>
            </div>

            {/* Progress */}
            <div className="bg-[#2C2C2E] rounded-full h-3 w-full mb-2 overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#007AFF] to-purple-500 w-[49%] relative transition-all duration-500">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-8 font-mono">
              <span>~ 03:45 restantes</span>
              <span>49%</span>
            </div>

            {/* Console Logs */}
            <div className="flex-1 bg-[#0D0D0D] rounded-lg border border-white/10 p-3 overflow-hidden font-mono text-xs flex flex-col relative shadow-inner">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent h-12 top-auto bottom-0 z-10" />
              <div className="space-y-3 opacity-80">
                {/* Old logs */}
                <div className="flex gap-2 opacity-50">
                  <span className="text-gray-600">14:32:01</span>{" "}
                  <span className="text-green-500">✓</span>{" "}
                  <span className="text-gray-400">
                    Jean Tremblay (514-555-1234)
                  </span>
                </div>
                <div className="flex gap-2 opacity-60">
                  <span className="text-gray-600">14:32:05</span>{" "}
                  <span className="text-green-500">✓</span>{" "}
                  <span className="text-gray-400">
                    Marie Lavoie (438-555-5678)
                  </span>
                </div>
                <div className="flex gap-2 opacity-70">
                  <span className="text-gray-600">14:32:09</span>{" "}
                  <span className="text-green-500">✓</span>{" "}
                  <span className="text-gray-400">
                    Pierre Martin (514-555-9999)
                  </span>
                </div>
                <div className="flex gap-2 opacity-80">
                  <span className="text-gray-600">14:32:13</span>{" "}
                  <span className="text-[#FF453A]">✗</span>{" "}
                  <span className="text-[#FF453A]">
                    Robert Gagnon - Numéro invalide
                  </span>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 -mx-1 rounded">
                  <span className="text-gray-500">14:32:17</span>{" "}
                  <span className="text-green-500">✓</span>{" "}
                  <span className="text-white">
                    François Dubois (514-555-0000)
                  </span>
                </div>
              </div>

              {/* Active item */}
              <div className="flex gap-2 mt-3 ml-1">
                <span className="text-blue-500 animate-spin">⟳</span>
                <span className="text-blue-400 font-medium">
                  Sophie Gagnon posting to iMessage...
                </span>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-[#FF9F0A]/10 border border-[#FF9F0A]/30 text-[#FF9F0A] rounded-lg font-medium hover:bg-[#FF9F0A]/20 transition-colors flex justify-center items-center gap-2">
              <Pause size={16} fill="currentColor" /> Pause
            </button>
          </div>
        )}

        {/* ==================================================================================
            STEP 5: DONE (Matches Screen 5)
           ================================================================================== */}
        {step === "done" && (
          <div className="absolute inset-0 flex flex-col p-8 items-center justify-center animate-fade-in text-center">
            <div className="flex items-center justify-center mb-6 scale-100 animate-[bounce_1s_infinite]">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(48,209,88,0.2)]">
                <div className="w-12 h-12 bg-[#30D158] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2
                    size={32}
                    className="text-black"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Campagne terminée !
            </h2>
            <p className="text-gray-400 mb-8">
              Tous les messages ont été traités.
            </p>

            <div className="grid grid-cols-3 gap-4 w-full mb-8">
              <div className="bg-[#2C2C2E] p-4 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/5 transition-colors">
                <span className="text-3xl font-bold text-[#30D158] mb-1">
                  45
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Envoyés
                </span>
              </div>
              <div className="bg-[#2C2C2E] p-4 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/5 transition-colors">
                <span className="text-3xl font-bold text-[#FF453A] mb-1">
                  1
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Échoués
                </span>
              </div>
              <div className="bg-[#2C2C2E] p-4 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/5 transition-colors">
                <span className="text-3xl font-bold text-[#FF9F0A] mb-1">
                  1
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Ignorés
                </span>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button className="flex-1 py-3 bg-[#2C2C2E] hover:bg-[#3C3C3E] rounded-lg text-sm text-gray-300 font-medium transition-colors border border-white/5">
                Voir logs
              </button>
              <button className="flex-1 py-3 bg-[#007AFF] hover:bg-blue-600 rounded-lg text-sm text-white font-bold transition-colors shadow-lg shadow-blue-900/20">
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
