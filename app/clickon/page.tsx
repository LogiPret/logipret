"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { translations, Language } from "@/lib/i18n/translations";

const t = (key: keyof typeof translations.clickon, lang: Language) =>
  translations.clickon[key][lang];

// Odometer-style digit that rolls through each number
function OdometerDigit({ digit }: { digit: string }) {
  const [displayDigit, setDisplayDigit] = useState(parseInt(digit) || 0);
  const targetDigit = parseInt(digit) || 0;
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Non-numeric - just display
    if (isNaN(parseInt(digit))) return;

    const target = parseInt(digit);

    // If already at target, do nothing
    if (displayDigit === target) return;

    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    isAnimating.current = true;

    // Calculate direction - always go "up" (forward) like an odometer
    // From 8 to 4: 8→9→0→1→2→3→4 (6 steps forward)
    // From 4 to 8: 4→5→6→7→8 (4 steps forward)
    const stepsForward = (target - displayDigit + 10) % 10;
    const stepsBackward = (displayDigit - target + 10) % 10;

    // Choose shortest path, but prefer forward for ties
    const goForward = stepsForward <= stepsBackward;
    const totalSteps = goForward ? stepsForward : stepsBackward;

    let currentStep = 0;
    let currentDigit = displayDigit;

    const speed = Math.max(50, 200 / totalSteps); // Faster for more steps

    animationRef.current = setInterval(() => {
      currentStep++;
      if (goForward) {
        currentDigit = (currentDigit + 1) % 10;
      } else {
        currentDigit = (currentDigit - 1 + 10) % 10;
      }

      setDisplayDigit(currentDigit);

      if (currentStep >= totalSteps) {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
        isAnimating.current = false;
      }
    }, speed);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [digit, targetDigit]);

  // Non-numeric characters don't animate
  if (isNaN(parseInt(digit))) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{ width: "0.6em", height: "1.2em", verticalAlign: "bottom" }}
    >
      <span
        key={displayDigit}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: "flipIn 80ms ease-out",
        }}
      >
        {displayDigit}
      </span>
      <style jsx>{`
        @keyframes flipIn {
          0% {
            transform: translateY(-30%);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}

// Animated value - handles the full number string
function AnimatedValue({ value }: { value: string | number }) {
  const stringValue = String(value);

  return (
    <span className="inline-flex justify-center">
      {stringValue.split("").map((char, i) => (
        <OdometerDigit key={i} digit={char} />
      ))}
    </span>
  );
}

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
  const [lang, setLang] = useState<Language>("fr");
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
        setStats((prev) => {
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
    setJoinUrl(`${window.location.origin}/join`);
    fetchStats();
    pollIntervalRef.current = setInterval(fetchStats, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStats();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              onClick={handleReset}
              className="text-xs lg:text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("resetSession", lang)}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="h-[calc(100vh-56px)] lg:h-[calc(100vh-72px)] flex flex-col lg:flex-row">
        {/* Left Side - QR Code */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-3 border-b lg:border-b-0 lg:border-r border-[#333] overflow-hidden">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FCB723] px-3 py-1 text-xs font-bold tracking-wide text-black uppercase mb-2">
            {t("liveSession", lang)}
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight mb-1 text-center">
            {t("joinPresentation", lang)}{" "}
            <span className="text-[#FCB723]">{t("presentation", lang)}</span>
          </h1>
          <p className="text-sm text-gray-400 mb-2">{t("scanQR", lang)}</p>

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
                  ? t("reconnecting", lang)
                  : `${stats.participantCount} ${t("participantsConnected", lang)}`}
              </span>
            </div>

            {/* Total Clients - Hero Stat */}
            <div className="w-full">
              <StatCard
                label={t("totalClients", lang)}
                value={stats.totalClients.toLocaleString()}
                size="hero"
              />
            </div>

            {/* Participants & Commission Row */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <StatCard
                label={t("participants", lang)}
                value={stats.participantCount}
                size="medium"
              />
              <StatCard
                label={t("avgCommission", lang)}
                value={`${stats.avgCommission.toLocaleString()} $`}
                size="medium"
              />
            </div>

            {/* Funnel Stats Row */}
            <div className="grid grid-cols-3 gap-2 w-full">
              <StatCard
                label={t("openRate", lang)}
                value={stats.totalOuvertures.toLocaleString()}
                size="medium"
              />
              <StatCard
                label={t("engagementRate", lang)}
                value={stats.totalEngagement.toLocaleString()}
                size="medium"
              />
              <StatCard
                label={t("potentialSales", lang)}
                value={stats.totalPotentielVentes.toLocaleString()}
                size="medium"
              />
            </div>

            {/* Revenu Potentiel - Hero Stat */}
            <div className="w-full">
              <StatCard
                label={t("potentialRevenue", lang)}
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
                  ? t("redirecting", lang)
                  : t("launchDemo", lang)}
              </button>
              {stats.redirectToLogitext && (
                <p className="text-sm text-gray-400 mt-2 text-center">
                  {t("allRedirected", lang)}
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
        className={`font-bold leading-none tabular-nums ${
          isHero
            ? "text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-[#FCB723]"
            : isMedium
              ? "text-lg md:text-xl lg:text-2xl xl:text-3xl text-white"
              : "text-xl text-white"
        }`}
      >
        <AnimatedValue value={value} />
      </p>
    </div>
  );
}
