import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — ALPHINAbout UsERNEAbout Us" }, { name: "description", content: "ALPHINTERNET connects people, businesses and communities nationwide." }, { property: "og:title", content: "About Us — ALPHINAbout UsERNEAbout Us" }, { property: "og:description", content: "ALPHINTERNET connects people, businesses and communities nationwide." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About" title="Connecting People, Businesses & Communities." description="ALPHINTERNET builds and operates a nationwide fiber network serving homes, SMEs and organisations." />
    </SiteLayout>
  );
}
