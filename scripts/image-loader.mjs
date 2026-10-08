/**
 * next/image loader for STATIC_EXPORT builds (see next.config.ts).
 *
 * Maps each requested width to the smallest pre-built copy that is at least that wide
 * (made by scripts/build-image-variants.mjs); falls back to the original file.
 */
import variants from "../.image-variants.json";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export default function imageLoader({ src, width }) {
  const rel = basePath && src.startsWith(basePath + "/") ? src.slice(basePath.length) : src;
  const widths = variants[rel];
  const w = widths && widths.find((v) => v >= width);
  return w ? `${basePath}/_v${rel.replace(/\.[^.]+$/, "")}-${w}.webp` : src;
}
