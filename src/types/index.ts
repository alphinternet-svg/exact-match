export type Segment = "home" | "sme" | "corporate";

export interface InternetPackage {
  id: string;
  category: Segment;
  name: string;
  speed: number; // Mbps
  price: number; // BDT / month
  previousPrice?: number;
  billingCycle: "Monthly" | "Quarterly" | "Yearly";
  installationCharge: number;
  features: string[];
  terms: string[];
  popular?: boolean;
  campaignId?: string;
  availability: "available" | "limited";
  active: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  headline: string;
  description: string;
  targetSegment: Segment;
  packageId: string;
  discount: string;
  offerPrice: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export type CoverageStatus = "active" | "coming_soon" | "not_available";

export interface CoverageArea {
  id: string;
  name: string;
  district: string;
  division: string;
  status: CoverageStatus;
  /** Position on the stylised map, 0–100 */
  x: number;
  y: number;
}

export interface Statistic { id: string; value: string; label: string }
export interface Testimonial { id: string; name: string; role: string; quote: string; segment: Segment }
export interface Faq { id: string; question: string; answer: string }
export interface Service { id: string; title: string; description: string; icon: string }

export interface PortalCustomer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  connectionStatus: "ACTIVE" | "SUSPENDED" | "PENDING";
  packageId: string;
  currentBill: number;
  dueDate: string;
  ipType: string;
  since: string;
}

export interface Invoice { id: string; period: string; amount: number; status: "paid" | "due" | "overdue"; dueDate: string }
export interface Payment { id: string; date: string; amount: number; method: string; reference: string }
export interface Ticket { id: string; subject: string; status: "open" | "in_progress" | "resolved"; updatedAt: string; priority: "low" | "medium" | "high" }
export interface Message { id: string; title: string; body: string; date: string; read: boolean }
export interface ServiceStatusItem { id: string; name: string; status: "operational" | "degraded" | "maintenance"; note: string }

export interface ConnectionRequest {
  fullName: string;
  mobile: string;
  email: string;
  customerType: Segment;
  area: string;
  address: string;
  packageId: string;
  installDate: string;
  message: string;
}
