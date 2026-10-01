import type { Segment } from "@/types";

export const solutionSegments: { id: Segment; title: string; description: string; cta: string; icon: string; highlights: string[]; long: string }[] = [
  { id: "home", title: "Home Internet", description: "Fast and reliable connectivity for streaming, gaming, work and everyday use.", cta: "Explore Home Packages", icon: "Zap", highlights: ["Up to 150 Mbps", "Unlimited data", "Free router setup"], long: "Fiber straight to your home with consistent evening speeds, simple monthly billing and support that answers." },
  { id: "sme", title: "SME Solutions", description: "Reliable business connectivity designed for growing businesses.", cta: "Explore SME Solutions", icon: "Briefcase", highlights: ["Priority routing", "Static IP option", "Business support"], long: "Keep your shop, office or studio online with business-grade links, priority fault handling and room to grow." },
  { id: "corporate", title: "Corporate Solutions", description: "Professional connectivity and enterprise Internet solutions for organizations.", cta: "Explore Corporate Solutions", icon: "Building2", highlights: ["Dedicated bandwidth", "SLA-backed", "Multi-site"], long: "Dedicated, SLA-backed bandwidth with redundant paths, IP blocks, multi-site connectivity and a named account manager." },
];
