import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Headset, LifeBuoy, MapPin, Wifi } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-network.jpg";
import { Button } from "@/components/ui/button";
import { SiteLayout, Section } from "@/components/site/Layout";
import { PackageGrid, PackageTabs } from "@/components/site/PackageCard";
import { CampaignCard } from "@/components/site/CampaignCard";
import { CoverageMap, CoverageSearch } from "@/components/site/Coverage";
import { FeatureCard, SolutionCard, StatisticsCard } from "@/components/site/Cards";
import { solutionSegments } from "@/data/solutions";
import { q } from "@/services/api";
import type { Segment } from "@/types";

const title = "ALPHINTERNET — Fast. Reliable. Nationwide.";
const desc = "High-speed fiber Internet for Home, SME and Corporate customers across Bangladesh.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
    ],
  }),
  loader: ({ context: { queryClient: c } }) =>
    Promise.all([c.ensureQueryData(q.packages()), c.ensureQueryData(q.campaigns()), c.ensureQueryData(q.coverage()), c.ensureQueryData(q.statistics()), c.ensureQueryData(q.benefits()), c.ensureQueryData(q.services())]),
  component: Home,
});

function Home() {
  const { data: packages } = useSuspenseQuery(q.packages());
  const { data: campaigns } = useSuspenseQuery(q.campaigns());
  const { data: areas } = useSuspenseQuery(q.coverage());
  const { data: stats } = useSuspenseQuery(q.statistics());
  const { data: benefits } = useSuspenseQuery(q.benefits());
  const { data: services } = useSuspenseQuery(q.services());
  const [segment, setSegment] = useState<Segment>("home");
  const featured = campaigns[0];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative -mt-16 overflow-hidden border-b pt-16">
        <img src={heroImg} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
        <div className="bg-hero-fade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="container-site relative flex min-h-[86vh] flex-col justify-center py-20">
          <div className="max-w-3xl">
            <div className="animate-reveal-up inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Reliable Connectivity • Professional Support • Nationwide Coverage
            </div>
            <h1 className="animate-reveal-up motion-delay-1 mt-7 text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl">
              Fast. Reliable.<br /><span className="text-primary">Nationwide.</span>
            </h1>
            <p className="animate-reveal-up motion-delay-2 mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">High-speed Internet solutions built for Home, SME and Corporate customers.</p>
            <div className="animate-reveal-up motion-delay-3 mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 font-semibold"><Link to="/connect">Get Connected <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 bg-background/40 px-7 backdrop-blur"><Link to="/packages">Explore Packages</Link></Button>
            </div>
          </div>
          <div className="animate-reveal-up motion-delay-4 mt-16 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span>Home</span><span>·</span><span>SME</span><span>·</span><span>Corporate</span><span>·</span><span>Up to 1 Gbps</span>
          </div>
          <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px overflow-hidden bg-border md:inset-x-8">
            <span className="animate-signal-sweep block h-full w-1/3 bg-primary" />
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <div className="container-site relative z-10 -mt-10">
        <div className="surface-card motion-card flex flex-col items-start justify-between gap-5 bg-surface-2 p-6 md:flex-row md:items-center md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Wifi className="h-6 w-6" /></div>
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">Looking for a reliable Internet connection?</h2>
              <p className="text-sm text-muted-foreground">Check your area in seconds — installation in as little as 48 hours.</p>
            </div>
          </div>
          <div className="flex w-full gap-2 md:w-auto">
            <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/coverage"><MapPin className="h-4 w-4" />Check Coverage</Link></Button>
            <Button asChild size="lg" className="flex-1 font-semibold"><Link to="/connect">Request Connection</Link></Button>
          </div>
        </div>
      </div>

      {/* Solutions */}
      <Section eyebrow="Solutions" title="Connectivity for every scale" description="One nationwide network, tuned for how you use it." className="reveal-on-scroll">
        <div className="grid gap-5 md:grid-cols-3">
          {solutionSegments.map((s, i) => <SolutionCard key={s.id} index={`0${i + 1}`} hash={s.id} title={s.title} description={s.description} cta={s.cta} icon={s.icon} highlights={s.highlights} />)}
        </div>
      </Section>

      {/* Packages */}
      <Section eyebrow="Packages" title="Internet packages" description="Unlimited data on every plan. Prices include VAT." className="reveal-on-scroll"
        action={<PackageTabs value={segment} onChange={setSegment} />}>
        <PackageGrid packages={packages.filter((p) => p.category === segment)} campaigns={campaigns} />
        <div className="mt-8 text-center"><Button asChild variant="link"><Link to="/packages">Compare all packages <ArrowRight className="h-4 w-4" /></Link></Button></div>
      </Section>

      {/* Campaign */}
      {featured && (
        <section className="container-site reveal-on-scroll">
          <CampaignCard campaign={featured} pkg={packages.find((p) => p.id === featured.packageId)} featured />
        </section>
      )}

      {/* Coverage */}
      <Section eyebrow="Coverage" title="Check our coverage" description="Search your area to see if ALPHINTERNET fiber is available." className="reveal-on-scroll">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="surface-card p-6 md:p-8">
            <CoverageSearch compact />
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
              Popular: {areas.filter((a) => a.status === "active").slice(0, 5).map((a) => <span key={a.id} className="rounded-full border px-2.5 py-1">{a.name}</span>)}
            </div>
          </div>
          <CoverageMap areas={areas} className="mx-auto w-full max-w-md" />
        </div>
      </Section>

      {/* Stats */}
      <section className="reveal-on-scroll border-y bg-surface">
        <div className="container-site grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4">
          {stats.map((s) => <StatisticsCard key={s.id} stat={s} />)}
        </div>
      </section>

      {/* Why */}
      <Section eyebrow="Why ALPHINTERNET" title="Built to be relied on" className="reveal-on-scroll">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((b) => <FeatureCard key={b.id} item={b} />)}</div>
      </Section>

      {/* Network features */}
      <Section eyebrow="Network" title="What our network delivers" className="reveal-on-scroll pt-0">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => <FeatureCard key={s.id} item={s} variant="plain" />)}</div>
      </Section>

      {/* Support */}
      <section className="container-site reveal-on-scroll">
        <div className="surface-card motion-card relative overflow-hidden p-8 md:p-14">
          <div className="grid-lines absolute inset-0 opacity-30" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <Headset className="h-8 w-8 text-primary" />
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">Need help with your connection?</h2>
              <p className="mt-2 text-muted-foreground">Our support engineers are available 24/7.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="lg"><Link to="/contact">Contact Support</Link></Button>
              <Button asChild size="lg" className="font-semibold"><Link to="/support"><LifeBuoy className="h-4 w-4" />Create Support Request</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
