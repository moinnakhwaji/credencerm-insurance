export type ScheduleItem = {
  payer: string;
  code: string;
  modifier: string;
  allowed: number;
};

export const feeSchedule: ScheduleItem[] = [
  { payer: "BCBS", code: "77061", modifier: "RT", allowed: 135 },
  { payer: "BCBS", code: "77062", modifier: "LT", allowed: 135 },
  { payer: "BCBS", code: "77065", modifier: "50", allowed: 270 },
  { payer: "BCBS", code: "77063", modifier: "52", allowed: 230 },
  { payer: "BCBS", code: "77067", modifier: "", allowed: 125 },
  { payer: "MEDICARE", code: "77061", modifier: "RT", allowed: 300 },
  { payer: "MEDICARE", code: "77062", modifier: "LT", allowed: 300 },
  { payer: "MEDICARE", code: "77065", modifier: "50", allowed: 500 },
  { payer: "MEDICARE", code: "77063", modifier: "52", allowed: 250 },
  { payer: "MEDICARE", code: "77067", modifier: "", allowed: 130 },
  { payer: "CIGNA", code: "77061", modifier: "RT", allowed: 170 },
  { payer: "CIGNA", code: "77062", modifier: "LT", allowed: 170 },
  { payer: "CIGNA", code: "77065", modifier: "50", allowed: 340 },
  { payer: "CIGNA", code: "77063", modifier: "52", allowed: 280 },
  { payer: "CIGNA", code: "77067", modifier: "", allowed: 160 },
  { payer: "HUMANA", code: "77061", modifier: "RT", allowed: 270 },
  { payer: "HUMANA", code: "77062", modifier: "LT", allowed: 270 },
  { payer: "HUMANA", code: "77065", modifier: "50", allowed: 620 },
  { payer: "HUMANA", code: "77063", modifier: "52", allowed: 456 },
  { payer: "HUMANA", code: "77067", modifier: "", allowed: 130 },
  { payer: "UHC", code: "77061", modifier: "RT", allowed: 135 },
  { payer: "UHC", code: "77062", modifier: "LT", allowed: 135 },
  { payer: "UHC", code: "77065", modifier: "50", allowed: 270 },
  { payer: "UHC", code: "77063", modifier: "52", allowed: 240 },
  { payer: "UHC", code: "77063", modifier: "", allowed: 120 },
  { payer: "UMR", code: "77061", modifier: "RT", allowed: 165 },
  { payer: "UMR", code: "77062", modifier: "LT", allowed: 165 },
  { payer: "UMR", code: "77065", modifier: "50", allowed: 320 },
  { payer: "UMR", code: "77063", modifier: "52", allowed: 280 },
  { payer: "UMR", code: "77063", modifier: "", allowed: 210 },
];

export const payers = [...new Set(feeSchedule.map(item => item.payer))];