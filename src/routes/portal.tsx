import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Logo } from "@/components/site/Logo";
import { StatusPill } from "@/components/site/StatusBadge";
import { formatBDT, formatDate, q } from "@/services/api";

export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [{ title: "Customer Portal — ALPHINTERNET" }, { name: "description", content: "Your ALPHINTERNET account dashboard." }, { property: "og:title", content: "Customer Portal — ALPHINTERNET" }, { property: "og:description", content: "Your ALPHINTERNET account dashboard." }] }),
  loader: ({ context: { queryClient: c } }) => Promise.all([c.ensureQueryData(q.customer()), c.ensureQueryData(q.tickets()), c.ensureQueryData(q.packages())]),
  component: Portal,
});

const menu = ["Dashboard", "My Connection", "My Package", "Billing", "Payments", "Tickets", "Communication", "Service Status", "Profile"];

function Portal() {
  const { data: c } = useSuspenseQuery(q.customer());
  const { data: t } = useSuspenseQuery(q.tickets());
  const { data: p } = useSuspenseQuery(q.packages());
  const pkg = p.find((x) => x.id === c.packageId);
  const cards = [
    ["Connection", <StatusPill status={c.connectionStatus} dot />],
    ["Current package", pkg ? `${pkg.speed} Mbps` : "—"],
    ["Current bill", formatBDT(c.currentBill)],
    ["Due date", formatDate(c.dueDate)],
    ["Open tickets", String(t.filter((x) => x.status !== "resolved").length)],
    ["Service status", <StatusPill status="operational" />],
  ] as const;
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r bg-sidebar p-5 md:block">
        <Logo />
        <nav className="mt-8 space-y-1">{menu.map((m, i) => <div key={m} className={`rounded-md px-3 py-2 text-sm ${i === 0 ? "bg-sidebar-accent text-foreground" : "text-muted-foreground"}`}>{m}</div>)}</nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <div className="md:hidden"><Logo /></div>
        <h1 className="mt-4 text-3xl font-bold md:mt-0">Welcome, {c.name}</h1>
        <p className="text-sm text-muted-foreground">Customer ID {c.id}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([k, v]) => <div key={k} className="surface-card p-5"><div className="text-xs text-muted-foreground">{k}</div><div className="mt-2 font-display text-2xl font-semibold">{v}</div></div>)}
        </div>
      </main>
    </div>
  );
}
