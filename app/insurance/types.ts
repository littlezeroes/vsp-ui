export interface InsuranceFormData {
  plateNumber: string
  chassisNumber: string
  engineNumber: string
  ownerType: "self" | "other"
  ownerName: string
  ownerDob: string
  ownerCccd: string
  ownerPhone: string
  ownerProvince: string
  ownerDistrict: string
  ownerWard: string
  startDate: string
  duration: 1 | 2 | 3
}

export const SELF_OWNER = {
  name: "Nguyễn Văn A",
  dob: "01/01/1990",
  cccd: "012345678901",
  phone: "0901234567",
  province: "TP. Hồ Chí Minh",
  district: "Quận 1",
  ward: "Phường Bến Nghé",
} as const

export const DURATION_FEES: Record<1 | 2 | 3, number> = {
  1: 180000,
  2: 324000,
  3: 486000,
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ"
}

export const STORAGE_KEY = "vsp_insurance_form"

export const DEFAULT_FORM: InsuranceFormData = {
  plateNumber: "",
  chassisNumber: "",
  engineNumber: "",
  ownerType: "self",
  ownerName: "",
  ownerDob: "",
  ownerCccd: "",
  ownerPhone: "",
  ownerProvince: "",
  ownerDistrict: "",
  ownerWard: "",
  startDate: "01/03/2026",
  duration: 1,
}
