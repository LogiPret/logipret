"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useLanguage, t } from "@/lib/i18n";

interface LogitextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogitextModal: React.FC<LogitextModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [hasIphone, setHasIphone] = useState(false);
  const [hasMacbook, setHasMacbook] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/logitext", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          hasIphone,
          hasMacbook,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFirstName("");
          setLastName("");
          setPhone("");
          setHasIphone(false);
          setHasMacbook(false);
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const toggleDevice = (device: "iphone" | "macbook") => {
    if (device === "iphone") setHasIphone(!hasIphone);
    else setHasMacbook(!hasMacbook);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#1C1C1E] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">
          {t("modal", "title", lang)}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {t("modal", "subtitle", lang)}
        </p>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-[#30D158] rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="text-white">{t("modal", "success", lang)}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {t("modal", "firstName", lang)}
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {t("modal", "lastName", lang)}
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                {t("modal", "phone", lang)}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">
                {t("modal", "devices", lang)}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => toggleDevice("iphone")}
                  className={`flex-1 p-4 rounded-xl border transition-all ${
                    hasIphone
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-[#2C2C2E] border-white/10 grayscale opacity-60"
                  }`}
                >
                  <span className="text-3xl">📱</span>
                  <p className="text-xs text-white mt-1">iPhone</p>
                </button>
                <button
                  type="button"
                  onClick={() => toggleDevice("macbook")}
                  className={`flex-1 p-4 rounded-xl border transition-all ${
                    hasMacbook
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-[#2C2C2E] border-white/10 grayscale opacity-60"
                  }`}
                >
                  <span className="text-3xl">💻</span>
                  <p className="text-xs text-white mt-1">MacBook</p>
                </button>
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                {t("modal", "error", lang)}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-logitext-primary to-blue-600 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {status === "loading" ? "..." : t("modal", "submit", lang)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
