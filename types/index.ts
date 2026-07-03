export type OwnershipStatus = "Homeowner" | "Mortgage" | "Tenant";

export type PropertyType =
  | "Detached"
  | "Semi Detached"
  | "Terraced"
  | "Bungalow"
  | "Flat";

export type RoofDirection = "South" | "East" | "West" | "North" | "Not Sure";

export type BillBand = "£0-75" | "£75-150" | "£150-250" | "£250+";

export interface QuoteFormData {
  ownership: OwnershipStatus | null;
  propertyType: PropertyType | null;
  roofDirection: RoofDirection | null;
  monthlyBill: BillBand | null;
  postcode: string;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export const initialQuoteFormData: QuoteFormData = {
  ownership: null,
  propertyType: null,
  roofDirection: null,
  monthlyBill: null,
  postcode: "",
  fullName: "",
  email: "",
  phone: "",
  consent: false,
};

export interface FaqItem {
  question: string;
  answer: string;
}
