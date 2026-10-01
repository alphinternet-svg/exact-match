import type {
  Campaign, CoverageArea, Faq, InternetPackage, Invoice, Message, Payment, PortalCustomer,
  Service, ServiceStatusItem, Statistic, Testimonial, Ticket,
} from "@/types";

const homeFeatures = ["Unlimited data", "Fiber to the home", "Free Wi‑Fi router setup", "24/7 support"];
const smeFeatures = ["Business-grade fiber", "Priority support", "Shared static IP option", "99.5% uptime target"];
const corpFeatures = ["Dedicated bandwidth", "SLA-backed uptime", "Static IP block", "Account manager", "Redundant links"];
const baseTerms = ["Prices include VAT", "Installation within 48 hours in covered areas", "Monthly billing, cancel with 30 days' notice"];

export const packages: InternetPackage[] = [
  { id: "home-50", category: "home", name: "Home 50", speed: 50, price: 800, billingCycle: "Monthly", installationCharge: 500, features: homeFeatures, terms: baseTerms, availability: "available", active: true },
  { id: "home-100", category: "home", name: "Home 100", speed: 100, price: 899, previousPrice: 1000, billingCycle: "Monthly", installationCharge: 0, features: [...homeFeatures, "Ideal for 4K streaming"], terms: baseTerms, popular: true, campaignId: "cmp-100", availability: "available", active: true },
  { id: "home-150", category: "home", name: "Home 150", speed: 150, price: 1300, billingCycle: "Monthly", installationCharge: 500, features: [...homeFeatures, "Low-latency gaming route"], terms: baseTerms, availability: "available", active: true },
  { id: "sme-50", category: "sme", name: "Business 50", speed: 50, price: 1500, billingCycle: "Monthly", installationCharge: 1000, features: smeFeatures, terms: baseTerms, availability: "available", active: true },
  { id: "sme-100", category: "sme", name: "Business 100", speed: 100, price: 2000, billingCycle: "Monthly", installationCharge: 1000, features: [...smeFeatures, "Up to 25 users"], terms: baseTerms, popular: true, availability: "available", active: true },
  { id: "sme-200", category: "sme", name: "Business 200", speed: 200, price: 2700, previousPrice: 3000, billingCycle: "Monthly", installationCharge: 0, features: [...smeFeatures, "Up to 60 users"], terms: baseTerms, campaignId: "cmp-sme", availability: "limited", active: true },
  { id: "corp-basic", category: "corporate", name: "Corporate Basic", speed: 100, price: 8000, billingCycle: "Monthly", installationCharge: 5000, features: corpFeatures, terms: [...baseTerms, "12-month contract"], availability: "available", active: true },
  { id: "corp-business", category: "corporate", name: "Corporate Business", speed: 300, price: 18000, billingCycle: "Monthly", installationCharge: 5000, features: [...corpFeatures, "Managed firewall"], terms: [...baseTerms, "12-month contract"], popular: true, availability: "available", active: true },
  { id: "corp-enterprise", category: "corporate", name: "Enterprise Connectivity", speed: 1000, price: 45000, billingCycle: "Monthly", installationCharge: 0, features: [...corpFeatures, "Managed firewall", "Multi-site connectivity"], terms: [...baseTerms, "Custom contract"], availability: "limited", active: true },
];

export const campaigns: Campaign[] = [
  { id: "cmp-100", title: "Limited time offer", headline: "Get 100 Mbps at ৳899/month", description: "Upgrade your home to 100 Mbps fiber with free installation. For new connections only.", targetSegment: "home", packageId: "home-100", discount: "10% off + free installation", offerPrice: 899, startDate: "2026-09-15", endDate: "2026-10-31", active: true },
  { id: "cmp-sme", title: "Business boost", headline: "Business 200 for ৳2,700/month", description: "Give your growing team more headroom. Free installation for SMEs signing up this month.", targetSegment: "sme", packageId: "sme-200", discount: "৳300 off monthly", offerPrice: 2700, startDate: "2026-10-01", endDate: "2026-11-30", active: true },
  { id: "cmp-corp", title: "Enterprise onboarding", headline: "Free installation on Enterprise links", description: "Multi-site organisations get installation, setup and first-month support at no charge.", targetSegment: "corporate", packageId: "corp-enterprise", discount: "Installation waived", offerPrice: 45000, startDate: "2026-10-01", endDate: "2026-12-31", active: true },
];

export const coverageAreas: CoverageArea[] = [
  { id: "mirpur", name: "Mirpur", district: "Dhaka", division: "Dhaka", status: "active", x: 52, y: 46 },
  { id: "gulshan", name: "Gulshan", district: "Dhaka", division: "Dhaka", status: "active", x: 56, y: 48 },
  { id: "dhanmondi", name: "Dhanmondi", district: "Dhaka", division: "Dhaka", status: "active", x: 53, y: 50 },
  { id: "uttara", name: "Uttara", district: "Dhaka", division: "Dhaka", status: "active", x: 54, y: 42 },
  { id: "mohammadpur", name: "Mohammadpur", district: "Dhaka", division: "Dhaka", status: "active", x: 51, y: 49 },
  { id: "narayanganj", name: "Narayanganj", district: "Narayanganj", division: "Dhaka", status: "active", x: 57, y: 54 },
  { id: "gazipur", name: "Gazipur", district: "Gazipur", division: "Dhaka", status: "active", x: 55, y: 36 },
  { id: "chattogram", name: "Agrabad", district: "Chattogram", division: "Chattogram", status: "active", x: 76, y: 72 },
  { id: "sylhet", name: "Zindabazar", district: "Sylhet", division: "Sylhet", status: "active", x: 78, y: 26 },
  { id: "rajshahi", name: "Shaheb Bazar", district: "Rajshahi", division: "Rajshahi", status: "active", x: 22, y: 36 },
  { id: "khulna", name: "Sonadanga", district: "Khulna", division: "Khulna", status: "active", x: 34, y: 70 },
  { id: "cumilla", name: "Kandirpar", district: "Cumilla", division: "Chattogram", status: "coming_soon", x: 66, y: 58 },
  { id: "rangpur", name: "Jahaj Company", district: "Rangpur", division: "Rangpur", status: "coming_soon", x: 30, y: 14 },
  { id: "barishal", name: "Sadar Road", district: "Barishal", division: "Barishal", status: "coming_soon", x: 48, y: 72 },
  { id: "mymensingh", name: "Ganginar Par", district: "Mymensingh", division: "Mymensingh", status: "coming_soon", x: 54, y: 24 },
  { id: "coxs", name: "Kolatoli", district: "Cox's Bazar", division: "Chattogram", status: "not_available", x: 80, y: 88 },
];

export const statistics: Statistic[] = [
  { id: "customers", value: "50,000+", label: "Happy customers" },
  { id: "areas", value: "64+", label: "Coverage areas" },
  { id: "pops", value: "25+", label: "POP locations" },
  { id: "reliability", value: "99.9%", label: "Network reliability" },
];

export const benefits: Service[] = [
  { id: "b1", title: "Reliable connectivity", description: "Redundant fiber routes keep you online when it matters.", icon: "ShieldCheck" },
  { id: "b2", title: "Nationwide coverage", description: "From Dhaka to divisional cities, and growing every month.", icon: "MapPinned" },
  { id: "b3", title: "Professional support", description: "Real engineers on call 24/7 — not scripted chatbots.", icon: "Headset" },
  { id: "b4", title: "Fast installation", description: "Most connections are live within 48 hours.", icon: "Zap" },
  { id: "b5", title: "Transparent packages", description: "Clear pricing with no hidden charges on your bill.", icon: "Receipt" },
  { id: "b6", title: "Business & corporate", description: "SLA-backed links and dedicated account managers.", icon: "Building2" },
];

export const services: Service[] = [
  { id: "s1", title: "High-speed fiber", description: "FTTH and FTTB delivery up to 1 Gbps.", icon: "Cable" },
  { id: "s2", title: "Business connectivity", description: "Symmetric, priority-routed links for teams.", icon: "Briefcase" },
  { id: "s3", title: "Corporate solutions", description: "Dedicated bandwidth, multi-site and SLA.", icon: "Building" },
  { id: "s4", title: "Static IP", description: "Single or block allocations for hosting & VPN.", icon: "Globe" },
  { id: "s5", title: "Network monitoring", description: "Proactive 24/7 monitoring of our backbone.", icon: "Activity" },
  { id: "s6", title: "Reliable infrastructure", description: "Carrier-grade POPs with backup power.", icon: "Server" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Farhana Rahman", role: "Home customer, Mirpur", quote: "Installation took one afternoon and the speed has been steady every evening since.", segment: "home" },
  { id: "t2", name: "Tanvir Ahmed", role: "Founder, design studio", quote: "Our team of 20 runs video calls all day without a hiccup. Support actually picks up.", segment: "sme" },
  { id: "t3", name: "Nusrat Jahan", role: "IT lead, logistics firm", quote: "Three branches on one managed network with a single point of contact. Exactly what we needed.", segment: "corporate" },
];

export const faqs: Faq[] = [
  { id: "f1", question: "How long does a new connection take?", answer: "In covered areas, most connections are installed within 48 hours of confirming your request." },
  { id: "f2", question: "Is there a data cap?", answer: "No. All home and business packages include unlimited data." },
  { id: "f3", question: "How do I pay my bill?", answer: "Pay through the customer portal using mobile banking, card, or at any of our service points." },
  { id: "f4", question: "Can I upgrade my package later?", answer: "Yes. Upgrades are applied the same day and billed pro-rata." },
  { id: "f5", question: "Do you offer static IP?", answer: "Static IPs are available on SME and Corporate packages, and as an add-on for home users." },
];

export const portalCustomer: PortalCustomer = {
  id: "ALP-204518", name: "Rafiq Hasan", mobile: "+880 1700-000000", email: "rafiq@example.com",
  address: "Road 4, Block C, Mirpur 10, Dhaka", connectionStatus: "ACTIVE", packageId: "home-100",
  currentBill: 1000, dueDate: "2026-10-05", ipType: "Dynamic (shared)", since: "2023-03-12",
};

export const invoices: Invoice[] = [
  { id: "INV-2610", period: "October 2026", amount: 1000, status: "due", dueDate: "2026-10-05" },
  { id: "INV-2609", period: "September 2026", amount: 1000, status: "paid", dueDate: "2026-09-05" },
  { id: "INV-2608", period: "August 2026", amount: 1000, status: "paid", dueDate: "2026-08-05" },
  { id: "INV-2607", period: "July 2026", amount: 1000, status: "paid", dueDate: "2026-07-05" },
];

export const payments: Payment[] = [
  { id: "PAY-9821", date: "2026-09-03", amount: 1000, method: "bKash", reference: "8N7X2QK1" },
  { id: "PAY-9533", date: "2026-08-04", amount: 1000, method: "Card", reference: "VISA •••• 4421" },
  { id: "PAY-9210", date: "2026-07-02", amount: 1000, method: "Nagad", reference: "NG55120" },
];

export const tickets: Ticket[] = [
  { id: "TKT-4410", subject: "Intermittent drop in the evening", status: "in_progress", updatedAt: "2026-09-29", priority: "medium" },
  { id: "TKT-4398", subject: "Router relocation request", status: "open", updatedAt: "2026-09-27", priority: "low" },
  { id: "TKT-4102", subject: "Slow speed on Wi‑Fi", status: "resolved", updatedAt: "2026-08-14", priority: "medium" },
];

export const messages: Message[] = [
  { id: "m1", title: "Scheduled maintenance — Mirpur", body: "Brief maintenance on Oct 8, 2:00–4:00 AM. Expect up to 15 minutes of downtime.", date: "2026-09-30", read: false },
  { id: "m2", title: "Your September invoice is paid", body: "Thank you. Your payment of ৳1,000 was received.", date: "2026-09-03", read: true },
  { id: "m3", title: "New: 150 Mbps upgrade offer", body: "Upgrade to Home 150 and get the first month at the 100 Mbps price.", date: "2026-08-20", read: true },
];

export const serviceStatus: ServiceStatusItem[] = [
  { id: "ss1", name: "Your connection", status: "operational", note: "Online for 12 days" },
  { id: "ss2", name: "Mirpur area network", status: "operational", note: "No issues reported" },
  { id: "ss3", name: "International bandwidth", status: "operational", note: "Normal" },
  { id: "ss4", name: "Billing & payments", status: "maintenance", note: "Planned update Oct 8, 2–4 AM" },
];
