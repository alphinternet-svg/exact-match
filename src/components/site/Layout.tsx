import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="grid-lines absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="bg-accent-wash absolute inset-0" />
      <div className="container-site relative py-16 md:py-24">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, description, children, className, action }: { eyebrow?: string; title?: string; description?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={cn("container-site py-16 md:py-24", className)}>
      {(title || eyebrow) && (
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            {title && <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>}
            {description && <p className="mt-3 text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StateMessage({ title, description, tone = "muted" }: { title: string; description?: string; tone?: "muted" | "error" }) {
  return (
    <div className={cn("surface-card p-10 text-center", tone === "error" && "border-destructive/40")}>
      <p className={cn("font-medium", tone === "error" && "text-destructive")}>{title}</p>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
