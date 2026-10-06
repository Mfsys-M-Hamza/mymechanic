import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { ChevronIcon } from "@/components/Icons";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus BreadcrumbList structured data. "Home" is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-metal">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-mist">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-brand">{c.name}</Link>
                    <ChevronIcon width={14} height={14} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
