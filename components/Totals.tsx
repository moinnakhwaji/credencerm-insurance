import { InsuranceEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalsProps {
  entries: InsuranceEntry[];
  copay: number;
  
}

export function Totals({ entries, copay }: TotalsProps) {

  const totalAllowed = entries.reduce((acc, entry) => acc + entry.allowed, 0);
  const totalLineItemsAmount = entries.reduce((acc, entry) => acc + entry.amount, 0);
  
  // The final patient total is the sum of line item responsibilities plus the single co-pay
  const finalTotal = totalLineItemsAmount + copay;

  // The final total cannot be more than the total allowed amount for all procedures
  const cappedFinalTotal = Math.min(finalTotal, totalAllowed);

  return (
    <Card className="mt-6 bg-secondary">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-lg">
          <div className="flex justify-between">
            <span>Total Allowed:</span>
            <span className="font-medium">${totalAllowed.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Co-Pay:</span>
            <span className="font-medium">${copay.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-xl">
            <span>Patient Total Responsibility:</span>
            <span>${cappedFinalTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}