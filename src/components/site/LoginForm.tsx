import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";

export function LoginForm() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await api.login(id, pw);
    setLoading(false);
    if (res.ok) navigate({ to: "/portal" });
    else setError(res.error);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <Label htmlFor="identifier" className="mb-1.5 block">Mobile / Email / Customer ID</Label>
        <Input id="identifier" value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" className="h-11" placeholder="ALP-204518" required />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button type="button" onClick={() => setForgot(true)} className="text-xs text-primary hover:underline">Forgot Password</button>
        </div>
        <Input id="password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" className="h-11" required />
      </div>
      {forgot && <p className="rounded-md border bg-secondary p-3 text-xs text-muted-foreground">Password reset will be available soon. Call our hotline to reset your password today.</p>}
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}Login
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New customer? <Link to="/connect" className="font-medium text-primary hover:underline">Request a connection</Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">Demo: any ID with a 4+ character password.</p>
    </form>
  );
}
