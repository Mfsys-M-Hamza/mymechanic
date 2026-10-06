/**
 * Inline script that runs synchronously while the HTML is parsed (before first paint).
 * Rendered as text/javascript on the server and text/plain on the client, so React does
 * not warn about rendering a <script>; suppressHydrationWarning covers the type mismatch.
 * Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
