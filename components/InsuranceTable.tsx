import { InsuranceEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InsuranceTableProps {
  entries: InsuranceEntry[];
  onEdit: (entry: InsuranceEntry) => void;
  onDelete: (entryId: string) => void;
}

export function InsuranceTable({ entries, onEdit, onDelete }: InsuranceTableProps) {
    if (entries.length === 0) {
        return <div className="text-center text-muted-foreground border rounded-lg p-8">No procedures added for this user yet.</div>
    }

  const handleDelete = (entryId: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      onDelete(entryId);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Insurance</TableHead>
          <TableHead>CPT</TableHead>
          <TableHead>Modifier</TableHead>
          <TableHead className="text-right">Allowed</TableHead>
          <TableHead className="text-right">Deductible</TableHead>
          <TableHead className="text-right">Co-Ins Amt</TableHead>
          <TableHead className="text-right font-bold">Line Amount</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{entry.insurance}</TableCell>
            <TableCell>{entry.cpt}</TableCell>
            <TableCell>{entry.modifier}</TableCell>
            <TableCell className="text-right">${entry.allowed.toFixed(2)}</TableCell>
            <TableCell className="text-right">${entry.deductible.toFixed(2)}</TableCell>
            <TableCell className="text-right">${entry.coInsAmount.toFixed(2)}</TableCell>
            <TableCell className="text-right font-bold">${entry.amount.toFixed(2)}</TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(entry)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(entry.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}