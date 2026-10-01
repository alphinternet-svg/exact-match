import {
  Activity, Briefcase, Building, Building2, Cable, Globe, Headset, MapPinned, Receipt, Server, ShieldCheck, Zap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Activity, Briefcase, Building, Building2, Cable, Globe, Headset, MapPinned, Receipt, Server, ShieldCheck, Zap,
};

/** Resolves an icon by name so CMS/API content can reference icons as strings. */
export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Zap;
  return <C className={className} aria-hidden />;
}
