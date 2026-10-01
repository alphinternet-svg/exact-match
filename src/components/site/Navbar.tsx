import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/coverage", label: "Coverage" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

const solutions = [
  { hash: "home", label: "Home", desc: "Fiber for households" },
  { hash: "sme", label: "SME", desc: "For growing businesses" },
  { hash: "corporate", label: "Corporate", desc: "Enterprise connectivity" },
] as const;

const linkCls = "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-colors", scrolled ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent bg-background/40 backdrop-blur-sm")}>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center lg:flex" aria-label="Main">
          <Link to="/" className={linkCls} activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>Home</Link>
          <div className="group relative">
            <Link to="/solutions" className={cn(linkCls, "inline-flex items-center gap-1")} activeProps={{ className: "text-foreground" }}>
              Solutions <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="invisible absolute left-0 top-full w-60 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="surface-card p-2">
                {solutions.map((s) => (
                  <Link key={s.hash} to="/solutions" hash={s.hash} className="block rounded-md px-3 py-2 hover:bg-secondary">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to} className={linkCls} activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Customer Login</Link>
          </Button>
          <Button asChild size="sm" className="font-semibold">
            <Link to="/connect">Get Connected</Link>
          </Button>
          <button className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md border lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background lg:hidden">
          <nav className="container-site flex flex-col py-3" aria-label="Mobile">
            {nav.slice(0, 1).map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-base">{n.label}</Link>)}
            <div className="py-2">
              <div className="eyebrow mb-1">Solutions</div>
              <div className="grid grid-cols-3 gap-2">
                {solutions.map((s) => (
                  <Link key={s.hash} to="/solutions" hash={s.hash} onClick={() => setOpen(false)} className="rounded-md border px-3 py-2 text-center text-sm">{s.label}</Link>
                ))}
              </div>
            </div>
            {nav.slice(1).map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-3 text-base last:border-0">{n.label}</Link>)}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild variant="outline"><Link to="/login" onClick={() => setOpen(false)}>Customer Login</Link></Button>
              <Button asChild><Link to="/connect" onClick={() => setOpen(false)}>Get Connected</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
