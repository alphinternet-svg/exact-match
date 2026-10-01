import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/legal/$doc")({
  head: () => ({ meta: [{ title: "Legal — ALPHINLegalERNELegal" }, { name: "description", content: "ALPHINTERNET legal information." }, { property: "og:title", content: "Legal — ALPHINLegalERNELegal" }, { property: "og:description", content: "ALPHINTERNET legal information." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Legal information" description="Full policy text coming soon." />
    </SiteLayout>
  );
}
