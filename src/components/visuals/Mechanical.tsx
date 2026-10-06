/**
 * Custom mechanical illustrations — original SVG artwork created for this site.
 * Animations are pure CSS (classes a-* in globals.css), so they cost almost nothing,
 * pause off-screen and switch off under prefers-reduced-motion.
 * Shared gradients live in <SvgDefs/> (rendered once in the root layout).
 */
import type { VisualKey } from "@/data/services";
import type { ReactElement } from "react";

function gearPath(cx: number, cy: number, teeth: number, ro: number, ri: number) {
  const step = (Math.PI * 2) / teeth;
  const p = (a: number, r: number) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i ? "L" : "M"}${p(a, ri)}L${p(a + step * 0.12, ro)}L${p(a + step * 0.38, ro)}L${p(a + step * 0.5, ri)}`;
  }
  return d + "Z";
}

export function SvgDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="mm-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f8f6" />
          <stop offset=".45" stopColor="#b9c1bd" />
          <stop offset="1" stopColor="#4f555c" />
        </linearGradient>
        <linearGradient id="mm-metal-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5c636b" />
          <stop offset=".5" stopColor="#e9eeeb" />
          <stop offset="1" stopColor="#5c636b" />
        </linearGradient>
        <linearGradient id="mm-brand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe07a" />
          <stop offset=".5" stopColor="#f5b301" />
          <stop offset="1" stopColor="#9a6a00" />
        </linearGradient>
        <linearGradient id="mm-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#31363c" />
          <stop offset="1" stopColor="#101216" />
        </linearGradient>
        <radialGradient id="mm-flame" cx=".5" cy=".6" r=".5">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset=".45" stopColor="#ffc233" />
          <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mm-oil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd466" />
          <stop offset="1" stopColor="#b86e00" />
        </linearGradient>
        <linearGradient id="mm-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Clip paths for the oil bottle (shared, like the gradients). */}
        <clipPath id="mm-oil-bottle"><rect x="62" y="56" width="76" height="112" rx="12" /></clipPath>
        <clipPath id="mm-oil-window"><rect x="80" y="84" width="40" height="60" rx="9" /></clipPath>
        <radialGradient id="mm-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#f5b301" stopOpacity=".55" />
          <stop offset="1" stopColor="#f5b301" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const Glow = () => <circle cx="100" cy="100" r="92" fill="url(#mm-glow)" className="a-glow" />;

const Gear = ({ cx, cy, t, ro, ri, cls, fill = "url(#mm-metal)", dur }: { cx: number; cy: number; t: number; ro: number; ri: number; cls: string; fill?: string; dur?: string }) => (
  <g className={cls} style={dur ? { animationDuration: dur } : undefined}>
    <path d={gearPath(cx, cy, t, ro, ri)} fill={fill} stroke="#1a1f1d" strokeWidth="1.5" />
    <circle cx={cx} cy={cy} r={ri * 0.55} fill="url(#mm-dark)" stroke="#f5b301" strokeWidth="2" />
    <circle cx={cx} cy={cy} r={ri * 0.18} fill="#cbd0d6" />
  </g>
);

const art: Record<VisualKey, () => ReactElement> = {
  gear: () => (
    <>
      <Glow />
      <Gear cx={82} cy={90} t={14} ro={52} ri={43} cls="a-spin" />
      <Gear cx={142} cy={140} t={10} ro={34} ri={27} cls="a-spin-rev" fill="url(#mm-brand)" />
    </>
  ),
  scanner: () => (
    <>
      <Glow />
      <rect x="38" y="30" width="124" height="140" rx="16" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="4" />
      <rect x="50" y="44" width="100" height="78" rx="6" fill="#120e02" stroke="#c48a00" strokeWidth="1.5" />
      {[62, 80, 98].map((y) => <line key={y} x1="54" x2="146" y1={y} y2={y} stroke="#c48a00" strokeOpacity=".25" />)}
      <path d="M54 92 L70 92 L76 70 L84 110 L92 60 L100 100 L108 84 L116 92 L146 92" fill="none" stroke="#ffd24a" strokeWidth="2.5" className="a-dash" strokeLinejoin="round" />
      <rect x="50" y="44" width="100" height="3" fill="#ffd24a" opacity=".7" className="a-scan" style={{ ["--scan" as string]: "74px" }} />
      <circle cx="78" cy="146" r="9" fill="#f5b301" className="a-blink" />
      <rect x="96" y="139" width="44" height="14" rx="7" fill="#2c3036" />
      <text x="100" y="116" fill="#f5b301" fontSize="9" fontFamily="monospace" textAnchor="middle">OBD-II OK</text>
      <path d="M100 170 C100 186 130 186 140 192" stroke="url(#mm-metal)" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  engine: () => {
    // Three cylinders, 120° apart: each fires (plug spark + flash) as its piston reaches the top.
    const cyl = [
      { x: 62, delay: "0s" },
      { x: 100, delay: "-0.8s" },
      { x: 138, delay: "-0.4s" },
    ];
    return (
      <>
        <Glow />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="160" cy="46" r="7" fill="#9ba1a9" className="a-puff" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
        <g className="a-shake">
          <rect x="148" y="48" width="18" height="8" rx="3" fill="url(#mm-metal-h)" />
          <rect x="40" y="58" width="120" height="96" rx="10" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="3" />
          <rect x="52" y="44" width="96" height="20" rx="5" fill="url(#mm-metal)" />
          {cyl.map(({ x, delay }) => (
            <g key={x}>
              <rect x={x - 3} y={32} width={6} height={13} rx="1.5" fill="#cbd0d6" />
              <circle cx={x} cy={30} r="4.5" fill="#fff6d6" className="a-spark" style={{ animationDelay: delay }} />
              <rect x={x - 13} y={66} width={26} height={62} rx="3" fill="#0c0d0f" />
              <g className="a-piston" style={{ animationDelay: delay }}>
                <rect x={x - 11} y={70} width={22} height={18} rx="3" fill="url(#mm-metal)" />
                <rect x={x - 11} y={74} width={22} height={2} fill="#4f555c" />
                <rect x={x - 3} y={88} width={6} height={30} fill="#9ba1a9" />
              </g>
              <ellipse cx={x} cy={69} rx="12" ry="8" fill="url(#mm-flame)" className="a-fire" style={{ animationDelay: delay }} />
            </g>
          ))}
        </g>
        {/* Timing gears: 12 and 8 teeth, so the small one turns 1.5× faster in reverse. */}
        <Gear cx={92} cy={172} t={12} ro={20} ri={15} cls="a-spin" dur="2.4s" fill="url(#mm-brand)" />
        <Gear cx={125} cy={176} t={8} ro={14} ri={10} cls="a-spin-rev" dur="1.6s" />
      </>
    );
  },
  piston: () => (
    <>
      <Glow />
      <rect x="58" y="30" width="84" height="110" rx="6" fill="#0c0d0f" stroke="url(#mm-metal)" strokeWidth="3" />
      <g className="a-piston">
        <rect x="64" y="42" width="72" height="42" rx="6" fill="url(#mm-metal)" />
        {[50, 57, 64].map((y) => <rect key={y} x="64" y={y} width="72" height="2.5" fill="#4f555c" />)}
        <circle cx="100" cy="76" r="6" fill="#2c3036" />
        <path d="M94 78 L88 150 L112 150 L106 78 Z" fill="#9ba1a9" />
        <circle cx="100" cy="156" r="16" fill="none" stroke="#9ba1a9" strokeWidth="8" />
      </g>
      {[[70, 38], [90, 34], [118, 37], [128, 40], [80, 36]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#f5b301" className="a-blink" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </>
  ),
  injector: () => (
    <>
      <Glow />
      <rect x="84" y="20" width="32" height="26" rx="4" fill="url(#mm-brand)" />
      <rect x="88" y="46" width="24" height="70" rx="4" fill="url(#mm-metal)" />
      {[58, 70, 82].map((y) => <rect key={y} x="86" y={y} width="28" height="4" rx="2" fill="#2c3036" />)}
      <path d="M92 116 L108 116 L103 136 L97 136 Z" fill="#9ba1a9" />
      <g className="a-spray">
        <path d="M100 138 L70 186 Q100 196 130 186 Z" fill="#ffd24a" opacity=".35" />
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={78 + (i % 6) * 9} cy={156 + Math.floor(i / 6) * 16} r="2" fill="#fff0b8" />
        ))}
      </g>
    </>
  ),
  catalytic: () => (
    <>
      <Glow />
      <rect x="10" y="88" width="46" height="24" rx="4" fill="url(#mm-metal)" />
      <rect x="144" y="88" width="46" height="24" rx="4" fill="url(#mm-metal)" />
      <path d="M48 70 Q56 60 70 60 L130 60 Q144 60 152 70 L152 130 Q144 140 130 140 L70 140 Q56 140 48 130 Z" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="4" />
      <g opacity=".85">
        {[...Array(5)].map((_, r) =>
          [...Array(7)].map((_, c) => (
            <polygon key={`${r}-${c}`} points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" transform={`translate(${70 + c * 10 + (r % 2) * 5} ${76 + r * 12})`} fill="none" stroke="#f5b301" strokeWidth="1.2" />
          )),
        )}
      </g>
      {[78, 100, 122].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#ffd24a" strokeWidth="2" className="a-flow" opacity=".7" />)}
    </>
  ),
  hybrid: () => (
    <>
      <Glow />
      <rect x="18" y="64" width="86" height="72" rx="8" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={28 + i * 18} y="76" width="12" height="48" rx="3" fill="url(#mm-brand)" opacity={0.55 + i * 0.12} />)}
      <path d="M104 100 L132 100" stroke="#ffd24a" strokeWidth="4" className="a-flow" />
      <circle cx="160" cy="100" r="30" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="4" />
      <g className="a-spin-fast">
        {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x="157" y="76" width="6" height="18" rx="3" fill="#f5b301" transform={`rotate(${a} 160 100)`} />)}
      </g>
      <path d="M58 40 L50 56 L60 56 L52 72" stroke="#ffd24a" strokeWidth="4" fill="none" className="a-blink" strokeLinejoin="round" />
    </>
  ),
  ac: () => (
    <>
      <Glow />
      <rect x="30" y="30" width="140" height="140" rx="14" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="3" />
      {[...Array(9)].map((_, i) => <line key={i} x1={44 + i * 14} x2={44 + i * 14} y1="40" y2="160" stroke="#31363c" strokeWidth="3" />)}
      <circle cx="100" cy="100" r="50" fill="#0c0d0f" stroke="#f5b301" strokeWidth="2" />
      <g className="a-spin-fast">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M100 100 C 96 78, 108 60, 122 58 C 118 76, 112 90, 100 100 Z" fill="url(#mm-metal)" transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
      <circle cx="100" cy="100" r="8" fill="#f5b301" />
      {[70, 100, 130].map((y) => <path key={y} d={`M172 ${y} q8 -6 16 0 t16 0`} stroke="#9fd8ff" strokeWidth="2.5" fill="none" className="a-flow" />)}
    </>
  ),
  suspension: () => (
    <>
      <Glow />
      <g className="a-spring-top">
        <rect x="80" y="18" width="40" height="14" rx="4" fill="url(#mm-metal)" />
        <rect x="94" y="30" width="12" height="60" fill="#cbd0d6" />
      </g>
      <g className="a-spring">
        <path d="M70 52 L130 64 L70 76 L130 88 L70 100 L130 112 L70 124 L130 136 L70 148" stroke="url(#mm-brand)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="88" y="90" width="24" height="76" rx="5" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="2.5" />
      <rect x="76" y="164" width="48" height="14" rx="4" fill="url(#mm-metal)" />
    </>
  ),
  brake: () => (
    <>
      <Glow />
      <g className="a-spin">
        <circle cx="100" cy="100" r="74" fill="url(#mm-metal)" stroke="#4f555c" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#7c8581" strokeWidth="1" />
        {[...Array(18)].map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          return <circle key={i} cx={+(100 + 52 * Math.cos(a)).toFixed(2)} cy={+(100 + 52 * Math.sin(a)).toFixed(2)} r="3.2" fill="#2c3036" />;
        })}
        <circle cx="100" cy="100" r="30" fill="url(#mm-dark)" />
        {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx="100" cy="82" r="4" fill="#cbd0d6" transform={`rotate(${a} 100 100)`} />)}
      </g>
      <path d="M150 42 Q182 60 184 100 Q182 140 150 158 L140 142 Q164 126 164 100 Q164 74 140 58 Z" fill="url(#mm-brand)" stroke="#3d2c00" strokeWidth="2" />
      <text x="165" y="104" fontSize="8" fontWeight="700" fill="#111111" textAnchor="middle" transform="rotate(90 165 100)">MM</text>
    </>
  ),
  oil: () => (
    <>
      <Glow />
      {/* A drop forms above the filler, falls in and splashes; the level sloshes in the sight glass.
          Drop, splash and bubbles use SVG (SMIL) animation — CSS keyframes did not paint reliably here. */}
      <g className="smil-anim">
        <path d="M100 4 C 100 4, 92 15, 92 20 a8 8 0 0 0 16 0 C108 15, 100 4, 100 4 Z" fill="#f2a900" opacity="0">
          <animate attributeName="opacity" values="0;1;1;1;0;0" keyTimes="0;.18;.48;.66;.72;1" dur="2.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 -4;0 0;0 0;0 24;0 28;0 28" keyTimes="0;.18;.48;.68;.72;1" dur="2.4s" repeatCount="indefinite" />
        </path>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;.69;.74;.92;1" dur="2.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 4;0 4;0 -1;0 -9;0 -9" keyTimes="0;.69;.74;.92;1" dur="2.4s" repeatCount="indefinite" />
          <circle cx="90" cy="38" r="2.6" fill="#ffc233" />
          <circle cx="110" cy="36" r="2.2" fill="#ffc233" />
          <circle cx="100" cy="33" r="1.8" fill="#ffd466" />
        </g>
      </g>
      <rect x="62" y="56" width="76" height="112" rx="12" fill="url(#mm-brand)" />
      {[80, 150].map((y) => <rect key={y} x="62" y={y} width="76" height="4" fill="#3d2c00" opacity=".55" />)}
      <rect x="78" y="82" width="44" height="64" rx="11" fill="#1a1406" stroke="#3d2c00" strokeWidth="2" />
      <g clipPath="url(#mm-oil-window)">
        <g className="a-level">
          <path className="a-wave" d="M40 108 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V160 H40 Z" fill="url(#mm-oil)" />
          <path className="a-wave-rev" d="M40 112 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V160 H40 Z" fill="#b86e00" opacity=".55" />
        </g>
        {[0, 1, 2].map((i) => (
          <circle key={i} className="smil-anim" cx={90 + i * 10} cy="138" r="1.8" fill="#fff3c4" opacity="0">
            <animate attributeName="cy" values="138;92" dur="2.1s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;.9;0" keyTimes="0;.2;1" dur="2.1s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {[96, 110, 124].map((y) => <line key={y} x1="114" x2="120" y1={y} y2={y} stroke="#fff3c4" strokeOpacity=".6" strokeWidth="1.5" />)}
      <text x="100" y="164" fontSize="8" fontWeight="800" fill="#3d2c00" textAnchor="middle" fontFamily="sans-serif">5W-30</text>
      <g clipPath="url(#mm-oil-bottle)">
        <g transform="skewX(-14)">
          <rect x="40" y="50" width="26" height="130" fill="url(#mm-sheen)" className="a-sheen" />
        </g>
      </g>
      <rect x="74" y="40" width="52" height="20" rx="4" fill="url(#mm-metal)" />
      <rect x="92" y="34" width="16" height="8" rx="2" fill="url(#mm-metal-h)" />
    </>
  ),
  battery: () => (
    <>
      <Glow />
      <rect x="36" y="58" width="128" height="100" rx="12" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="4" />
      <rect x="56" y="44" width="22" height="16" rx="3" fill="url(#mm-metal)" />
      <rect x="122" y="44" width="22" height="16" rx="3" fill="url(#mm-metal)" />
      <text x="67" y="84" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="700">−</text>
      <text x="133" y="84" fontSize="16" fill="#f5b301" textAnchor="middle" fontWeight="700">+</text>
      <rect x="52" y="112" width="96" height="26" rx="5" fill="#120e02" stroke="#c48a00" />
      <rect x="55" y="115" width="90" height="20" rx="3" fill="url(#mm-brand)" className="a-charge" />
      <path d="M104 88 L92 108 L102 108 L96 124 L112 102 L102 102 Z" fill="#fff" className="a-blink" transform="translate(0 -6)" />
    </>
  ),
  inspection: () => (
    <>
      <Glow />
      <path d="M22 128 L32 102 Q40 86 58 84 L78 66 Q86 60 100 60 L130 60 Q144 60 152 70 L166 86 Q180 88 182 102 L182 128 Z" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M84 70 L98 70 L98 86 L66 86 Z M106 70 L130 70 L148 86 L106 86 Z" fill="#1d2a22" stroke="#f5b301" strokeWidth="1.2" />
      {[60, 146].map((x) => (
        <g key={x}>
          <circle cx={x} cy="130" r="20" fill="#0c0d0f" stroke="url(#mm-metal)" strokeWidth="4" />
          <circle cx={x} cy="130" r="7" fill="#9ba1a9" />
        </g>
      ))}
      <rect x="18" y="44" width="4" height="104" rx="2" fill="#ffd24a" opacity=".9" className="a-sweep" />
      {[[52, 168], [100, 40], [150, 168]].map(([x, y], i) => (
        <g key={i} className="a-blink" style={{ animationDelay: `${i * 0.45}s` }}>
          <circle cx={x} cy={y} r="10" fill="#f5b301" />
          <path d={`M${x - 5} ${y} l3.5 4 l7 -8`} stroke="#111111" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </>
  ),
  electrical: () => (
    <>
      <Glow />
      <rect x="60" y="60" width="80" height="80" rx="10" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="3" />
      <text x="100" y="106" fontSize="14" fontFamily="monospace" fill="#f5b301" textAnchor="middle">ECU</text>
      {[
        "M60 80 H30 V40", "M60 120 H24 V168", "M140 80 H176 V36", "M140 120 H172 V170",
        "M84 60 V24 H48", "M116 140 V178 H150",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#31363c" strokeWidth="5" fill="none" />
          <path d={d} stroke="#ffd24a" strokeWidth="2.5" fill="none" className="a-flow" style={{ animationDelay: `${i * 0.2}s` }} />
        </g>
      ))}
      {[[30, 40], [24, 168], [176, 36], [172, 170], [48, 24], [150, 178]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#f5b301" className="a-blink" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </>
  ),
  tow: () => (
    <>
      <Glow />
      <path d="M30 130 L30 96 L70 96 L84 74 L116 74 L116 130 Z" fill="url(#mm-brand)" />
      <rect x="116" y="112" width="60" height="18" fill="url(#mm-metal)" />
      <path d="M150 112 L178 64" stroke="url(#mm-metal)" strokeWidth="6" />
      <path d="M178 64 L178 88 q0 8 -8 8" stroke="#cbd0d6" strokeWidth="4" fill="none" />
      {[56, 150].map((x) => <circle key={x} cx={x} cy="136" r="16" fill="#0c0d0f" stroke="url(#mm-metal)" strokeWidth="4" />)}
      <circle cx="100" cy="66" r="5" fill="#ff8a3d" className="a-blink" />
    </>
  ),
};

/** Renders the illustration for a service/visual key. Decorative by default. */
export function MechanicalArt({ kind, className = "", label }: { kind: VisualKey; className?: string; label?: string }) {
  const Art = art[kind] ?? art.gear;
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      focusable="false"
    >
      <Art />
    </svg>
  );
}
