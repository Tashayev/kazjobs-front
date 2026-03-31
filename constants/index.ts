import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  Laptop,
  HeartHandshake,
  BarChart3,
  Wrench,
  GraduationCap,
  ShoppingBag,
  Megaphone,
  Calculator,
  Gavel,
  Truck,
  Building,
  FileText,
  Hotel,
  Palette,
  Shield,
} from "lucide-react"

export const STATS = [
  { label: "Active Jobs", value: "1,200+", icon: Briefcase },
  { label: "Companies", value: "340+", icon: Building2 },
  { label: "Job Seekers", value: "8,500+", icon: Users },
  { label: "Placements", value: "2,100+", icon: TrendingUp },
]

export const CATEGORIES = [
  { label: "IT & Technology", icon: Laptop, count: 234 },
  { label: "Sales & Business Development", icon: BarChart3, count: 118 },
  { label: "Marketing & PR", icon: Megaphone, count: 95 },
  { label: "Healthcare & Pharma", icon: HeartHandshake, count: 95 },
  { label: "Engineering & Manufacturing", icon: Wrench, count: 142 },
  { label: "Education & Science", icon: GraduationCap, count: 87 },
  { label: "Retail & E-commerce", icon: ShoppingBag, count: 63 },
  { label: "Accounting & Finance", icon: Calculator, count: 0 },
  { label: "Legal", icon: Gavel, count: 0 },
  { label: "Logistics & Transportation", icon: Truck, count: 0 },
  { label: "Construction & Real Estate", icon: Building, count: 0 },
  { label: "Administrative Staff", icon: FileText, count: 0 },
  { label: "Hospitality & Tourism", icon: Hotel, count: 0 },
  { label: "Design & Creative", icon: Palette, count: 0 },
  { label: "Security", icon: Shield, count: 0 }
]

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Account",
    desc: "Sign up as a job seeker or employer in under a minute.",
  },
  {
    step: "02",
    title: "Find or Post",
    desc: "Browse thousands of listings or post your open role.",
  },
  {
    step: "03",
    title: "Connect",
    desc: "Apply directly or review applicants and move fast.",
  },
]

export const TYPE_COLORS: Record<string, string> = {
  "full-time": "bg-blue-50 text-blue-700",
  "part-time": "bg-amber-50 text-amber-700",
  remote: "bg-emerald-50 text-emerald-700",
}
export const JOB_TYPES = [
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Remote", value: "remote" },
]

export const KZ_CITIES = [
  "Almaty", "Astana", "Shymkent", "Karaganda", 
  "Aktobe", "Taraz", "Oral", "Pavlodar"
]

export const JOB_CATEGORIES = [
  { label: "IT & Technology", value: "it-technology" },
  { label: "Sales & Business", value: "sales-business-development" },
  { label: "Marketing & PR", value: "marketing-pr" },
  { label: "Healthcare", value: "healthcare-pharma" },
  { label: "Engineering", value: "engineering-manufacturing" },
  { label: "Education", value: "education-science" },
  { label: "Retail", value: "retail-ecommerce" },
  { label: "Finance", value: "accounting-finance" },
  { label: "Legal", value: "legal" },
  { label: "Logistics", value: "logistics-transportation" },
  { label: "Construction", value: "construction-real-estate" },
  { label: "Admin", value: "administrative-staff" },
  { label: "Hospitality", value: "hospitality-tourism" },
  { label: "Design", value: "design-creative" },
  { label: "Security", value: "security" },
  { label: "Skilled Labor", value: "skilled-labor" },
]