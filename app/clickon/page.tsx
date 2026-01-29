"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Stats {
  participantCount: number;
  totalClients: number;
  totalOuvertures: number;
  totalEngagement: number;
  totalPotentielVentes: number;
  totalPotentielRevenu: number;
  avgCommission: number;
  redirectToLogitext: boolean;
  isActive: boolean;
}

export default function PresenterPage() {
  const [stats, setStats] = useState<Stats>({
    participantCount: 0,
    totalClients: 0,
    totalOuvertures: 0,
    totalEngagement: 0,
    totalPotentielVentes: 0,
    totalPotentielRevenu: 0,
    avgCommission: 0,
    redirectToLogitext: false,
    isActive: true,
  });
  const [joinUrl, setJoinUrl] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "reconnecting"
  >("connected");
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/presentation", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        // Only update if we have valid data to prevent flash to 0
        setStats((prev) => {
          // If new data has participants or is explicitly inactive (reset), use it
          // Otherwise keep previous values to prevent flash
          if (
            data.participantCount > 0 ||
            !data.isActive ||
            prev.participantCount === 0
          ) {
            return data;
          }
          return prev;
        });
        setConnectionStatus("connected");
        lastUpdateRef.current = Date.now();
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setConnectionStatus("reconnecting");
    }
  }, []);

  useEffect(() => {
    // Set the join URL based on current origin
    setJoinUrl(`${window.location.origin}/join`);

    // Use polling as primary method - more reliable than SSE
    // Fetch immediately on mount
    fetchStats();

    // Poll every 1 second for real-time updates
    pollIntervalRef.current = setInterval(fetchStats, 1000);

    // Also set up visibility change handler to refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStats();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchStats]);

  const handleRedirect = async () => {
    await fetch("/api/presentation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "redirect" }),
    });
    // Redirect presenter to demo page
    window.location.href = "/demo";
  };

  const handleReset = async () => {
    await fetch("/api/presentation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset" }),
    });
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(252, 183, 35, 0.15) 2px, transparent 2px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#333] py-3 lg:py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#FCB723] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg lg:text-xl">C</span>
            </div>
            <span className="text-lg lg:text-xl font-bold tracking-tight">
              ClickOn Solutions
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs lg:text-sm text-gray-400 hover:text-white transition-colors"
          >
            Reset Session
          </button>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="h-[calc(100vh-56px)] lg:h-[calc(100vh-72px)] flex flex-col lg:flex-row">
        {/* Left Side - QR Code */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-3 border-b lg:border-b-0 lg:border-r border-[#333] overflow-hidden">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FCB723] px-3 py-1 text-xs font-bold tracking-wide text-black uppercase mb-2">
            Session en direct
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight mb-1 text-center">
            Rejoignez la <span className="text-[#FCB723]">Présentation</span>
          </h1>
          <p className="text-sm text-gray-400 mb-2">
            Scannez le code QR pour participer
          </p>

          {/* QR Code - Maximum size square */}
          <div
            className="bg-white p-1 rounded-xl mb-2 flex-shrink-0"
            style={{ width: "min(48vw, 60vh)", height: "min(48vw, 60vh)" }}
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(joinUrl)}`}
              alt="Code QR"
              className="w-full h-full"
            />
          </div>

          {/* URL Display */}
          <div className="bg-[#121212] border border-[#333] rounded-lg px-4 py-2">
            <p className="text-lg lg:text-xl font-mono text-[#FCB723] text-center">
              {joinUrl}
            </p>
          </div>
        </div>

        {/* Right Side - Stats */}
        <div className="lg:w-1/2 flex flex-col p-2 lg:p-4 h-full">
          {/* Stats Container - Fits all content */}
          <div className="flex flex-col items-center justify-between w-full h-full">
            {/* Live Indicator */}
            <div className="flex items-center justify-center gap-3 mb-2 w-full">
              <span className="relative flex h-4 w-4">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connectionStatus === "connected" ? "bg-[#FCB723]" : "bg-red-500"}`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-4 w-4 ${connectionStatus === "connected" ? "bg-[#FCB723]" : "bg-red-500"}`}
                ></span>
              </span>
              <span className="text-gray-400 text-lg">
                {connectionStatus === "reconnecting"
                  ? "Reconnexion..."
                  : `${stats.participantCount} participant${stats.participantCount !== 1 ? "s" : ""} connecté${stats.participantCount !== 1 ? "s" : ""}`}
              </span>
            </div>

            {/* Total Clients - Hero Stat */}
            <div className="w-full">
              <StatCard
                label="Total Clients"
                value={stats.totalClients.toLocaleString()}
                size="hero"
              />
            </div>

            {/* Participants & Commission Row */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <StatCard
                label="Participants"
                value={stats.participantCount}
                size="medium"
              />
              <StatCard
                label="Comm. Moy."
                value={`${stats.avgCommission.toLocaleString()} $`}
                size="medium"
              />
            </div>

            {/* Funnel Stats Row */}
            <div className="grid grid-cols-3 gap-2 w-full">
              <StatCard
                label="Ouvertures (46%)"
                value={stats.totalOuvertures.toLocaleString()}
                size="medium"
              />
              <StatCard
                label="Engagement (14%)"
                value={stats.totalEngagement.toLocaleString()}
                size="medium"
              />
              <StatCard
                label="Ventes Pot. (5%)"
                value={stats.totalPotentielVentes.toLocaleString()}
                size="medium"
              />
            </div>

            {/* Revenu Potentiel - Hero Stat */}
            <div className="w-full">
              <StatCard
                label="Revenu Potentiel Total"
                value={`${stats.totalPotentielRevenu.toLocaleString()} $`}
                size="hero"
              />
            </div>

            {/* Redirect Button */}
            <div className="w-full mt-2">
              <button
                onClick={handleRedirect}
                disabled={stats.redirectToLogitext}
                className="w-full bg-[#FCB723] text-black font-bold text-base md:text-xl px-6 py-3 md:py-4 rounded-xl hover:bg-[#FCB723]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {stats.redirectToLogitext
                  ? "Redirection en cours..."
                  : "Lancer la démo vidéo"}
              </button>
              {stats.redirectToLogitext && (
                <p className="text-sm text-gray-400 mt-2 text-center">
                  Tous les participants sont redirigés vers la vidéo
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  size = "default",
}: {
  label: string;
  value: string | number;
  size?: "small" | "medium" | "default" | "hero";
}) {
  const isHero = size === "hero";
  const isMedium = size === "medium";

  return (
    <div
      className={`rounded-xl lg:rounded-2xl border transition-all text-center ${
        isHero
          ? "bg-gradient-to-br from-[#FCB723]/20 via-[#FCB723]/10 to-transparent border-[#FCB723]/50 p-2 md:p-4 lg:p-6 shadow-[0_0_60px_rgba(252,183,35,0.2)]"
          : isMedium
            ? "bg-[#121212] border-[#333] p-1.5 md:p-3 lg:p-4"
            : "bg-[#121212] border-[#333] p-3"
      }`}
    >
      <p
        className={`uppercase tracking-wide mb-0.5 ${
          isHero
            ? "text-[#FCB723]/80 text-[10px] md:text-xs lg:text-base font-semibold"
            : "text-gray-400 text-[8px] md:text-[10px] lg:text-xs"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-bold leading-none ${
          isHero
            ? "text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-[#FCB723]"
            : isMedium
              ? "text-lg md:text-xl lg:text-2xl xl:text-3xl text-white"
              : "text-xl text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
