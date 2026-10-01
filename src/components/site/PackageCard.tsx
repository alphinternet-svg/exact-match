import { Link } from "@tanstack/react-router";
import { Check, Gauge } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "./StatusBadge";
import { StateMessage } from "./Layout";
import { segmentLabels } from "@/data/brand";
import { formatBDT, formatSpeed } from "@/services/api";
import type { Campaign, InternetPackage, Segment } from "@/types";
import { cn } from "@/lib/utils";

export function PackageCard({ pkg, campaign, onDetails }: { pkg: InternetPackage; campaign?: Campaign; onDetails: () => void }) {
  return (
    <article className={cn("surface-card relative flex flex-col p-6 transition-all hover:-translate-y-0.5", pkg.popular && "glow-accent")}>
      <div className="flex min-h-6 flex-wrap gap-2">
        {pkg.popular && <StatusBadge tone="accent">Most popular</StatusBadge>}
        {campaign && <StatusBadge tone="warning">Offer</StatusBadge>}
        {pkg.availability === "limited" && <StatusBadge>Select areas</StatusBadge>}
      </div>
      <h3 className="mt-4 text-sm font-medium text-muted-foreground">{pkg.name}</h3>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-5xl font-bold tracking-tight">{pkg.speed >= 1000 ? pkg.speed / 1000 : pkg.speed}</span>
        <span className="font-mono text-sm text-muted-foreground">{pkg.speed >= 1000 ? "Gbps" : "Mbps"}</span>
      </div>
      <div className="mt-5 flex items-baseline gap-2 border-t pt-5">
        <span className="font-display text-2xl font-semibold">{formatBDT(pkg.price)}</span>
        {pkg.previousPrice && <span className="text-sm text-muted-foreground line-through">{formatBDT(pkg.previousPrice)}</span>}
        <span className="text-sm text-muted-foreground">/ {pkg.billingCycle.toLowerCase().replace("ly", "")}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Installation: {pkg.installationCharge === 0 ? <span className="text-primary">Free</span> : formatBDT(pkg.installationCharge)}
      </p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm">
        {pkg.features.slice(0, 4).map((f) => (
          <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
        ))}
      </ul>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button asChild variant={pkg.popular ? "default" : "secondary"}>
          <Link to="/connect" search={{ package: pkg.id, type: pkg.category }}>Get Connected</Link>
        </Button>
        <Button variant="outline" onClick={onDetails}>View Details</Button>
      </div>
    </article>
  );
}

export function PackageDetailsDialog({ pkg, campaign, onClose }: { pkg: InternetPackage | null; campaign?: Campaign; onClose: () => void }) {
  return (
    <Dialog open={!!pkg} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        {pkg && (
          <>
            <DialogHeader>
              <div className="eyebrow">{segmentLabels[pkg.category]} package</div>
              <DialogTitle className="font-display text-2xl">{pkg.name} · {formatSpeed(pkg.speed)}</DialogTitle>
              <DialogDescription>Unlimited fiber connectivity, billed {pkg.billingCycle.toLowerCase()}.</DialogDescription>
            </DialogHeader>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Speed", formatSpeed(pkg.speed)],
                ["Monthly price", formatBDT(pkg.price)],
                ["Billing cycle", pkg.billingCycle],
                ["Installation", pkg.installationCharge ? formatBDT(pkg.installationCharge) : "Free"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border bg-secondary/50 p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-0.5 font-semibold">{v}</dd></div>
              ))}
            </dl>
            {campaign && (
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">
                <span className="font-semibold text-primary">{campaign.discount}</span> — {campaign.headline}
              </div>
            )}
            <div>
              <h4 className="mb-2 text-sm font-semibold">Features</h4>
              <ul className="grid gap-1.5 text-sm sm:grid-cols-2">{pkg.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{f}</li>)}</ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Terms</h4>
              <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">{pkg.terms.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <Button asChild size="lg"><Link to="/connect" search={{ package: pkg.id, type: pkg.category }}>Get Connected</Link></Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PackageTabs({ value, onChange }: { value: Segment; onChange: (s: Segment) => void }) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Segment)}>
      <TabsList className="h-11 bg-secondary p-1">
        {(Object.keys(segmentLabels) as Segment[]).map((s) => (
          <TabsTrigger key={s} value={s} className="px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{segmentLabels[s]}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export function PackageGrid({ packages, campaigns }: { packages: InternetPackage[]; campaigns: Campaign[] }) {
  const [selected, setSelected] = useState<InternetPackage | null>(null);
  const campaignFor = (p: InternetPackage) => campaigns.find((c) => c.id === p.campaignId);
  if (!packages.length) return <StateMessage title="No packages match your filters" description="Try a different speed, price or availability." />;
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => <PackageCard key={p.id} pkg={p} campaign={campaignFor(p)} onDetails={() => setSelected(p)} />)}
      </div>
      <PackageDetailsDialog pkg={selected} campaign={selected ? campaignFor(selected) : undefined} onClose={() => setSelected(null)} />
    </>
  );
}

export { Gauge };
