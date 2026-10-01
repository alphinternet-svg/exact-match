import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { solutionSegments } from "@/data/solutions";
export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [{ title: "Solutions — ALPHINSolutionsERNESolutions" }, { name: "description", content: "Home, SME and Corporate Internet solutions." }, { property: "og:title", content: "Solutions — ALPHINSolutionsERNESolutions" }, { property: "og:description", content: "Home, SME and Corporate Internet solutions." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Solutions" title="Solutions for every scale" /><Section>{solutionSegments.map((s) => <div key={s.id} id={s.id} className="surface-card mb-5 p-8"><h2 className="text-2xl font-bold">{s.title}</h2><p className="mt-2 text-muted-foreground">{s.long}</p></div>)}</Section>
    </SiteLayout>
  );
}
