export interface PayerData {
  PAYER: string;
  CODE: string;
  MODIFER: string;
  ALLOWED: number;
}

export interface User {
  id: string;
  name: string;
  copay: number;
}

export interface InsuranceEntry {
  id: string;
  userId: string;
  insurance: string;
  cpt: string;
  modifier: string;
  allowed: number;
  deductible: number;
  coInsPercent: number;
  coInsAmount: number;
  // This is the calculated patient responsibility for the line item (Deductible + Co-Ins)
  amount: number; 
}