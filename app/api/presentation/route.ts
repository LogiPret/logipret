// Force Node.js runtime (not Edge) to ensure in-memory state works
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory store for presentation state
// This is the SINGLE SOURCE OF TRUTH - persists across all requests
// Only resets when the server restarts

interface Participant {
  id: string;
  clients: number;
  avgCommission: number;
  ouvertures: number;
  engagement: number;
  potentielVentes: number;
  potentielRevenu: number;
  timestamp: number;
}

interface PresentationState {
  participants: Map<string, Participant>;
  isActive: boolean;
  redirectToLogitext: boolean;
  createdAt: number;
}

// Use globalThis to persist state across hot reloads in development
const globalState = globalThis as typeof globalThis & {
  presentationState?: PresentationState;
};

if (!globalState.presentationState) {
  globalState.presentationState = {
    participants: new Map(),
    isActive: true,
    redirectToLogitext: false,
    createdAt: Date.now(),
  };
}

const state = globalState.presentationState;

const OPEN_RATE = 0.46; // 46%
const ENGAGEMENT_RATE = 0.14; // 14%
const SALES_RATE = 0.05; // 5%

function calculateStats(clients: number, avgCommission: number) {
  const ouvertures = Math.max(1, Math.round(clients * OPEN_RATE));
  const engagement = Math.max(1, Math.round(ouvertures * ENGAGEMENT_RATE));
  const potentielVentes = Math.max(1, Math.round(SALES_RATE * engagement));
  const potentielRevenu = potentielVentes * avgCommission;
  return { ouvertures, engagement, potentielVentes, potentielRevenu };
}

function getStats() {
  const participants = Array.from(state.participants.values());
  const totalClients = participants.reduce((sum, p) => sum + p.clients, 0);
  const totalOuvertures = participants.reduce(
    (sum, p) => sum + p.ouvertures,
    0,
  );
  const totalEngagement = participants.reduce(
    (sum, p) => sum + p.engagement,
    0,
  );
  const totalPotentielVentes = participants.reduce(
    (sum, p) => sum + p.potentielVentes,
    0,
  );
  const totalPotentielRevenu = participants.reduce(
    (sum, p) => sum + p.potentielRevenu,
    0,
  );
  const avgCommission =
    participants.length > 0
      ? participants.reduce((sum, p) => sum + p.avgCommission, 0) /
        participants.length
      : 0;

  return {
    participantCount: participants.length,
    totalClients,
    totalOuvertures,
    totalEngagement,
    totalPotentielVentes,
    totalPotentielRevenu,
    avgCommission: Math.round(avgCommission),
    redirectToLogitext: state.redirectToLogitext,
    isActive: state.isActive,
    sessionAge: Date.now() - state.createdAt,
  };
}

export async function GET() {
  // Simple polling endpoint - always returns current state
  // No caching to ensure fresh data
  return new Response(JSON.stringify(getStats()), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, participantId, clients, avgCommission } = body;

  if (action === "join") {
    // New participant joins
    const id = participantId || crypto.randomUUID();
    const clientNum = Number(clients) || 0;
    const commissionNum = Number(avgCommission) || 0;
    const stats = calculateStats(clientNum, commissionNum);

    const participant: Participant = {
      id,
      clients: clientNum,
      avgCommission: commissionNum,
      ouvertures: stats.ouvertures,
      engagement: stats.engagement,
      potentielVentes: stats.potentielVentes,
      potentielRevenu: stats.potentielRevenu,
      timestamp: Date.now(),
    };

    state.participants.set(id, participant);

    return Response.json({
      success: true,
      participantId: id,
      personalStats: {
        clients: participant.clients,
        avgCommission: participant.avgCommission,
        ouvertures: participant.ouvertures,
        engagement: participant.engagement,
        potentielVentes: participant.potentielVentes,
        potentielRevenu: participant.potentielRevenu,
      },
    });
  }

  if (action === "redirect") {
    // Presenter triggers redirect to Logitext
    state.redirectToLogitext = true;
    return Response.json({ success: true });
  }

  if (action === "reset") {
    // Reset the presentation - keeps the session but clears participants
    state.participants.clear();
    state.redirectToLogitext = false;
    state.isActive = true;
    return Response.json({ success: true });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}
