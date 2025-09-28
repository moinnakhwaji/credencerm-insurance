"use client";

import { useState, useMemo, useEffect } from "react";
import { predefinedData } from "@/lib/data";
import { InsuranceEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsuranceFormProps {
  onSubmit: (entry: Omit<InsuranceEntry, 'id' | 'userId' | 'amount'>) => void;
  editingEntry: InsuranceEntry | null;
  onCancelEdit: () => void;
  copay: number;
  setCopay: (value: number) => void;
  isCopayDisabled: boolean;
}

export function InsuranceForm({ onSubmit, editingEntry, onCancelEdit, copay, setCopay, isCopayDisabled }: InsuranceFormProps) {
  const isEditing = !!editingEntry;
  
  // Form state
  const [selectedPayer, setSelectedPayer] = useState<string>("");
  const [selectedCpt, setSelectedCpt] = useState<string>("");
  const [selectedModifier, setSelectedModifier] = useState<string>("");
  const [allowedAmount, setAllowedAmount] = useState<number>(0);
  const [deductible, setDeductible] = useState<string>("");
  const [coInsPercent, setCoInsPercent] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");


  // Populate form when editing an entry
  useEffect(() => {
    if (isEditing) {
      setSelectedPayer(editingEntry.insurance);
      setSelectedCpt(editingEntry.cpt);
      setSelectedModifier(editingEntry.modifier);
      setAllowedAmount(editingEntry.allowed);
      setDeductible(String(editingEntry.deductible));
      setCoInsPercent(String(editingEntry.coInsPercent));
    }
  }, [editingEntry, isEditing]);


  const payers = useMemo(() => [...new Set(predefinedData.map((d) => d.PAYER))], []);
  const cpts = useMemo(() => {
    if (!selectedPayer) return [];
    return [...new Set(predefinedData.filter((d) => d.PAYER === selectedPayer).map((d) => d.CODE))];
  }, [selectedPayer]);

  const modifiers = useMemo(() => {
    if (!selectedPayer || !selectedCpt) return [];
    return predefinedData
      .filter((d) => d.PAYER === selectedPayer && d.CODE === selectedCpt)
      .map((d) => d.MODIFER);
  }, [selectedPayer, selectedCpt]);
  
  // Auto-update allowed amount
  useEffect(() => {
    if (isEditing && allowedAmount === editingEntry.allowed) return;

    if (selectedPayer && selectedCpt && selectedModifier !== undefined) {
      const match = predefinedData.find(
        (d) =>
          d.PAYER === selectedPayer &&
          d.CODE === selectedCpt &&
          d.MODIFER === selectedModifier
      );
      setAllowedAmount(match ? match.ALLOWED : 0);
    } else {
      setAllowedAmount(0);
    }
  }, [selectedPayer, selectedCpt, selectedModifier, isEditing, allowedAmount, editingEntry]);
  
  // *** NEW: REAL-TIME VALIDATION LOGIC ***
  useEffect(() => {
    const deductibleValue = parseFloat(deductible) || 0;
    const coInsPercentValue = parseFloat(coInsPercent) || 0;

    if (allowedAmount > 0) {
      const coInsAmountValue = (allowedAmount * coInsPercentValue) / 100;
      const totalResponsibility = deductibleValue + coInsAmountValue;

      if (totalResponsibility > allowedAmount) {
        setValidationError(
          `Error: Deductible + Co-Ins ($${totalResponsibility.toFixed(2)}) cannot exceed Allowed Amount ($${allowedAmount.toFixed(2)}).`
        );
      } else {
        setValidationError(""); // Clear error if valid
      }
    } else {
      setValidationError(""); // Clear error if no procedure is selected
    }
  }, [deductible, coInsPercent, allowedAmount]);


  const resetForm = () => {
    setSelectedPayer("");
    setSelectedCpt("");
    setSelectedModifier("");
    setDeductible("");
    setCoInsPercent("");
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validationError) {
        alert(validationError);
        return;
    }
    
    if (!selectedPayer || !selectedCpt || allowedAmount <= 0) {
      alert("Please select a valid combination of Payer, CPT, and Modifier.");
      return;
    }

    const deductibleValue = parseFloat(deductible) || 0;
    const coInsPercentValue = parseFloat(coInsPercent) || 0;
    const coInsAmountValue = (allowedAmount * coInsPercentValue) / 100;

    onSubmit({
      insurance: selectedPayer,
      cpt: selectedCpt,
      modifier: selectedModifier,
      allowed: allowedAmount,
      deductible: deductibleValue,
      coInsPercent: coInsPercentValue,
      coInsAmount: coInsAmountValue,
    });
    
    if (!isEditing) {
      resetForm();
    }
  };

  const coInsAmountPreview = ((allowedAmount * (parseFloat(coInsPercent) || 0)) / 100).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Procedure' : 'Add New Procedure'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Insurance Payer</label>
            <Select onValueChange={setSelectedPayer} value={selectedPayer}>
              <SelectTrigger><SelectValue placeholder="Select Payer" /></SelectTrigger>
              <SelectContent>{payers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CPT Code</label>
            <Select onValueChange={setSelectedCpt} value={selectedCpt} disabled={!selectedPayer}>
              <SelectTrigger><SelectValue placeholder="Select CPT Code" /></SelectTrigger>
              <SelectContent>{cpts.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modifier</label>
            <Select onValueChange={setSelectedModifier} value={selectedModifier} disabled={!selectedCpt}>
              <SelectTrigger><SelectValue placeholder="Select Modifier" /></SelectTrigger>
              <SelectContent>{modifiers.map(m => <SelectItem key={m} value={m}>{m || 'None'}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Allowed Amount</label>
            <Input type="text" value={`$${allowedAmount.toFixed(2)}`} readOnly disabled />
          </div>

          {/* --- Co-Pay Input is now here --- */}
          <div>
            <label className="block text-sm font-medium mb-1">Co-Pay</label>
            <Input
              type="number"
              placeholder="Enter Co-Pay Amount"
              value={copay || ""}
              onChange={(e) => setCopay(parseFloat(e.target.value) || 0)}
              disabled={isCopayDisabled}
            />
             {isCopayDisabled && <p className="text-xs text-muted-foreground mt-1">Co-pay can be set once per user session.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deductible</label>
            <Input type="number" placeholder="Enter Deductible" value={deductible} onChange={e => setDeductible(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Co-Insurance (%)</label>
            <div className="flex items-center gap-2">
              <Input className="flex-1" type="number" placeholder="e.g., 10 for 10%" value={coInsPercent} onChange={e => setCoInsPercent(e.target.value)} />
              <span className="text-sm font-semibold w-24 text-right">= ${coInsAmountPreview}</span>
            </div>
          </div>
          
          {/* Display Validation Error */}
          {validationError && (
            <p className="text-sm font-medium text-destructive">{validationError}</p>
          )}

          <div className='flex gap-2'>
            {isEditing && <Button type="button" variant="outline" className="w-full" onClick={onCancelEdit}>Cancel</Button>}
            <Button type="submit" className="w-full" disabled={!!validationError}>
              {isEditing ? 'Update Entry' : 'Add Entry'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}