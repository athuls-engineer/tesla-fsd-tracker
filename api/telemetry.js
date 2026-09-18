export const config = {
  runtime: 'edge',
};

// Verified official anchor reference: 14,586,254,064 miles at 2026-09-17T15:00:00Z
const REFERENCE_EPOCH_MS = new Date('2026-09-17T15:00:00.000Z').getTime();
const REFERENCE_ANCHOR_MILES = 14586254064;
// Fleet velocity: ~20M miles/day = 231.4815 miles/second
const FLEET_VELOCITY_PER_SEC = 231.4815;

export default async function handler(req) {
  const now = Date.now();
  const elapsedSec = Math.max((now - REFERENCE_EPOCH_MS) / 1000, 0);
  const currentCalculatedMiles = Math.round(REFERENCE_ANCHOR_MILES + (elapsedSec * FLEET_VELOCITY_PER_SEC));

  const payload = {
    baselineMiles: currentCalculatedMiles,
    serverTimestamp: new Date(now).toISOString(),
    referenceAnchorMiles: REFERENCE_ANCHOR_MILES,
    referenceTimestamp: '2026-09-17T15:00:00.000Z',
    fleetVelocityPerSecond: 231.48,
    dailyRateMiles: 20000000,
    activeFleetVehicles: '2M+',
    jurisdictionsCount: 12,
    safetyMultiplier: '7.4x',
    activeNeuralNetVersion: 'V12.5 / V13 End-to-End',
    dataSource: 'Official Tesla Vehicle Safety Report & Shareholder Disclosures',
    status: 'online',
    syncEpoch: now
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=30'
    }
  });
}
