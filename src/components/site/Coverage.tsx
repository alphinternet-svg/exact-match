import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill } from "./StatusBadge";
import { api } from "@/services/api";
import type { CoverageArea } from "@/types";
import { cn } from "@/lib/utils";

const statusText = {
  active: "Service available",
  coming_soon: "Coming soon to your area",
  not_available: "Not available yet",
} as const;

export function CoverageSearch({ compact }: { compact?: boolean }) {
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");
  const { data, isFetching, isError } = useQuery({
    queryKey: ["coverage-search", term],
    queryFn: () => api.searchCoverage(term),
    enabled: term.length > 0,
  });

  return (
    <div className="space-y-4">
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setTerm(input.trim()); }} role="search">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search your area, e.g. Mirpur" aria-label="Search area" className="h-12 bg-background pl-10 text-base" />
        </div>
        <Button type="submit" size="lg" className="h-12" disabled={!input.trim()}>Check</Button>
      </form>
      <div aria-live="polite">
        {isFetching && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Checking coverage…</p>}
        {isError && <p className="text-sm text-destructive">Couldn't check coverage right now. Please try again.</p>}
        {!isFetching && term && data && data.length === 0 && (
          <div className="rounded-lg border p-4 text-sm">
            <p className="font-medium">We couldn't find "{term}".</p>
            <p className="mt-1 text-muted-foreground">Request a connection and our team will check your exact address.</p>
            <Button asChild variant="outline" size="sm" className="mt-3"><Link to="/connect">Request Connection</Link></Button>
          </div>
        )}
        {!isFetching && data && data.length > 0 && (
          <ul className="space-y-2">
            {data.slice(0, compact ? 3 : 8).map((a) => <CoverageResult key={a.id} area={a} />)}
          </ul>
        )}
      </div>
    </div>
  );
}

function CoverageResult({ area }: { area: CoverageArea }) {
  return (
    <li className="flex flex-col gap-3 rounded-lg border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2"><span className="font-semibold">{area.name}</span><StatusPill status={area.status} /></div>
        <p className={cn("mt-0.5 text-sm", area.status === "active" ? "text-success" : "text-muted-foreground")}>{statusText[area.status]} · {area.district}</p>
      </div>
      {area.status !== "not_available" && (
        <Button asChild size="sm" variant={area.status === "active" ? "default" : "outline"}>
          <Link to="/connect" search={{ area: area.name }}>{area.status === "active" ? "Request Connection" : "Pre-register"}</Link>
        </Button>
      )}
    </li>
  );
}

/** Stylised coverage map — positions come from data and can later be replaced by real geo data. */
export function CoverageMap({ areas, className }: { areas: CoverageArea[]; className?: string }) {
  const color = { active: "bg-primary", coming_soon: "bg-warning", not_available: "bg-destructive" } as const;
  return (
    <div className={cn("surface-card relative aspect-[4/5] overflow-hidden", className)}>
      <div className="grid-lines absolute inset-0 opacity-60" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {areas.filter((a) => a.status === "active").map((a, i, arr) => {
          const n = arr[(i + 1) % arr.length]!;
          return <line key={a.id} x1={a.x} y1={a.y} x2={n.x} y2={n.y} stroke="var(--color-primary)" strokeOpacity={0.18} strokeWidth={0.3} />;
        })}
      </svg>
      {areas.map((a) => (
        <div key={a.id} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
          <span className={cn("relative block h-2.5 w-2.5 rounded-full", color[a.status])}>
            {a.status === "active" && <span className={cn("absolute inset-0 rounded-full animate-pulse-dot", color[a.status])} />}
          </span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-xs opacity-0 shadow transition-opacity group-hover:opacity-100">
            <MapPin className="mr-1 inline h-3 w-3" />{a.name}, {a.district}
          </span>
        </div>
      ))}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 rounded-md border bg-background/80 px-3 py-2 text-xs backdrop-blur">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Active</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Coming soon</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Not available</span>
      </div>
    </div>
  );
}
