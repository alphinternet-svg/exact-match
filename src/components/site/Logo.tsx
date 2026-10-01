import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/logo-mark.png";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return <img src={logoMark} alt="" width={1024} height={1024} className={cn("h-8 w-8 object-contain", className)} />;
}

export function Logo({ compact = false, className, to = "/" }: { compact?: boolean; className?: string; to?: string }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2.5", className)} aria-label={`${brand.name} home`}>
      <LogoMark />
      {!compact && (
        <span className="font-display text-[1.05rem] font-bold tracking-[0.08em] text-foreground">
          ALPH<span className="text-primary">INTERNET</span>
        </span>
      )}
    </Link>
  );
}
