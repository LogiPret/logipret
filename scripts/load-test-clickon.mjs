#!/usr/bin/env node

/**
 * Load test for ClickOn presentation system.
 * Runs 5 phases testing all use cases: ramp-up, burst, churn, re-submit, and redirect.
 *
 * Usage:
 *   node scripts/load-test-clickon.mjs [baseUrl] [numConnections]
 *
 * Examples:
 *   node scripts/load-test-clickon.mjs                           # defaults: localhost:3000, 60 users
 *   node scripts/load-test-clickon.mjs http://localhost:3000 100
 */

const BASE_URL = process.argv[2] || "http://localhost:3000";
const NUM_CONNECTIONS = parseInt(process.argv[3]) || 60;

const STATS_POLL_MS = 2000;

let totalJoins = 0;
let totalUpdates = 0;
let totalChurns = 0;
let errors = 0;
let lastParticipantCount = 0;
let countDrops = 0;
let prevVersion = -1;
let outOfOrder = 0;
let ignoreDrops = false;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function pad(str, len) {
  return String(str).padStart(len, " ");
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function apiPost(body) {
  const res = await fetch(`${BASE_URL}/api/presentation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function joinPresentation(participantId) {
  const clients = randInt(100, 3000);
  const avgCommission = randInt(3000, 10000);

  const data = await apiPost({
    action: "join",
    participantId,
    clients,
    avgCommission,
  });
  return data;
}

async function getStats() {
  const res = await fetch(`${BASE_URL}/api/presentation`, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  return res.json();
}

async function resetPresentation() {
  return apiPost({ action: "reset" });
}

async function redirectPresentation() {
  return apiPost({ action: "redirect" });
}

function startStatsPoller(startTime) {
  return setInterval(async () => {
    try {
      const stats = await getStats();
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);

      if (stats.version < prevVersion) outOfOrder++;
      prevVersion = stats.version;

      if (stats.participantCount < lastParticipantCount && !ignoreDrops)
        countDrops++;
      ignoreDrops = false;
      lastParticipantCount = stats.participantCount;

      console.log(
        `  [${pad(elapsed, 4)}s]  ` +
          `participants: ${pad(stats.participantCount, 4)}  ` +
          `clients: ${pad(stats.totalClients, 7)}  ` +
          `revenue: $${pad(stats.totalPotentielRevenu?.toLocaleString(), 12)}  ` +
          `ver: ${pad(stats.version, 4)}  ` +
          `drops: ${countDrops}  ` +
          `ooo: ${outOfOrder}  ` +
          `redirect: ${stats.redirectToLogitext}`,
      );
    } catch (e) {
      console.log(`  [Stats] Error: ${e.message}`);
    }
  }, STATS_POLL_MS);
}

async function run() {
  console.log("");
  console.log("  ClickOn Load Test (Full)");
  console.log("  ========================");
  console.log(`  Target:       ${BASE_URL}`);
  console.log(`  Connections:  ${NUM_CONNECTIONS}`);
  console.log(`  Clients:      100-3000 per participant`);
  console.log(`  Commission:   $3,000-$10,000 per participant`);
  console.log("");

  // =========================================================================
  // Phase 1: Ramp Up - participants join steadily over 15s
  // =========================================================================
  await resetPresentation();
  const activeParticipants = new Map();
  const startTime = Date.now();
  const statsInterval = startStatsPoller(startTime);

  console.log(`  --- Phase 1: Ramp Up (${NUM_CONNECTIONS} joins over ~15s) ---`);
  const delayBetweenJoins = Math.max(20, Math.floor(15000 / NUM_CONNECTIONS));

  for (let i = 0; i < NUM_CONNECTIONS; i++) {
    const id = crypto.randomUUID();
    try {
      await joinPresentation(id);
      activeParticipants.set(id, Date.now());
      totalJoins++;
    } catch (e) {
      errors++;
    }
    await sleep(delayBetweenJoins);
  }
  await sleep(3000);

  // =========================================================================
  // Phase 2: Burst - 20 participants join simultaneously
  // =========================================================================
  const burstCount = Math.min(20, Math.floor(NUM_CONNECTIONS * 0.3));
  console.log(`\n  --- Phase 2: Burst (${burstCount} simultaneous joins) ---`);

  const burstPromises = [];
  for (let i = 0; i < burstCount; i++) {
    const id = crypto.randomUUID();
    burstPromises.push(
      joinPresentation(id)
        .then(() => {
          activeParticipants.set(id, Date.now());
          totalJoins++;
        })
        .catch(() => errors++),
    );
  }
  await Promise.all(burstPromises);
  await sleep(5000);

  // =========================================================================
  // Phase 3: Churn - 15% replaced every 1s for 20s (rapid tab close/reopen)
  // =========================================================================
  console.log("\n  --- Phase 3: Churn (15% replaced every 1s for 20s) ---");
  const churnEnd = Date.now() + 20000;

  while (Date.now() < churnEnd) {
    const ids = Array.from(activeParticipants.keys());
    const numToChurn = Math.max(1, Math.floor(ids.length * 0.15));

    const churnPromises = [];
    for (let i = 0; i < numToChurn; i++) {
      const removeIdx = Math.floor(Math.random() * ids.length);
      activeParticipants.delete(ids[removeIdx]);

      const newId = crypto.randomUUID();
      churnPromises.push(
        joinPresentation(newId)
          .then(() => {
            activeParticipants.set(newId, Date.now());
            totalJoins++;
            totalChurns++;
          })
          .catch(() => errors++),
      );
    }
    await Promise.all(churnPromises);
    await sleep(1000);
  }
  await sleep(3000);

  // =========================================================================
  // Phase 4: Re-submit - existing participants update their data
  // =========================================================================
  const resubmitCount = Math.min(15, activeParticipants.size);
  console.log(
    `\n  --- Phase 4: Re-submit (${resubmitCount} participants update data) ---`,
  );

  const existingIds = Array.from(activeParticipants.keys()).slice(
    0,
    resubmitCount,
  );
  const resubPromises = existingIds.map((id) =>
    joinPresentation(id)
      .then(() => totalUpdates++)
      .catch(() => errors++),
  );
  await Promise.all(resubPromises);
  await sleep(5000);

  // =========================================================================
  // Phase 5: Redirect - presenter triggers redirect to Logitext
  // =========================================================================
  console.log("\n  --- Phase 5: Redirect ---");
  try {
    const redirectResult = await redirectPresentation();
    console.log(`  Redirect sent. Success: ${redirectResult.success}`);
  } catch (e) {
    console.log(`  Redirect error: ${e.message}`);
    errors++;
  }

  await sleep(3000);

  // =========================================================================
  // Phase 6: Reset - verify clean state
  // =========================================================================
  console.log("\n  --- Phase 6: Reset & Verify ---");
  const preResetStats = await getStats();
  ignoreDrops = true;
  await resetPresentation();
  await sleep(1000);
  const postResetStats = await getStats();

  console.log(
    `  Pre-reset participants:  ${preResetStats.participantCount}`,
  );
  console.log(
    `  Post-reset participants: ${postResetStats.participantCount}`,
  );
  console.log(
    `  Reset worked: ${postResetStats.participantCount === 0 && !postResetStats.redirectToLogitext ? "YES" : "FAIL"}`,
  );

  clearInterval(statsInterval);

  // =========================================================================
  // Final Report
  // =========================================================================
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("");
  console.log("  ========== RESULTS ==========");
  console.log(`  Duration:              ${duration}s`);
  console.log(`  Total joins:           ${totalJoins}`);
  console.log(`  Total re-submits:      ${totalUpdates}`);
  console.log(`  Total churns:          ${totalChurns}`);
  console.log(`  Errors:                ${errors}`);
  console.log(`  Peak participants:     ${preResetStats.participantCount}`);
  console.log(`  Peak clients:          ${preResetStats.totalClients}`);
  console.log(
    `  Peak revenue:          $${preResetStats.totalPotentielRevenu?.toLocaleString()}`,
  );
  console.log(`  Final version:         ${preResetStats.version}`);
  console.log(`  Count drops detected:  ${countDrops}`);
  console.log(`  Out-of-order detected: ${outOfOrder}`);
  console.log(`  Reset clean:           ${postResetStats.participantCount === 0}`);
  console.log("");

  const issues = [];
  if (countDrops > 0)
    issues.push("Count drops detected (presenter version check should mask these)");
  if (outOfOrder > 0)
    issues.push("Out-of-order responses detected (version check should reject these)");
  if (errors > 0) issues.push(`${errors} API errors occurred`);
  if (postResetStats.participantCount !== 0)
    issues.push("Reset did not clear participants");
  if (postResetStats.redirectToLogitext)
    issues.push("Reset did not clear redirect flag");

  if (issues.length === 0) {
    console.log("  ALL TESTS PASSED");
  } else {
    console.log("  ISSUES:");
    issues.forEach((issue) => console.log(`    - ${issue}`));
  }
  console.log("");
}

run().catch(console.error);
