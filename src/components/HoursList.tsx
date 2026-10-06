import { client } from "@/config/client";

const fmt = (t?: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""} ${ap}`;
};

/**
 * Shows opening hours only once the owner has confirmed them (client.hours.confirmed).
 * Until then it shows a clear "call before visiting" note instead of guessing.
 */
export function HoursList({ compact = false }: { compact?: boolean }) {
  if (!client.hours.confirmed) {
    return <p className={compact ? "" : "text-mist"}>{client.hours.note}</p>;
  }
  return (
    <table className={`w-full text-left ${compact ? "text-sm" : ""}`}>
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {client.hours.days.map((d) => (
          <tr key={d.day} className="border-b border-white/5 last:border-0">
            <th scope="row" className="py-1 pr-4 font-medium text-white">{d.day}</th>
            <td className="py-1 text-mist">{d.closed ? "Closed" : `${fmt(d.opens)} – ${fmt(d.closes)}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
