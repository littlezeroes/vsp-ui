/* ── Smart Billing Hub — Types & Mock Data ─────────────────────────────── */

export type ServiceType = "housing" | "battery" | "education"
export type BillStatus = "pending" | "overdue" | "paid"
export type VehicleType = "auto" | "bike" | "taxi"
export type BatteryBillType = "charging_auto" | "charging_bike" | "rental_auto" | "rental_bike" | "installment_auto" | "charging_gsm"

/* ── Profile types ────────────────────────────────────────────────────── */
export interface Apartment {
  id: string
  name: string
  address: string
  provider: string
}

export interface Vehicle {
  id: string
  vinCode: string
  model: string
  type: VehicleType
}

export interface Student {
  id: string
  studentId: string
  name: string
  provider: string
}

export interface BillingProfile {
  id: string
  service: ServiceType
  refId: string // apartment.id | vehicle.id | student.id
  label: string
  sublabel: string
  billTypes: string[]
  autoPayEnabled: boolean
}

/* ── Bill types ───────────────────────────────────────────────────────── */
export interface HousingBill {
  id: string
  apartmentId: string
  title: string
  period: string
  amount: number
  dueDate: string
  status: BillStatus
  lineItems: { label: string; amount: number }[]
}

export interface BatteryBill {
  id: string
  vehicleId: string
  type: BatteryBillType
  title: string
  amount: number
  dueDate: string
  status: BillStatus
  issuedAt: string
  details: Record<string, string>
}

export interface EducationBill {
  id: string
  studentId: string
  title: string
  amount: number
  dueDate: string
  status: BillStatus
  period: string
}

export interface Transaction {
  id: string
  service: ServiceType
  profileLabel: string
  billTitle: string
  amount: number
  date: string
  status: "success" | "failed" | "pending"
}

/* ── Mock: Apartments ─────────────────────────────────────────────────── */
export const APARTMENTS: Apartment[] = [
  { id: "apt-a", name: "A", address: "Vinhomes Smart City", provider: "Vinhomes" },
  { id: "apt-b", name: "B", address: "Vinhomes Ocean Park 1", provider: "Vinhomes" },
  { id: "apt-c", name: "C", address: "Vinhomes Ocean Park 2", provider: "Vinhomes" },
  { id: "apt-d", name: "D", address: "Vinhomes Metropolis", provider: "Vinhomes" },
]

/* ── Mock: Vehicles ───────────────────────────────────────────────────── */
export const VEHICLES: Vehicle[] = [
  { id: "v-1", vinCode: "VIN-A", model: "VF9", type: "auto" },
  { id: "v-2", vinCode: "VIN-B", model: "VF8", type: "auto" },
  { id: "v-3", vinCode: "VIN-C", model: "Feliz S", type: "bike" },
  { id: "v-4", vinCode: "VIN-D", model: "VFe34", type: "taxi" },
]

/* ── Mock: Students ───────────────────────────────────────────────────── */
export const STUDENTS: Student[] = [
  { id: "stu-1", studentId: "VS2024001", name: "Nguyen Van B", provider: "Vinschool" },
  { id: "stu-2", studentId: "VS2024002", name: "Tran Thi C", provider: "Vinschool" },
]

/* ── Mock: Housing Bills ──────────────────────────────────────────────── */
export const HOUSING_BILLS: HousingBill[] = [
  {
    id: "hb-1", apartmentId: "apt-a", title: "Hoa don thang 01/2026", period: "01/2026",
    amount: 4_400_000, dueDate: "15/3/2026", status: "pending",
    lineItems: [
      { label: "Phi quan ly", amount: 2_200_000 },
      { label: "Phi dich vu tien ich", amount: 1_500_000 },
      { label: "Phi gui xe", amount: 700_000 },
    ],
  },
  {
    id: "hb-2", apartmentId: "apt-a", title: "Hoa don thang 02/2026", period: "02/2026",
    amount: 2_376_000, dueDate: "15/4/2026", status: "overdue",
    lineItems: [
      { label: "Phi quan ly", amount: 1_200_000 },
      { label: "Phi dich vu tien ich", amount: 876_000 },
      { label: "Phi gui xe", amount: 300_000 },
    ],
  },
  {
    id: "hb-3", apartmentId: "apt-a", title: "Hoa don thang 03/2026", period: "03/2026",
    amount: 3_800_000, dueDate: "15/5/2026", status: "pending",
    lineItems: [
      { label: "Phi quan ly", amount: 2_000_000 },
      { label: "Phi dich vu tien ich", amount: 1_200_000 },
      { label: "Phi gui xe", amount: 600_000 },
    ],
  },
  {
    id: "hb-4", apartmentId: "apt-b", title: "Hoa don thang 01/2026", period: "01/2026",
    amount: 3_200_000, dueDate: "20/3/2026", status: "pending",
    lineItems: [
      { label: "Phi quan ly", amount: 1_800_000 },
      { label: "Phi dich vu tien ich", amount: 900_000 },
      { label: "Phi gui xe", amount: 500_000 },
    ],
  },
]

/* ── Mock: Battery Bills ──────────────────────────────────────────────── */
export const BATTERY_BILLS: BatteryBill[] = [
  {
    id: "bb-1", vehicleId: "v-1", type: "charging_auto",
    title: "Dich vu sac Pin — Tram Smart City", amount: 4_200_000,
    dueDate: "10/2/2026", status: "pending", issuedAt: "05/02/2026 14:30",
    details: {
      "Dia chi tram sac": "Vinhomes Smart City, Ha Noi",
      "Plugged in from": "13:40 — 14:00",
      "Total kW charged": "60 kW",
      "Phi sac": "30.000 d",
      "Phi gui xe": "30.000 d",
    },
  },
  {
    id: "bb-2", vehicleId: "v-1", type: "rental_auto",
    title: "Thue Pin thang 01/2026", amount: 5_000_000,
    dueDate: "31/01/2026", status: "overdue", issuedAt: "01/01/2026",
    details: {
      "Ma hoa don": "AZP01KS",
      "Initial ODO": "200 Km",
      "Final ODO": "800 Km",
      "So Km da di": "600 Km",
      "So Km vuot han muc": "100 Km",
      "Unit Price": "80.000 d/km",
    },
  },
  {
    id: "bb-3", vehicleId: "v-1", type: "installment_auto",
    title: "Tra gop Pin thang 02/2026", amount: 5_000_000,
    dueDate: "25/02/2026", status: "pending", issuedAt: "01/02/2026",
    details: {
      "Phi thanh toan tre": "20.000 d",
      "Tien tinh": "5.000.000 d",
      "Khuyen mai 10%": "2.500.000 d",
    },
  },
  {
    id: "bb-4", vehicleId: "v-3", type: "charging_bike",
    title: "Hoa don sac pin thang 3", amount: 5_800_000,
    dueDate: "31/03/2026", status: "pending", issuedAt: "01/03/2026",
    details: {
      "Ma hoa don": "1234567123456",
      "Ngay bat dau": "01/03/2026",
      "Ngay ket thuc": "31/03/2026",
      "Chi phi sac": "5.800.000 d",
      "Khuyen mai": "0 d",
    },
  },
]

/* ── Mock: Education Bills ────────────────────────────────────────────── */
export const EDUCATION_BILLS: EducationBill[] = [
  { id: "eb-1", studentId: "stu-1", title: "Hoc phi thang 03/2026", amount: 8_500_000, dueDate: "20/3/2026", status: "pending", period: "03/2026" },
  { id: "eb-2", studentId: "stu-1", title: "Phi trong som — 03/2026", amount: 1_200_000, dueDate: "25/3/2026", status: "pending", period: "03/2026" },
  { id: "eb-3", studentId: "stu-2", title: "Hoc phi thang 03/2026", amount: 9_000_000, dueDate: "20/3/2026", status: "overdue", period: "03/2026" },
]

/* ── Mock: Profiles ───────────────────────────────────────────────────── */
export const PROFILES: BillingProfile[] = [
  { id: "p-1", service: "housing", refId: "apt-a", label: "A — Vinhomes Smart City", sublabel: "Nha o", billTypes: ["VHRService"], autoPayEnabled: false },
  { id: "p-2", service: "housing", refId: "apt-b", label: "B — Vinhomes Ocean Park 1", sublabel: "Nha o", billTypes: ["VHRService"], autoPayEnabled: true },
  { id: "p-3", service: "battery", refId: "v-1", label: "VF9 — VIN-A", sublabel: "Pin va Sac · O to", billTypes: ["CarLeasing", "CarCharging", "CarInstallment"], autoPayEnabled: false },
  { id: "p-4", service: "battery", refId: "v-3", label: "Feliz S — VIN-C", sublabel: "Pin va Sac · Xe may", billTypes: ["BikeCharging", "BikeleAsing"], autoPayEnabled: false },
  { id: "p-5", service: "education", refId: "stu-1", label: "Nguyen Van B", sublabel: "Giao duc · Vinschool", billTypes: ["Tuition", "EarlyDrop"], autoPayEnabled: false },
  { id: "p-6", service: "education", refId: "stu-2", label: "Tran Thi C", sublabel: "Giao duc · Vinschool", billTypes: ["Tuition"], autoPayEnabled: true },
]

/* ── Mock: Transactions ───────────────────────────────────────────────── */
export const TRANSACTIONS: Transaction[] = [
  { id: "tx-1", service: "housing", profileLabel: "A — Vinhomes Smart City", billTitle: "Hoa don thang 12/2025", amount: 4_100_000, date: "15/01/2026", status: "success" },
  { id: "tx-2", service: "battery", profileLabel: "VF9 — VIN-A", billTitle: "Thue Pin thang 12/2025", amount: 5_000_000, date: "31/12/2025", status: "success" },
  { id: "tx-3", service: "education", profileLabel: "Nguyen Van B", billTitle: "Hoc phi thang 02/2026", amount: 8_500_000, date: "18/02/2026", status: "success" },
  { id: "tx-4", service: "housing", profileLabel: "B — Vinhomes Ocean Park 1", billTitle: "Hoa don thang 12/2025", amount: 3_100_000, date: "20/01/2026", status: "failed" },
  { id: "tx-5", service: "battery", profileLabel: "Feliz S — VIN-C", billTitle: "Sac pin thang 02/2026", amount: 5_800_000, date: "28/02/2026", status: "pending" },
]

/* ── Helpers ───────────────────────────────────────────────────────────── */
export function formatVND(n: number): string {
  return n.toLocaleString("vi-VN") + " d"
}

export function getServiceIcon(service: ServiceType): { bg: string; color: string } {
  switch (service) {
    case "housing": return { bg: "bg-info/10", color: "text-info" }
    case "battery": return { bg: "bg-warning/10", color: "text-warning" }
    case "education": return { bg: "bg-success/10", color: "text-success" }
  }
}

export function getServiceLabel(service: ServiceType): string {
  switch (service) {
    case "housing": return "Nha o"
    case "battery": return "Pin va Sac"
    case "education": return "Giao duc"
  }
}

export function getStatusBadge(status: BillStatus): { text: string; className: string } {
  switch (status) {
    case "pending": return { text: "Cho thanh toan", className: "text-warning" }
    case "overdue": return { text: "Qua han", className: "text-danger" }
    case "paid": return { text: "Da thanh toan", className: "text-success" }
  }
}

export function getVehicleTypeLabel(type: VehicleType): string {
  switch (type) {
    case "auto": return "O to"
    case "bike": return "Xe may"
    case "taxi": return "Taxi Xanh"
  }
}

export function getBillsByApartment(id: string): HousingBill[] {
  return HOUSING_BILLS.filter((b) => b.apartmentId === id)
}

export function getBillsByVehicle(id: string): BatteryBill[] {
  return BATTERY_BILLS.filter((b) => b.vehicleId === id)
}

export function getBillsByStudent(id: string): EducationBill[] {
  return EDUCATION_BILLS.filter((b) => b.studentId === id)
}
