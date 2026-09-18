import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const REFERENCE_EPOCH_MS = new Date('2026-09-17T15:00:00.000Z').getTime();
const REFERENCE_ANCHOR_MILES = 14586254064;
const FLEET_VELOCITY_PER_SEC = 231.4815;

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Allow override or dynamically compute
    let milesParam = searchParams.get('miles');
    let milesNumber;

    if (milesParam) {
      milesNumber = Number(milesParam);
    } else {
      const now = Date.now();
      const elapsedSec = Math.max((now - REFERENCE_EPOCH_MS) / 1000, 0);
      milesNumber = Math.round(REFERENCE_ANCHOR_MILES + (elapsedSec * FLEET_VELOCITY_PER_SEC));
    }

    const unit = searchParams.get('unit') === 'km' ? 'KM' : 'MILES';
    const displayValue = (unit === 'KM' ? milesNumber * 1.609344 : milesNumber).toLocaleString('en-US', {
      maximumFractionDigits: 0
    });

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#050505',
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(232, 33, 39, 0.18) 0%, transparent 60%)',
            padding: '60px 70px',
            fontFamily: 'sans-serif',
            color: '#ffffff',
          }}
        >
          {/* Top Row: Tesla Brand + Live Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Tesla Wordmark SVG */}
              <svg
                width="160"
                height="22"
                viewBox="0 0 342 35"
                fill="#ffffff"
              >
                <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" />
              </svg>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(52, 199, 89, 0.15)',
                border: '1px solid rgba(52, 199, 89, 0.4)',
                borderRadius: '30px',
                padding: '8px 20px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#34c759',
                  marginRight: '10px',
                }}
              />
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#34c759', letterSpacing: '1px' }}>
                7.4X SAFER THAN US AVERAGE
              </span>
            </div>
          </div>

          {/* Center: The Massive Telemetry Milestone */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#888888', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Full Self-Driving (Supervised) Fleet Telemetry
            </div>
            
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                fontSize: '82px',
                fontWeight: 900,
                letterSpacing: '-2px',
                color: '#ffffff',
                marginTop: '10px',
              }}
            >
              <span>{displayValue}</span>
              <span style={{ fontSize: '48px', fontWeight: 800, color: '#e82127', marginLeft: '16px' }}>
                {unit}
              </span>
            </div>

            <div style={{ fontSize: '22px', color: '#aaaaaa', marginTop: '12px', display: 'flex', alignItems: 'center' }}>
              <span>2M+ Active Autonomous Vehicles</span>
              <span style={{ margin: '0 12px', color: '#555555' }}>•</span>
              <span>12 Countries &amp; Territories</span>
              <span style={{ margin: '0 12px', color: '#555555' }}>•</span>
              <span>V12 / V13 Neural Nets</span>
            </div>
          </div>

          {/* Bottom: URL + Verification */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '24px',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#e82127', letterSpacing: '1px' }}>
              tesla-fsd-live.vercel.app
            </span>
            <span style={{ fontSize: '16px', color: '#777777' }}>
              Official Telematics Benchmark • Real-Time Odometer
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
