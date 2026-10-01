import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { PackageGrid, PackageTabs } from "@/components/site/PackageCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { q } from "@/services/api";
import type { Segment } from "@/types";

const title = "Internet Packages — ALPHINTERNET";
const desc = "Compare Home, SME and Corporate fiber Internet packages with clear monthly pricing.";

export const Route = createFileRoute("/packages")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  loader: ({ context: { queryClient: c } }) => Promise.all([c.ensureQueryData(q.packages()), c.ensureQueryData(q.campaigns())]),
  component: PackagesPage,
});

function PackagesPage() {
  const { data: packages } = useSuspenseQuery(q.packages());
  const { data: campaigns } = useSuspenseQuery(q.campaigns());
  const [segment, setSegment] = useState<Segment>("home");
  const [speed, setSpeed] = useState("all");
  const [sort, setSort] = useState("price-asc");
  const [popularOnly, setPopularOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  const list = useMemo(() => {
    let l = packages.filter((p) => p.category === segment);
    if (speed !== "all") l = l.filter((p) => (speed === "lt100" ? p.speed < 100 : speed === "100-200" ? p.speed >= 100 && p.speed <= 200 : p.speed > 200));
    if (popularOnly) l = l.filter((p) => p.popular);
    if (availableOnly) l = l.filter((p) => p.availability === "available");
    return [...l].sort((a, b) => (sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.speed - a.speed));
  }, [packages, segment, speed, sort, popularOnly, availableOnly]);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Packages" title="Internet Packages" description="Unlimited fiber Internet for homes, growing businesses and organisations." />
      <Section>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <PackageTabs value={segment} onChange={setSegment} />
          <div className="flex flex-wrap items-center gap-3">
            <Select value={speed} onValueChange={setSpeed}>
              <SelectTrigger className="w-40" aria-label="Speed"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All speeds</SelectItem>
                <SelectItem value="lt100">Under 100 Mbps</SelectItem>
                <SelectItem value="100-200">100–200 Mbps</SelectItem>
                <SelectItem value="gt200">Above 200 Mbps</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44" aria-label="Sort by price"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="speed">Fastest first</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2"><Switch id="pop" checked={popularOnly} onCheckedChange={setPopularOnly} /><Label htmlFor="pop">Popular</Label></div>
            <div className="flex items-center gap-2"><Switch id="avail" checked={availableOnly} onCheckedChange={setAvailableOnly} /><Label htmlFor="avail">Widely available</Label></div>
          </div>
        </div>
        <PackageGrid packages={list} campaigns={campaigns} />
      </Section>
    </SiteLayout>
  );
}
