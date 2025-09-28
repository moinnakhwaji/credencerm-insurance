import { useState } from "react";
import { InsuranceEntry, User } from "@/lib/types";
import { InsuranceForm } from "@/components/InsuranceForm";
import { InsuranceTable } from "@/components/InsuranceTable";
import { Totals } from "@/components/Totals";

interface InsuranceManagerProps {
  user: User;
  entries: InsuranceEntry[];
  onAddEntry: (entryData: Omit<InsuranceEntry, 'id' | 'userId' | 'amount'>) => void;
  onUpdateEntry: (entry: InsuranceEntry) => void;
  onDeleteEntry: (entryId: string) => void;
  onUpdateCopay: (userId: string, copay: number) => void;
}

export function InsuranceManager({ user, entries, onAddEntry, onUpdateEntry, onDeleteEntry, onUpdateCopay }: InsuranceManagerProps) {
  const [editingEntry, setEditingEntry] = useState<InsuranceEntry | null>(null);

  const handleEdit = (entry: InsuranceEntry) => {
    setEditingEntry(entry);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleFormSubmit = (entryData: Omit<InsuranceEntry, 'id' | 'userId' | 'amount'>) => {
    if (editingEntry) {
      // Logic to properly update the entry
      const finalAmount = Math.min(
        entryData.deductible + entryData.coInsAmount,
        entryData.allowed
      );
      onUpdateEntry({ ...editingEntry, ...entryData, amount: finalAmount });
    } else {
      onAddEntry(entryData);
    }
    setEditingEntry(null); // Clear editing state after submit
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <InsuranceForm
          key={editingEntry?.id ?? 'new'} // Re-render form when editing changes
          onSubmit={handleFormSubmit}
          editingEntry={editingEntry}
          onCancelEdit={handleCancelEdit}
          copay={user.copay}
          setCopay={(newCopay) => onUpdateCopay(user.id, newCopay)}
          isCopayDisabled={entries.length > 0 && !editingEntry}
        />
      </div>

      <div className="lg:col-span-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Procedures for {user.name}</h2>
          <InsuranceTable 
            entries={entries} 
            onEdit={handleEdit}
            onDelete={onDeleteEntry}
          />
          {entries.length > 0 && <Totals entries={entries} copay={user.copay} />}
        </div>
      </div>
    </div>
  );
}