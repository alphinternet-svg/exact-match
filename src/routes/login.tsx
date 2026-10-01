import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section } from "@/components/site/Layout";
import { LoginForm } from "@/components/site/LoginForm";
export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Customer Login — ALPHINCustomer LoginERNECustomer Login" }, { name: "description", content: "Sign in to your ALPHINTERNET customer portal." }, { property: "og:title", content: "Customer Login — ALPHINCustomer LoginERNECustomer Login" }, { property: "og:description", content: "Sign in to your ALPHINTERNET customer portal." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <Section className="max-w-md"><h1 className="mb-6 text-3xl font-bold">Customer Login</h1><div className="surface-card p-6"><LoginForm /></div></Section>
    </SiteLayout>
  );
}
