import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/data/brand";
import { Logo } from "./Logo";

export function Footer() {
  const col = "space-y-2.5 text-sm text-muted-foreground";
  const a = "transition-colors hover:text-foreground";
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="font-display text-lg font-semibold">{brand.tagline}</p>
          <p className="text-sm text-muted-foreground">{brand.supportLine}</p>
          <ul className="space-y-2 pt-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" />{brand.contact.phone} · Hotline {brand.contact.hotline}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" />{brand.contact.email}</li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{brand.contact.address}</li>
          </ul>
        </div>
        <div><h4 className="mb-4 text-sm font-semibold">Company</h4><ul className={col}>
          <li><Link to="/about" className={a}>About</Link></li>
          <li><Link to="/coverage" className={a}>Coverage</Link></li>
          <li><Link to="/contact" className={a}>Contact</Link></li>
        </ul></div>
        <div><h4 className="mb-4 text-sm font-semibold">Solutions</h4><ul className={col}>
          <li><Link to="/solutions" hash="home" className={a}>Home</Link></li>
          <li><Link to="/solutions" hash="sme" className={a}>SME</Link></li>
          <li><Link to="/solutions" hash="corporate" className={a}>Corporate</Link></li>
        </ul></div>
        <div><h4 className="mb-4 text-sm font-semibold">Support</h4><ul className={col}>
          <li><Link to="/support" className={a}>Help Center</Link></li>
          <li><Link to="/login" className={a}>Customer Login</Link></li>
          <li><Link to="/contact" className={a}>Support</Link></li>
        </ul></div>
        <div><h4 className="mb-4 text-sm font-semibold">Legal</h4><ul className={col}>
          <li><Link to="/legal/$doc" params={{ doc: "privacy" }} className={a}>Privacy Policy</Link></li>
          <li><Link to="/legal/$doc" params={{ doc: "terms" }} className={a}>Terms & Conditions</Link></li>
        </ul></div>
      </div>
      <div className="border-t">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <div className="flex gap-4">{brand.social.map((s) => <a key={s.label} href={s.href} className={a}>{s.label}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
