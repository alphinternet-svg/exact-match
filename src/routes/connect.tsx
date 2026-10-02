import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { ConnectionForm } from "@/components/site/ConnectionForm";
import type { Segment } from "@/types";

type S = { package?: string; type?: Segment; area?: string };
export const Route = createFileRoute("/connect")({
  validateSearch: (s: Record<string, unknown>): S => ({
    ...(typeof s["package"] === "string" ? { package: s["package"] } : {}),
    ...(s["type"] === "home" || s["type"] === "sme" || s["type"] === "corporate" ? { type: s["type"] } : {}),
    ...(typeof s["area"] === "string" ? { area: s["area"] } : {}),
  }),
  head: () => ({ meta: [{ title: "Get Connected — ALPHINTERNET" }, { name: "description", content: "Request a new ALPHINTERNET connection." }, { property: "og:title", content: "Get Connected — ALPHINTERNET" }, { property: "og:description", content: "Request a new ALPHINTERNET connection." }] }),
  component: Page,
});

function Page() {
  const s = Route.useSearch();
  return (
    <SiteLayout>
      <PageHeader eyebrow="New connection" title="Get Connected" description="Tell us where you are and we'll be in touch shortly." />
      <Section><ConnectionForm initial={{ ...(s.package ? { packageId: s.package } : {}), ...(s.type ? { customerType: s.type } : {}), ...(s.area ? { area: s.area } : {}) }} /></Section>
    </SiteLayout>
  );
}
