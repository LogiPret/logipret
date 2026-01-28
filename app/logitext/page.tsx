import React from "react";
import { LogitextNavbar } from "@/components/logitext/LogitextNavbar";
import { AppPreview } from "@/components/logitext/AppPreview";
import { HowItWorks } from "@/components/logitext/HowItWorks";
import { XCircle, DollarSign, UserX, ShieldAlert } from "lucide-react";

export default function LogitextPage() {
  return (
    <main className="min-h-screen bg-logitext-bg text-white selection:bg-logitext-primary/30 font-sans">
      <LogitextNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Effects - Optimized for mobile with reduced blur and GPU acceleration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none will-change-transform">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-logitext-primary/20 rounded-full blur-[40px] md:blur-[120px] will-change-transform" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-logitext-purple/20 rounded-full blur-[40px] md:blur-[120px] will-change-transform" />
          <div className="absolute bottom-0 left-[20%] w-[60%] h-[30%] bg-blue-500/10 rounded-full blur-[30px] md:blur-[100px] will-change-transform" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New: Native Mac Integration
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Envoyez des milliers de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-logitext-primary to-logitext-purple">
                SMS personnalisés
              </span>{" "}
              en quelques clics
            </h1>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              LogiText transforme votre liste de contacts en campagne SMS en
              moins de 5 minutes. Aucune configuration complexe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-logitext-primary to-blue-600 hover:to-blue-500 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:shadow-[0_0_40px_rgba(10,132,255,0.5)] transition-all transform hover:-translate-y-1">
                Télécharger pour Mac
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white font-medium text-lg transition-all backdrop-blur-sm">
                Voir la démo
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#0D0D0D]"
                  />
                ))}
              </div>
              <p>Trusted by 500+ businesses</p>
            </div>
          </div>

          {/* Right App Preview - Stickyish */}
          <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-logitext-primary/10 to-transparent blur-xl md:blur-3xl -z-10 will-change-transform" />
            <AppPreview className="w-full max-w-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 ease-out" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Le problème avec l'envoi de SMS en masse
            </h2>
            <p className="text-xl text-gray-400">
              Pourquoi est-ce si compliqué de joindre vos clients ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: XCircle,
                title: "Copier-coller",
                desc: "Des heures perdues à envoyer des messages un par un.",
                color: "text-red-400",
              },
              {
                icon: DollarSign,
                title: "Coûts élevés",
                desc: "Abonnements mensuels et frais cachés exorbitants.",
                color: "text-orange-400",
              },
              {
                icon: UserX,
                title: "Impersonnel",
                desc: "Les messages génériques finissent ignorés.",
                color: "text-gray-400",
              },
              {
                icon: ShieldAlert,
                title: "Données exposées",
                desc: "Vos contacts sont envoyés sur des serveurs tiers.",
                color: "text-yellow-400",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Transition */}
      <div className="h-24 bg-gradient-to-b from-[#121212] to-logitext-bg" />

      {/* Solution Section */}
      <section id="features" className="py-24 bg-logitext-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-500">LogiText</span>: Vos SMS,
              directement depuis votre Mac
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              La seule solution de messagerie de masse qui respecte votre vie
              privée et celle de vos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "iMessage Natif",
                desc: "Utilise votre propre numéro et l'application Messages de votre Mac. Pas de tiers, pas de surcoût.",
                icon: "💬",
              },
              {
                title: "Personnalisation",
                desc: "{{prenom}}, {{nom}} et variables illlimitées. Chaque message semble écrit à la main.",
                icon: "✨",
              },
              {
                title: "100% Privé",
                desc: "Vos données restent sur votre machine. Aucun upload cloud, aucun tracking.",
                icon: "🔒",
              },
              {
                title: "Interface Intuitive",
                desc: "Importez, composez, envoyez. Prise en main en moins de 30 secondes.",
                icon: "⚡️",
              },
              {
                title: "Rapide & Fiable",
                desc: "Envoi automatique avec gestion des délais pour éviter le blocage opérateur.",
                icon: "🚀",
              },
              {
                title: "Support Local",
                desc: "Développé au Québec. Support technique réactif en français et anglais.",
                icon: "🍁",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/[0.07] transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Coming Soon Section */}
      <section
        id="coming-soon"
        className="py-24 bg-[#0D0D0D] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Bientôt disponible partout
          </h2>
          <p className="text-xl text-gray-400">
            LogiText évolue. Restez à l'écoute.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1C1C1E] p-8 rounded-2xl border border-blue-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-2 py-1 rounded-bl-lg">
              BETA
            </div>
            <div className="h-40 bg-gradient-to-br from-blue-900/20 to-transparent rounded-lg mb-6 flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
            <h3 className="text-xl font-bold mb-2">LogiText pour iPhone</h3>
            <p className="text-gray-400 text-sm mb-4">
              Envoyez des SMS directement depuis votre iPhone. Même simplicité.
            </p>
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300">
              Rejoindre la beta &rarr;
            </button>
          </div>

          <div className="bg-[#1C1C1E] p-8 rounded-2xl border border-white/5 opacity-75 hover:opacity-100 transition-opacity">
            <div className="absolute top-0 right-0 bg-white/10 text-xs font-bold px-2 py-1 rounded-bl-lg text-gray-400">
              2024
            </div>
            <div className="h-40 bg-white/5 rounded-lg mb-6 flex items-center justify-center grayscale">
              <span className="text-4xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold mb-2">LogiText pour Android</h3>
            <p className="text-gray-400 text-sm">
              Support complet pour appareils Android.
            </p>
          </div>

          <div className="bg-[#1C1C1E] p-8 rounded-2xl border border-white/5 opacity-75 hover:opacity-100 transition-opacity">
            <div className="absolute top-0 right-0 bg-white/10 text-xs font-bold px-2 py-1 rounded-bl-lg text-gray-400">
              2024
            </div>
            <div className="h-40 bg-white/5 rounded-lg mb-6 flex items-center justify-center grayscale">
              <span className="text-4xl">🌐</span>
            </div>
            <h3 className="text-xl font-bold mb-2">LogiText Web</h3>
            <p className="text-gray-400 text-sm">
              Accédez à LogiText depuis n'importe quel navigateur.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-logitext-bg -z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Prêt à lancer votre campagne ?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Rejoignez les professionnels qui gagnent du temps avec LogiText.
          </p>
          <button className="px-10 py-5 bg-white text-black hover:bg-gray-100 rounded-full font-bold text-xl shadow-xl transition-all transform hover:scale-105">
            Télécharger la Bêta
          </button>
          <p className="mt-6 text-sm text-gray-500">
            Pour macOS 12+ (Monterey et plus récent)
          </p>
        </div>
      </section>
    </main>
  );
}
