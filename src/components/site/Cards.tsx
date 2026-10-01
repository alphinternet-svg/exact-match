import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Icon } from "./Icon";
import type { Faq, Service, Statistic, Testimonial } from "@/types";
import { cn } from "@/lib/utils";

export function StatisticsCard({ stat }: { stat: Statistic }) {
  return (
    <div className="border-l border-border pl-6">
      <div className="font-display text-4xl font-bold tracking-tight md:text-5xl">{stat.value}</div>
      <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

export function FeatureCard({ item, variant = "card" }: { item: Service; variant?: "card" | "plain" }) {
  return (
    <div className={cn("group", variant === "card" ? "surface-card p-6" : "border-t pt-6")}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
        <Icon name={item.icon} className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
}

export function SolutionCard({ index, title, description, cta, hash, icon, highlights }: { index: string; title: string; description: string; cta: string; hash: string; icon: string; highlights: string[] }) {
  return (
    <Link to="/solutions" hash={hash} className="surface-card group relative flex min-h-[22rem] flex-col overflow-hidden p-7 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <Icon name={icon} className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-auto text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {highlights.map((h) => <li key={h} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">{h}</li>)}
      </ul>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        {cta} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="surface-card flex flex-col p-6">
      <Quote className="h-5 w-5 text-primary" />
      <blockquote className="mt-4 flex-1 text-base">“{t.quote}”</blockquote>
      <figcaption className="mt-6 text-sm"><div className="font-semibold">{t.name}</div><div className="text-muted-foreground">{t.role}</div></figcaption>
    </figure>
  );
}

export function FAQAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="surface-card px-6">
      {items.map((f) => (
        <AccordionItem key={f.id} value={f.id}>
          <AccordionTrigger className="text-left text-base">{f.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
