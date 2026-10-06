/**
 * Input sanitising and validation shared by the appointment and contact forms.
 * The forms have no server backend — data goes straight into a WhatsApp message
 * the customer sends themselves — but we still normalise everything so the message
 * is clean and can't carry markup or control characters.
 */

/** Trim, drop control characters and angle brackets, collapse runs of spaces, cap length. */
export function clean(value: unknown, max = 200, multiline = false): string {
  let s = String(value ?? "")
    .normalize("NFKC")
    // eslint-disable-next-line no-control-regex
    .replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/[ \t]+/g, " ");
  if (multiline) s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim().slice(0, max);
}

export const patterns = {
  name: /^[\p{L}][\p{L} .'-]{1,59}$/u,
  /** Pakistani mobile: 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX, 00923XXXXXXXXX */
  pkMobile: /^(?:\+92|0092|92|0)3\d{9}$/,
  email: /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/,
  vehicleText: /^[\p{L}\p{N} .\-/]{1,40}$/u,
  registration: /^[A-Za-z0-9 -]{2,15}$/,
};

export const normalisePhone = (v: string) => v.replace(/[\s\-()]/g, "");

/** Format a Pakistani mobile for display: 0312-5045678 */
export function displayPhone(v: string) {
  const d = normalisePhone(v).replace(/^(\+92|0092|92)/, "0");
  return d.length === 11 ? `${d.slice(0, 4)}-${d.slice(4)}` : v;
}

/** Simple anti-spam: honeypot filled, or submitted faster than a human could type. */
export function looksLikeBot(honeypot: string, startedAt: number, minMs = 3000) {
  return honeypot.trim().length > 0 || Date.now() - startedAt < minMs;
}

/** Client-side cooldown so one browser can't fire repeated submissions. */
export function cooldownRemaining(key: string, seconds: number): number {
  try {
    const last = Number(localStorage.getItem(key) || 0);
    const left = Math.ceil((last + seconds * 1000 - Date.now()) / 1000);
    return left > 0 ? left : 0;
  } catch {
    return 0;
  }
}
export function startCooldown(key: string) {
  try { localStorage.setItem(key, String(Date.now())); } catch {}
}

export function todayISO(d = new Date()) {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}
