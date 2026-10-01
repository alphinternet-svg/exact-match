import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { segmentLabels } from "@/data/brand";
import { formatDate, formatSpeed } from "@/services/api";
import type { Campaign, InternetPackage } from "@/types";
import { cn } from "@/lib/utils";

export function CampaignCard({ campaign, pkg, featured }: { campaign: Campaign; pkg?: InternetPackage | undefined; featured?: boolean }) {
  return (
    <article className={cn("surface-card relative overflow-hidden p-6 md:p-8", featured && "glow-accent md:p-12")}>
      <div className="bg-accent-wash absolute inset-0" />
      <div className={cn("relative grid gap-8", featured && "md:grid-cols-[1.4fr_1fr] md:items-end")}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone="accent" dot>{campaign.title}</StatusBadge>
            <StatusBadge>{segmentLabels[campaign.targetSegment]}</StatusBadge>
          </div>
          <h3 className={cn("mt-5 font-bold", featured ? "text-3xl md:text-5xl" : "text-2xl")}>{campaign.headline}</h3>
          <p className="mt-3 max-w-xl text-muted-foreground">{campaign.description}</p>
        </div>
        <div className="space-y-4">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border bg-background/60 p-3"><dt className="text-xs text-muted-foreground">Discount</dt><dd className="mt-0.5 font-semibold text-primary">{campaign.discount}</dd></div>
            <div className="rounded-lg border bg-background/60 p-3"><dt className="text-xs text-muted-foreground">Package</dt><dd className="mt-0.5 font-semibold">{pkg ? `${pkg.name} · ${formatSpeed(pkg.speed)}` : "—"}</dd></div>
          </dl>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarClock className="h-4 w-4" /> Valid {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
          </p>
          <Button asChild size="lg" className="w-full font-semibold">
            <Link to="/connect" search={{ package: campaign.packageId, type: campaign.targetSegment }}>Get This Offer <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
