import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout, PageHeader, Section, StateMessage } from "@/components/site/Layout";
import { CampaignCard } from "@/components/site/CampaignCard";
import { segmentLabels } from "@/data/brand";
import { q } from "@/services/api";
import type { Segment } from "@/types";
import { cn } from "@/lib/utils";

const title = "Offers & Campaigns — ALPHINTERNET";
const desc = "Limited-time Internet offers and discounts for Home, SME and Corporate customers.";

export const Route = createFileRoute("/offers")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  loader: ({ context: { queryClient: c } }) => Promise.all([c.ensureQueryData(q.campaigns()), c.ensureQueryData(q.packages())]),
  component: OffersPage,
});

function OffersPage() {
  const { data: campaigns } = useSuspenseQuery(q.campaigns());
  const { data: packages } = useSuspenseQuery(q.packages());
  const [seg, setSeg] = useState<Segment | "all">("all");
  const list = campaigns.filter((c) => seg === "all" || c.targetSegment === seg);
  return (
    <SiteLayout>
      <PageHeader eyebrow="Offers" title="Current offers" description="Limited-time discounts on new connections and upgrades." />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "home", "sme", "corporate"] as const).map((s) => (
            <button key={s} onClick={() => setSeg(s)} className={cn("rounded-full border px-4 py-1.5 text-sm transition-colors", seg === s ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              {s === "all" ? "All offers" : segmentLabels[s]}
            </button>
          ))}
        </div>
        {list.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {list.map((c) => <CampaignCard key={c.id} campaign={c} pkg={packages.find((p) => p.id === c.packageId)} />)}
          </div>
        ) : <StateMessage title="No active offers for this segment" description="Check back soon — new campaigns launch every month." />}
      </Section>
    </SiteLayout>
  );
}
