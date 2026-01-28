"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface PersonalStats {
  clients: number;
  avgCommission: number;
  ouvertures: number;
  engagement: number;
  potentielVentes: number;
  potentielRevenu: number;
}

export default function JoinPage() {
  const [step, setStep] = useState<"form" | "stats" | "redirecting">("form");
  const [clients, setClients] = useState("");
  const [avgCommission, setAvgCommission] = useState("");
  const [personalStats, setPersonalStats] = useState<PersonalStats | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkForRedirect = useCallback(async () => {
    try {
      const res = await fetch("/api/presentation", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.redirectToLogitext && step !== "form") {
          setStep("redirecting");
          // Redirect immediately
          window.location.href = "https://www.logipret.ca/logitext";
        }
      }
    } catch (err) {
      console.error("Failed to check redirect status:", err);
    }
  }, [step]);

  useEffect(() => {
    // Only poll for redirect when user has submitted (not on form)
    if (step === "stats") {
      checkForRedirect();
      // Poll every 500ms for faster redirect response
      pollIntervalRef.current = setInterval(checkForRedirect, 500);
    }

    // Handle visibility change to refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && step === "stats") {
        checkForRedirect();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [step, checkForRedirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/presentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join",
          clients: parseInt(clients) || 0,
          avgCommission: parseInt(avgCommission) || 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPersonalStats(data.personalStats);
        setStep("stats");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "redirecting") {
    return (
      <div
        className="min-h-screen bg-black text-white flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(252, 183, 35, 0.15) 2px, transparent 2px)`,
          backgroundSize: "24px 24px",
        }}
      >
        <div className="text-center px-6">
          <div className="w-16 h-16 border-4 border-[#FCB723] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Redirecting...</h2>
          <p className="text-gray-400">Taking you to the Logitext demo</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(252, 183, 35, 0.15) 2px, transparent 2px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#333] py-4">
        <div className="max-w-lg mx-auto px-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FCB723] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">C</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            ClickOn Solutions
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-6 py-12">
        {step === "form" ? (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FCB723] px-4 py-1.5 text-xs font-bold tracking-wide text-black uppercase mb-4">
                Live Session
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Welcome!
              </h1>
              <p className="text-gray-400">
                Enter your information to see your potential
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="clients"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  How many clients do you have in your database?
                </label>
                <input
                  type="number"
                  id="clients"
                  value={clients}
                  onChange={(e) => setClients(e.target.value)}
                  placeholder="e.g., 500"
                  required
                  min="0"
                  className="w-full bg-[#121212] border border-[#333] rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#FCB723] focus:ring-1 focus:ring-[#FCB723] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="commission"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  What is your average commission? ($)
                </label>
                <input
                  type="number"
                  id="commission"
                  value={avgCommission}
                  onChange={(e) => setAvgCommission(e.target.value)}
                  placeholder="e.g., 5000"
                  required
                  min="0"
                  className="w-full bg-[#121212] border border-[#333] rounded-xl px-4 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#FCB723] focus:ring-1 focus:ring-[#FCB723] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FCB723] text-black font-bold text-lg py-4 rounded-xl hover:bg-[#FCB723]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Calculating...
                  </>
                ) : (
                  "Calculate My Potential"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FCB723] px-4 py-1.5 text-xs font-bold tracking-wide text-black uppercase mb-4">
                Your Results
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Here&apos;s Your Potential
              </h1>
              <p className="text-gray-400">
                Based on your database and commissions
              </p>
            </div>

            {personalStats && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#121212] border border-[#333] rounded-2xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Clients
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {personalStats.clients.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-[#121212] border border-[#333] rounded-2xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Avg Commission
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ${personalStats.avgCommission.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#121212] border border-[#333] rounded-2xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Ouvertures (46%)
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {personalStats.ouvertures.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-[#121212] border border-[#333] rounded-2xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Engagement (14%)
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {personalStats.engagement.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-[#121212] border border-[#333] rounded-2xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Potential Sales (5%)
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {personalStats.potentielVentes.toLocaleString()}
                  </p>
                </div>

                <div className="bg-[#FCB723]/10 border border-[#FCB723]/30 rounded-2xl p-6">
                  <p className="text-sm text-[#FCB723] uppercase tracking-wide mb-2">
                    Your Potential Revenue
                  </p>
                  <p className="text-5xl font-bold text-[#FCB723]">
                    ${personalStats.potentielRevenu.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400 mt-3">
                    With Club Privilege automation
                  </p>
                </div>
              </div>
            )}

            <div className="mt-10 text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCB723] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FCB723]"></span>
                </span>
                <span className="text-gray-400 text-sm">
                  Waiting for presenter to continue...
                </span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
