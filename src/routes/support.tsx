import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { brand } from "@/data/brand";
export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support — ALPHINSupportERNESupport" }, { name: "description", content: "D" }, { property: "og:title", content: "Support — ALPHINSupportERNESupport" }, { property: "og:description", content: "D" }] }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Support" title="Need help with your connection?" description={`Call ${brand.contact.hotline} or email ${brand.contact.supportEmail}. Our engineers are available 24/7.`} />
    </SiteLayout>
  );
}
