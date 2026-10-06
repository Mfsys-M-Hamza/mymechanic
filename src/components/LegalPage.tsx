import type { ReactNode } from "react";
import { client } from "@/config/client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  const updated = new Date(client.legalUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <section className="carbon garage-light relative border-b border-white/6">
        <div className="container-x py-12 md:py-16">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="rise mt-6 text-4xl font-extrabold uppercase text-white sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-metal">Last updated: <time dateTime={client.legalUpdated}>{updated}</time></p>
        </div>
      </section>
      <div className="container-x py-14">
        <div className="prose-garage max-w-3xl">{children}</div>
      </div>
    </>
  );
}
