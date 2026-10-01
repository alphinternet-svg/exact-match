/**
 * Data access layer. Every function returns a Promise so mock data can later be
 * swapped for real API calls without touching UI components.
 */
import { queryOptions } from "@tanstack/react-query";
import * as mock from "@/data/mock";
import type { ConnectionRequest, Segment } from "@/types";

const delay = <T,>(value: T, ms = 150) => new Promise<T>((r) => setTimeout(() => r(value), ms));

export const api = {
  getPackages: (segment?: Segment) =>
    delay(mock.packages.filter((p) => p.active && (!segment || p.category === segment))),
  getCampaigns: () => delay(mock.campaigns.filter((c) => c.active)),
  getCoverageAreas: () => delay(mock.coverageAreas),
  searchCoverage: (q: string) => {
    const term = q.trim().toLowerCase();
    return delay(
      term ? mock.coverageAreas.filter((a) => `${a.name} ${a.district}`.toLowerCase().includes(term)) : [],
      350,
    );
  },
  getStatistics: () => delay(mock.statistics),
  getBenefits: () => delay(mock.benefits),
  getServices: () => delay(mock.services),
  getTestimonials: () => delay(mock.testimonials),
  getFaqs: () => delay(mock.faqs),
  submitConnectionRequest: (req: ConnectionRequest) => delay({ ok: true, reference: `REQ-${Date.now().toString().slice(-6)}`, req }, 900),
  login: (identifier: string, password: string) =>
    delay(identifier.length > 2 && password.length >= 4 ? { ok: true as const } : { ok: false as const, error: "Invalid credentials. Try any ID with a 4+ character password." }, 700),
  portal: {
    getCustomer: () => delay(mock.portalCustomer),
    getInvoices: () => delay(mock.invoices),
    getPayments: () => delay(mock.payments),
    getTickets: () => delay(mock.tickets),
    getMessages: () => delay(mock.messages),
    getServiceStatus: () => delay(mock.serviceStatus),
  },
};

export const q = {
  packages: () => queryOptions({ queryKey: ["packages"], queryFn: () => api.getPackages() }),
  campaigns: () => queryOptions({ queryKey: ["campaigns"], queryFn: api.getCampaigns }),
  coverage: () => queryOptions({ queryKey: ["coverage"], queryFn: api.getCoverageAreas }),
  statistics: () => queryOptions({ queryKey: ["statistics"], queryFn: api.getStatistics }),
  benefits: () => queryOptions({ queryKey: ["benefits"], queryFn: api.getBenefits }),
  services: () => queryOptions({ queryKey: ["services"], queryFn: api.getServices }),
  testimonials: () => queryOptions({ queryKey: ["testimonials"], queryFn: api.getTestimonials }),
  faqs: () => queryOptions({ queryKey: ["faqs"], queryFn: api.getFaqs }),
  customer: () => queryOptions({ queryKey: ["portal", "customer"], queryFn: api.portal.getCustomer }),
  invoices: () => queryOptions({ queryKey: ["portal", "invoices"], queryFn: api.portal.getInvoices }),
  payments: () => queryOptions({ queryKey: ["portal", "payments"], queryFn: api.portal.getPayments }),
  tickets: () => queryOptions({ queryKey: ["portal", "tickets"], queryFn: api.portal.getTickets }),
  messages: () => queryOptions({ queryKey: ["portal", "messages"], queryFn: api.portal.getMessages }),
  serviceStatus: () => queryOptions({ queryKey: ["portal", "status"], queryFn: api.portal.getServiceStatus }),
};

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-US")}`;
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
export const formatSpeed = (mbps: number) => (mbps >= 1000 ? `${mbps / 1000} Gbps` : `${mbps} Mbps`);
