/**
 * Sub-path the site is served from. Empty on Vercel / a custom domain;
 * "/<repo-name>" on GitHub Pages (set by the deploy workflow).
 * next/link adds it automatically — use `asset()` for raw file paths
 * (images, manifest icons, plain <a> tags).
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export const asset = (path: string) => `${basePath}${path}`;
