import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { brand } from "@/data/brand";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — ALPHINContactERNEContact" }, { name: "description", content: "Contact ALPHINTERNET sales and support." }, { property: "og:title", content: "Contact — ALPHINContactERNEContact" }, { property: "og:description", content: "Contact ALPHINTERNET sales and support." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="Talk to us" description={`${brand.contact.phone} · ${brand.contact.email} · ${brand.contact.address}`} />
    </SiteLayout>
  );
}
