import { CSSProperties } from "react";

/*
  Nurai visual family: original abstract blue assets built as inline SVG/CSS.
  Everything here is created from scratch. One shared language: dark navy
  surfaces, electric-blue ribbons, node lines, token particles, interface
  fragments.
*/

export function RibbonVisual({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 1400 620" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="rb-a" x1="0" y1="300" x2="1400" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f7bff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#3f8fff" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#00c2ff" stopOpacity="0.85" />
          <stop offset="0.8" stopColor="#2f7bff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#2f7bff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rb-b" x1="0" y1="0" x2="1400" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8fc0ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#8fc0ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8fc0ff" stopOpacity="0" />
        </linearGradient>
        <filter id="rb-blur" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="rb-soft" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <path d="M-40 380 C 260 180, 520 480, 760 300 S 1240 140, 1460 260" stroke="url(#rb-a)" strokeWidth="120" strokeLinecap="round" filter="url(#rb-blur)" opacity="0.55" />
      <path d="M-40 380 C 260 180, 520 480, 760 300 S 1240 140, 1460 260" stroke="url(#rb-a)" strokeWidth="46" strokeLinecap="round" filter="url(#rb-soft)" opacity="0.9" />
      <path d="M-40 420 C 300 250, 560 520, 820 340 S 1260 200, 1460 320" stroke="url(#rb-b)" strokeWidth="2" opacity="0.8" />
      <path d="M-40 340 C 240 140, 540 430, 780 260 S 1220 100, 1460 210" stroke="url(#rb-b)" strokeWidth="1.4" opacity="0.55" />
      {[
        [180, 296], [420, 366], [640, 330], [905, 232], [1120, 208], [1275, 235],
      ].map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={index % 2 ? 2.4 : 3.4} fill="#bfe0ff" opacity={0.85 - index * 0.08} />
      ))}
    </svg>
  );
}

export function MeshVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="mesh-l" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3f8fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#00c2ff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, row) => (
        <path
          key={row}
          d={`M0 ${70 + row * 44} C 150 ${30 + row * 46}, 300 ${104 + row * 42}, 600 ${58 + row * 44}`}
          stroke="url(#mesh-l)"
          strokeWidth="1"
          opacity={1 - row * 0.11}
        />
      ))}
      {Array.from({ length: 9 }).map((_, col) => (
        <circle key={col} cx={40 + col * 65} cy={90 + ((col * 53) % 180)} r="2.2" fill="#8fc0ff" opacity={0.7 - (col % 4) * 0.12} />
      ))}
    </svg>
  );
}

/* --- Ecosystem card visuals: four distinct fragments, one family --- */

export function CourseLayersVisual() {
  return (
    <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: "100%", height: "100%" }}>
      {[0, 1, 2].map(layer => (
        <g key={layer} opacity={1 - layer * 0.28} transform={`translate(${layer * 26} ${layer * -14})`}>
          <rect x="20" y={64 + layer * 4} width="200" height="52" rx="10" fill="#0c1830" stroke="#2c4d8f" strokeWidth="1" />
          <rect x="34" y={78 + layer * 4} width="80" height="7" rx="3.5" fill="#3f8fff" opacity="0.75" />
          <rect x="34" y={92 + layer * 4} width="130" height="6" rx="3" fill="#24406f" />
        </g>
      ))}
      <circle cx="268" cy="46" r="20" stroke="#00c2ff" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="268" cy="46" r="8" fill="#2f7bff" opacity="0.7" />
    </svg>
  );
}

export function PromptCardsVisual() {
  return (
    <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: "100%", height: "100%" }}>
      <rect x="24" y="26" width="180" height="86" rx="12" fill="#0b1628" stroke="#2c4d8f" strokeWidth="1" transform="rotate(-3 24 26)" />
      <rect x="52" y="20" width="180" height="86" rx="12" fill="#0e1c36" stroke="#3f6ecb" strokeWidth="1" />
      <rect x="66" y="36" width="60" height="8" rx="4" fill="#00c2ff" opacity="0.7" />
      <rect x="66" y="52" width="140" height="6" rx="3" fill="#28497e" />
      <rect x="66" y="64" width="120" height="6" rx="3" fill="#28497e" />
      <rect x="66" y="82" width="72" height="14" rx="7" fill="#2f7bff" opacity="0.55" />
      <path d="M266 40 l10 10 -10 10" stroke="#8fc0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M252 96 h34" stroke="#8fc0ff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function WorkflowNodesVisual() {
  const nodes = [[36, 66], [122, 38], [122, 96], [212, 66], [286, 66]] as const;
  return (
    <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: "100%", height: "100%" }}>
      <path d="M52 66 L106 42 M52 66 L106 94 M138 40 L196 62 M138 94 L196 70 M228 66 L270 66" stroke="#2f7bff" strokeOpacity="0.55" strokeWidth="1.4" />
      {nodes.map(([x, y], index) => (
        <g key={index}>
          <rect x={x - 16} y={y - 14} width="32" height="28" rx="8" fill="#0c1830" stroke={index === 3 ? "#00c2ff" : "#33589c"} strokeWidth="1.2" />
          <circle cx={x} cy={y} r="4" fill={index === 3 ? "#00c2ff" : "#3f8fff"} opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export function ProjectWindowVisual() {
  return (
    <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: "100%", height: "100%" }}>
      <rect x="30" y="18" width="260" height="100" rx="12" fill="#0b1628" stroke="#2c4d8f" strokeWidth="1" />
      <path d="M30 42 h260" stroke="#22406f" strokeWidth="1" />
      <circle cx="46" cy="30" r="3" fill="#1d2c4a" /><circle cx="58" cy="30" r="3" fill="#1d2c4a" /><circle cx="70" cy="30" r="3" fill="#1d2c4a" />
      <rect x="46" y="56" width="92" height="48" rx="8" fill="#122240" />
      <path d="M56 92 l16 -14 12 8 20 -18 12 10" stroke="#00c2ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="152" y="56" width="120" height="8" rx="4" fill="#3f8fff" opacity="0.7" />
      <rect x="152" y="72" width="96" height="6" rx="3" fill="#28497e" />
      <rect x="152" y="84" width="110" height="6" rx="3" fill="#28497e" />
      <rect x="152" y="96" width="60" height="10" rx="5" fill="#2f7bff" opacity="0.5" />
    </svg>
  );
}

/* --- Project preview art: deterministic variation per index --- */
export function ProjectPreviewArt({ seed }: { seed: number }) {
  // offset per row so adjacent rows don't repeat the same column pattern
  const variant = (seed + Math.floor(seed / 3)) % 3;
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`pv-${seed}`} x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3f8fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#00c2ff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="42" y="30" width="316" height="188" rx="14" fill="#0a1426" stroke="#2c4d8f" strokeWidth="1" />
      <path d="M42 58 h316" stroke="#20396275" strokeWidth="1" />
      <circle cx="60" cy="44" r="3.4" fill="#1d2c4a" /><circle cx="74" cy="44" r="3.4" fill="#1d2c4a" /><circle cx="88" cy="44" r="3.4" fill="#1d2c4a" />
      {variant === 0 && (
        <g>
          <rect x="64" y="76" width="110" height="10" rx="5" fill="#3f8fff" opacity="0.8" />
          <rect x="64" y="98" width="270" height="7" rx="3.5" fill="#24406f" />
          <rect x="64" y="112" width="240" height="7" rx="3.5" fill="#24406f" />
          <rect x="64" y="126" width="256" height="7" rx="3.5" fill="#24406f" />
          <rect x="64" y="148" width="120" height="26" rx="9" fill={`url(#pv-${seed})`} stroke="#33589c" strokeWidth="1" />
        </g>
      )}
      {variant === 1 && (
        <g>
          <rect x="64" y="76" width="126" height="98" rx="10" fill="#101f3c" />
          <path d="M76 152 l24 -26 18 14 26 -32 20 18" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="206" y="76" width="128" height="10" rx="5" fill="#3f8fff" opacity="0.8" />
          <rect x="206" y="98" width="112" height="7" rx="3.5" fill="#24406f" />
          <rect x="206" y="112" width="126" height="7" rx="3.5" fill="#24406f" />
          <rect x="206" y="134" width="84" height="20" rx="8" fill="#2f7bff" opacity="0.4" />
        </g>
      )}
      {variant === 2 && (
        <g>
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect x={64 + i * 94} y="80" width="80" height="60" rx="10" fill="#101f3c" stroke="#2c4d8f" strokeWidth="1" />
              <circle cx={104 + i * 94} cy="102" r="7" fill={i === 1 ? "#00c2ff" : "#3f8fff"} opacity="0.8" />
              <rect x={78 + i * 94} y="118" width="52" height="6" rx="3" fill="#24406f" />
            </g>
          ))}
          <path d="M144 110 h14 M238 110 h14" stroke="#3f8fff" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="64" y="156" width="270" height="8" rx="4" fill="#24406f" />
        </g>
      )}
    </svg>
  );
}
