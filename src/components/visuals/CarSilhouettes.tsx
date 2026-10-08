/**
 * Simple side-view car silhouettes for the inspection charges cards (original artwork).
 * Body uses currentColor; wheels are drawn in darker metal.
 */
type Kind = "suv" | "sedan" | "hatch" | "new";

const BODY: Record<Exclude<Kind, "new">, string> = {
  suv: "M8 52 L10 34 Q12 28 20 27 L34 26 L46 13 Q48 11 54 11 L104 11 Q110 11 113 16 L120 27 L132 30 Q140 32 140 40 L140 52 Z",
  sedan: "M6 52 L8 42 Q10 36 18 35 L38 33 L56 19 Q59 17 65 17 L94 17 Q100 17 104 21 L118 33 L134 36 Q142 38 142 45 L142 52 Z",
  hatch: "M12 52 L13 42 Q14 36 22 35 L40 33 L56 18 Q59 16 65 16 L104 16 Q112 16 116 24 L124 38 Q130 40 130 46 L130 52 Z",
};
const WHEELS: Record<Exclude<Kind, "new">, [number, number]> = { suv: [36, 112], sedan: [34, 114], hatch: [36, 104] };

export function CarSilhouette({ kind, className = "" }: { kind: Kind; className?: string }) {
  const body = kind === "new" ? "sedan" : kind;
  const [w1, w2] = WHEELS[body];
  return (
    <svg viewBox="0 0 150 64" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="75" cy="60" rx="66" ry="3.5" fill="#000" opacity=".35" />
      <path d={BODY[body]} fill="currentColor" />
      {/* windows */}
      <path
        d={body === "suv" ? "M38 26 L49 15 L76 15 L76 26 Z M80 26 L80 15 L104 15 Q108 15 110 19 L114 26 Z" : body === "sedan" ? "M42 33 L58 21 L78 21 L78 33 Z M82 33 L82 21 L95 21 Q99 21 101 24 L110 33 Z" : "M44 33 L58 20 L80 20 L80 33 Z M84 33 L84 20 L104 20 Q109 20 111 26 L116 33 Z"}
        fill="#0c0d0f"
        opacity=".55"
      />
      {[w1, w2].map((x) => (
        <g key={x}>
          <circle cx={x} cy="52" r="10" fill="#17191d" />
          <circle cx={x} cy="52" r="5" fill="#9ba1a9" />
        </g>
      ))}
      {kind === "new" && (
        <g fill="none" stroke="#e5484d" strokeWidth="3" strokeLinecap="round">
          <path d="M70 18 L70 50" />
          <path d="M70 18 Q58 6 54 14 Q52 20 70 18 Q82 6 88 12 Q90 20 70 18" fill="#e5484d" />
          <path d="M70 18 L62 28 M70 18 L78 28" />
        </g>
      )}
    </svg>
  );
}
