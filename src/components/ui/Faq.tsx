import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { PlusIcon } from "@/components/Icons";

/** Accessible FAQ list (native details/summary). Emits FAQPage schema for the visible Q&A. */
export function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  if (!items.length) return null;
  return (
    <>
      {schema && <JsonLd data={faqSchema(items)} />}
      <div className="grid gap-3">
        {items.map((f, i) => (
          <details key={f.q} className="reveal card group overflow-hidden" style={{ ["--d" as string]: `${i * 60}ms` }}>
            <summary className="flex min-h-[60px] items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-white hover:text-brand-bright">
              <span>{f.q}</span>
              <PlusIcon className="faq-icon shrink-0 text-brand transition-transform duration-300" />
            </summary>
            <div className="px-5 pb-5 text-mist">{f.a}</div>
          </details>
        ))}
      </div>
    </>
  );
}
