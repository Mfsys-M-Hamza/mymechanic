/**
 * Placeholder illustrations for spare-part categories, shown until real part photos
 * are supplied (see src/data/spareParts.ts). Original SVG artwork; uses the shared
 * gradients from <SvgDefs/> (mm-metal, mm-brand, mm-dark).
 */
import type { ReactElement } from "react";
import type { PartArtKey } from "@/data/spareParts";

const art: Record<PartArtKey, () => ReactElement> = {
  body: () => (
    <>
      {/* Car side profile with the bumper highlighted */}
      <path d="M14 62 L20 48 Q24 42 34 41 L52 40 L66 28 Q70 25 78 25 L104 25 Q112 25 118 31 L128 40 L140 42 Q148 44 148 52 L148 62 Z" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="2.5" />
      <path d="M68 39 L76 30 L96 30 L96 39 Z M100 39 L100 30 L112 30 L121 39 Z" fill="#1f2227" stroke="#9ba1a9" strokeWidth="1.2" />
      <path d="M136 46 Q148 46 149 54 L149 62 L134 62 Z" fill="url(#mm-brand)" />
      <circle cx="46" cy="64" r="11" fill="#17191d" stroke="url(#mm-metal)" strokeWidth="3" />
      <circle cx="120" cy="64" r="11" fill="#17191d" stroke="url(#mm-metal)" strokeWidth="3" />
    </>
  ),
  light: () => (
    <>
      {/* Headlight housing with lens and beam */}
      <path d="M22 34 Q24 24 40 22 L86 20 Q96 20 98 30 L100 62 Q100 72 88 74 L36 76 Q24 76 22 66 Z" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="2.5" />
      <circle cx="46" cy="48" r="14" fill="#fff6d6" stroke="url(#mm-metal)" strokeWidth="2" />
      <circle cx="46" cy="48" r="6" fill="#ffd24a" />
      <rect x="66" y="40" width="24" height="14" rx="4" fill="url(#mm-brand)" />
      {[0, 1, 2].map((i) => <path key={i} d={`M104 ${38 + i * 10} L140 ${30 + i * 14}`} stroke="#ffd24a" strokeWidth="3" strokeLinecap="round" opacity={0.85 - i * 0.2} />)}
    </>
  ),
  engine: () => (
    <>
      {/* Spark plug */}
      <rect x="72" y="8" width="16" height="14" rx="3" fill="url(#mm-metal)" />
      <rect x="66" y="22" width="28" height="24" rx="4" fill="#f7f5f0" stroke="#9ba1a9" strokeWidth="1.5" />
      {[28, 34, 40].map((y) => <rect key={y} x="66" y={y} width="28" height="2" fill="#cbd0d6" />)}
      <path d="M62 46 L98 46 L94 60 L66 60 Z" fill="url(#mm-metal)" />
      <rect x="72" y="60" width="16" height="16" fill="url(#mm-brand)" />
      {[63, 67, 71].map((y) => <rect key={y} x="72" y={y} width="16" height="1.5" fill="#3d2c00" opacity=".5" />)}
      <path d="M80 76 L80 86 L90 86" stroke="#9ba1a9" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  brake: () => (
    <>
      {/* Ventilated brake disc with caliper */}
      <circle cx="74" cy="50" r="38" fill="url(#mm-metal)" stroke="#5c636b" strokeWidth="2" />
      <circle cx="74" cy="50" r="16" fill="url(#mm-dark)" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return <circle key={i} cx={+(74 + 9 * Math.cos(a)).toFixed(2)} cy={+(50 + 9 * Math.sin(a)).toFixed(2)} r="2.4" fill="#cbd0d6" />;
      })}
      <path d="M104 22 Q124 36 124 50 Q124 64 104 78 L98 70 Q112 60 112 50 Q112 40 98 30 Z" fill="url(#mm-brand)" stroke="#3d2c00" strokeWidth="1.5" />
    </>
  ),
  suspension: () => (
    <>
      {/* Coil-over shock absorber */}
      <rect x="72" y="6" width="16" height="12" rx="3" fill="url(#mm-metal)" />
      <rect x="76" y="18" width="8" height="44" fill="#cbd0d6" />
      <rect x="70" y="56" width="20" height="30" rx="4" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="2" />
      <path d="M62 22 Q98 26 62 30 Q98 34 62 38 Q98 42 62 46 Q98 50 62 54" stroke="url(#mm-brand)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="90" r="5" fill="none" stroke="#9ba1a9" strokeWidth="3" />
    </>
  ),
  oil: () => (
    <>
      {/* Oil bottle and spin-on filter */}
      <rect x="40" y="26" width="42" height="62" rx="8" fill="url(#mm-brand)" />
      <rect x="52" y="14" width="18" height="14" rx="3" fill="url(#mm-metal)" />
      <rect x="46" y="46" width="30" height="20" rx="3" fill="#fffaf0" opacity=".9" />
      <path d="M52 56 L70 56" stroke="#3d2c00" strokeWidth="2.5" />
      <rect x="92" y="40" width="34" height="48" rx="6" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="2" />
      {[50, 58, 66, 74].map((y) => <rect key={y} x="92" y={y} width="34" height="2" fill="#5c636b" />)}
      <rect x="96" y="34" width="26" height="8" rx="2" fill="url(#mm-metal)" />
    </>
  ),
  battery: () => (
    <>
      {/* Car battery */}
      <rect x="34" y="28" width="92" height="58" rx="8" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="3" />
      <rect x="46" y="18" width="16" height="12" rx="2" fill="url(#mm-metal)" />
      <rect x="98" y="18" width="16" height="12" rx="2" fill="url(#mm-metal)" />
      <rect x="34" y="28" width="92" height="12" rx="6" fill="url(#mm-brand)" />
      <path d="M84 48 L72 64 L80 64 L74 78 L90 60 L82 60 Z" fill="#ffd24a" />
      <text x="54" y="58" fontSize="14" fill="#cbd0d6" textAnchor="middle" fontWeight="700">−</text>
      <text x="106" y="58" fontSize="14" fill="#ffd24a" textAnchor="middle" fontWeight="700">+</text>
    </>
  ),
  cooling: () => (
    <>
      {/* Radiator core with fan */}
      <rect x="22" y="18" width="78" height="66" rx="6" fill="url(#mm-dark)" stroke="url(#mm-metal)" strokeWidth="2.5" />
      {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={30 + i * 7.6} y="24" width="3" height="54" fill="#5c636b" />)}
      <circle cx="122" cy="51" r="24" fill="#17191d" stroke="url(#mm-metal)" strokeWidth="2.5" />
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx="122" cy="40" rx="5" ry="11" fill="url(#mm-brand)" transform={`rotate(${i * 90} 122 51)`} />)}
      <circle cx="122" cy="51" r="4" fill="#cbd0d6" />
    </>
  ),
};

export function PartArt({ kind, className = "" }: { kind: PartArtKey; className?: string }) {
  const Art = art[kind];
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
