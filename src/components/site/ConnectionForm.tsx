import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, formatBDT, formatSpeed, q } from "@/services/api";
import { segmentLabels } from "@/data/brand";
import type { ConnectionRequest, Segment } from "@/types";

type Errors = Partial<Record<keyof ConnectionRequest, string>>;

function validate(v: ConnectionRequest): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name";
  if (!/^\+?[0-9\s-]{10,16}$/.test(v.mobile.trim())) e.mobile = "Enter a valid mobile number";
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
  if (!v.area.trim()) e.area = "Area is required";
  if (v.address.trim().length < 6) e.address = "Please enter your full address";
  if (v.message.length > 500) e.message = "Max 500 characters";
  return e;
}

export function ConnectionForm({ initial }: { initial?: Partial<ConnectionRequest> }) {
  const { data: packages = [] } = useQuery(q.packages());
  const [v, setV] = useState<ConnectionRequest>({
    fullName: "", mobile: "", email: "", customerType: "home", area: "", address: "", packageId: "", installDate: "", message: "", ...initial,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ref, setRef] = useState("");

  const set = <K extends keyof ConnectionRequest>(k: K, val: ConnectionRequest[K]) => setV((p) => ({ ...p, [k]: val }));
  const pkgOptions = packages.filter((p) => p.category === v.customerType);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("submitting");
    try {
      const res = await api.submitConnectionRequest(v);
      setRef(res.reference);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-card glow-accent p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-bold">Thank you. Our team will contact you shortly.</h2>
        <p className="mt-2 text-muted-foreground">Your request reference is <span className="font-mono text-foreground">{ref}</span>.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild variant="outline"><Link to="/">Back to home</Link></Button>
          <Button asChild><Link to="/packages">Browse packages</Link></Button>
        </div>
      </div>
    );
  }

  const field = (k: keyof ConnectionRequest, label: string, input: React.ReactNode, span2 = false) => (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <Label htmlFor={k} className="mb-1.5 block text-sm">{label}</Label>
      {input}
      {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card grid gap-5 p-6 sm:grid-cols-2 md:p-8">
      {field("fullName", "Full name *", <Input id="fullName" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} maxLength={80} />)}
      {field("mobile", "Mobile number *", <Input id="mobile" inputMode="tel" placeholder="+880 1XXX-XXXXXX" value={v.mobile} onChange={(e) => set("mobile", e.target.value)} />)}
      {field("email", "Email", <Input id="email" type="email" value={v.email} onChange={(e) => set("email", e.target.value)} maxLength={120} />)}
      {field("customerType", "Customer type *", (
        <Select value={v.customerType} onValueChange={(s) => setV((p) => ({ ...p, customerType: s as Segment, packageId: "" }))}>
          <SelectTrigger id="customerType"><SelectValue /></SelectTrigger>
          <SelectContent>{(Object.keys(segmentLabels) as Segment[]).map((s) => <SelectItem key={s} value={s}>{segmentLabels[s]}</SelectItem>)}</SelectContent>
        </Select>
      ))}
      {field("area", "Area *", <Input id="area" placeholder="e.g. Mirpur" value={v.area} onChange={(e) => set("area", e.target.value)} maxLength={60} />)}
      {field("packageId", "Preferred package", (
        <Select value={v.packageId} onValueChange={(s) => set("packageId", s)}>
          <SelectTrigger id="packageId"><SelectValue placeholder="Select a package" /></SelectTrigger>
          <SelectContent>{pkgOptions.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} · {formatSpeed(p.speed)} · {formatBDT(p.price)}</SelectItem>)}</SelectContent>
        </Select>
      ))}
      {field("address", "Full address *", <Input id="address" value={v.address} onChange={(e) => set("address", e.target.value)} maxLength={200} />, true)}
      {field("installDate", "Preferred installation date", <Input id="installDate" type="date" value={v.installDate} onChange={(e) => set("installDate", e.target.value)} />)}
      <div className="hidden sm:block" />
      {field("message", "Message", <Textarea id="message" rows={4} value={v.message} onChange={(e) => set("message", e.target.value)} maxLength={500} />, true)}
      {status === "error" && <p className="text-sm text-destructive sm:col-span-2">Something went wrong. Please try again.</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full font-semibold sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}Submit Connection Request
        </Button>
      </div>
    </form>
  );
}
