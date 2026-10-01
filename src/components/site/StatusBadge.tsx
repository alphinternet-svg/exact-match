import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "neutral" | "accent";
const tones: Record<Tone, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-destructive/30 bg-destructive/10 text-destructive",
  neutral: "border-border bg-secondary text-muted-foreground",
  accent: "border-primary/30 bg-primary/10 text-primary",
};

export function StatusBadge({ tone = "neutral", children, dot, className }: { tone?: Tone; children: React.ReactNode; dot?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider", tones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />}
      {children}
    </span>
  );
}

const statusMap: Record<string, { tone: Tone; label: string }> = {
  active: { tone: "success", label: "Active" },
  coming_soon: { tone: "warning", label: "Coming soon" },
  not_available: { tone: "danger", label: "Not available" },
  paid: { tone: "success", label: "Paid" },
  due: { tone: "warning", label: "Due" },
  overdue: { tone: "danger", label: "Overdue" },
  open: { tone: "accent", label: "Open" },
  in_progress: { tone: "warning", label: "In progress" },
  resolved: { tone: "success", label: "Resolved" },
  operational: { tone: "success", label: "Operational" },
  degraded: { tone: "warning", label: "Degraded" },
  maintenance: { tone: "warning", label: "Maintenance" },
  ACTIVE: { tone: "success", label: "Active" },
  SUSPENDED: { tone: "danger", label: "Suspended" },
  PENDING: { tone: "warning", label: "Pending" },
};

export function StatusPill({ status, dot }: { status: string; dot?: boolean }) {
  const s = statusMap[status] ?? { tone: "neutral" as Tone, label: status };
  return <StatusBadge tone={s.tone} dot={dot}>{s.label}</StatusBadge>;
}
