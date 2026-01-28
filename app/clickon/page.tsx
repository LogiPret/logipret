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
        setStats(data);
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
      <header className="border-b border-[#333] py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FCB723] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              ClickOn Solutions
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Reset Session
          </button>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="h-[calc(100vh-88px)] flex flex-col lg:flex-row">
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
        <div className="lg:w-1/2 flex flex-col p-8 overflow-y-auto">
          {/* Live Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connectionStatus === "connected" ? "bg-[#FCB723]" : "bg-red-500"}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${connectionStatus === "connected" ? "bg-[#FCB723]" : "bg-red-500"}`}
              ></span>
            </span>
            <span className="text-gray-400">
              {connectionStatus === "reconnecting"
                ? "Reconnexion..."
                : `${stats.participantCount} participant${stats.participantCount !== 1 ? "s" : ""} connecté${stats.participantCount !== 1 ? "s" : ""}`}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard label="Participants" value={stats.participantCount} />
            <StatCard
              label="Total Clients"
              value={stats.totalClients.toLocaleString()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard
              label="Commission Moy."
              value={`${stats.avgCommission.toLocaleString()} $`}
            />
            <StatCard
              label="Ouvertures (46%)"
              value={stats.totalOuvertures.toLocaleString()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard
              label="Engagement (14%)"
              value={stats.totalEngagement.toLocaleString()}
            />
            <StatCard
              label="Ventes Pot. (5%)"
              value={stats.totalPotentielVentes.toLocaleString()}
            />
          </div>

          {/* Highlighted Revenue Card */}
          <div className="mb-6">
            <StatCard
              label="Revenu Potentiel Total"
              value={`${stats.totalPotentielRevenu.toLocaleString()} $`}
              highlight
            />
          </div>

          {/* Redirect Button */}
          <div className="mt-auto">
            <button
              onClick={handleRedirect}
              disabled={stats.redirectToLogitext}
              className="w-full bg-[#FCB723] text-black font-bold text-xl px-12 py-5 rounded-xl hover:bg-[#FCB723]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {stats.redirectToLogitext
                ? "Redirection en cours..."
                : "Continuer vers la démo Logitext"}
            </button>
            {stats.redirectToLogitext && (
              <p className="text-sm text-gray-400 mt-3 text-center">
                Tous les participants sont redirigés vers logipret.ca/logitext
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border transition-all ${
        highlight
          ? "bg-[#FCB723]/10 border-[#FCB723]/30"
          : "bg-[#121212] border-[#333]"
      }`}
    >
      <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p
        className={`text-4xl font-bold ${
          highlight ? "text-[#FCB723]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
