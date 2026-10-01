import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { CoverageMap, CoverageSearch } from "@/components/site/Coverage";
import { StatusPill } from "@/components/site/StatusBadge";
import { q } from "@/services/api";
import type { CoverageStatus } from "@/types";
import { cn } from "@/lib/utils";

const title = "Coverage Areas — ALPHINTERNET";
const desc = "Check whether ALPHINTERNET fiber is available in your area, and see where we're expanding next.";

export const Route = createFileRoute("/coverage")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q.coverage()),
  component: CoveragePage,
});

const filters: { id: "all" | CoverageStatus; label: string }[] = [
  { id: "all", label: "All" }, { id: "active", label: "Active" }, { id: "coming_soon", label: "Coming soon" }, { id: "not_available", label: "Not available" },
];

function CoveragePage() {
  const { data: areas } = useSuspenseQuery(q.coverage());
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = areas.filter((a) => filter === "all" || a.status === filter);
  const divisions = [...new Set(list.map((a) => a.division))];
  const count = (s: CoverageStatus) => areas.filter((a) => a.status === s).length;

  return (
    <SiteLayout>
      <PageHeader eyebrow="Coverage" title="Check our coverage" description="Fiber across major cities and divisional towns, expanding every month.">
        <div className="max-w-xl"><CoverageSearch /></div>
      </PageHeader>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <CoverageMap areas={areas} />
            <div className="grid grid-cols-3 gap-3 text-center">
              {(["active", "coming_soon", "not_available"] as const).map((s) => (
                <div key={s} className="surface-card p-4"><div className="font-display text-2xl font-bold">{count(s)}</div><div className="mt-1"><StatusPill status={s} /></div></div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f.id} onClick={() => setFilter(f.id)} className={cn("rounded-full border px-4 py-1.5 text-sm transition-colors", filter === f.id ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{f.label}</button>
              ))}
            </div>
            <div className="space-y-8">
              {divisions.map((d) => (
                <div key={d}>
                  <h3 className="eyebrow mb-3">{d} division</h3>
                  <ul className="divide-y rounded-xl border">
                    {list.filter((a) => a.division === d).map((a) => (
                      <li key={a.id} className="flex items-center justify-between px-4 py-3">
                        <div><div className="font-medium">{a.name}</div><div className="text-xs text-muted-foreground">{a.district}</div></div>
                        <StatusPill status={a.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
