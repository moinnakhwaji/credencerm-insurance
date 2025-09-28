"use client";

import { useState } from "react";
import { InsuranceEntry, User } from "@/lib/types";
import { UserSelector } from "@/components/UserSelector";
import { InsuranceManager } from "@/components/InsuranceManager";

export default function Home() {
  // Global state for all users and all entries
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<InsuranceEntry[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  // Find the currently active user and their entries
  const activeUser = users.find(user => user.id === activeUserId) || null;
  const activeUserEntries = entries.filter(entry => entry.userId === activeUserId);

  // --- User Management ---
  const addUser = (name: string) => {
    if (name && !users.find(u => u.name.toLowerCase() === name.toLowerCase())) {
      const newUser: User = { id: crypto.randomUUID(), name, copay: 0 };
      setUsers([...users, newUser]);
      setActiveUserId(newUser.id);
    }
  };

  // --- Entry Management ---
  const addEntry = (newEntryData: Omit<InsuranceEntry, 'id' | 'userId' | 'amount'>) => {
    if (!activeUserId) return;

    const finalAmount = Math.min(
      newEntryData.deductible + newEntryData.coInsAmount,
      newEntryData.allowed
    );

    const newEntry: InsuranceEntry = {
      ...newEntryData,
      id: crypto.randomUUID(),
      userId: activeUserId,
      amount: finalAmount,
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (updatedEntry: InsuranceEntry) => {
    setEntries(entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
  };
  
  const deleteEntry = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
  };
  
  // --- Co-pay Management ---
  const updateUserCopay = (userId: string, copay: number) => {
    setUsers(users.map(user => user.id === userId ? { ...user, copay } : user));
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Multi-User Insurance Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Manage insurance calculations for multiple patients.
        </p>
      </header>
      
      <div className="mb-8 max-w-md">
        <UserSelector 
          users={users} 
          activeUserId={activeUserId} 
          onAddUser={addUser} 
          onSelectUser={setActiveUserId} 
        />
      </div>

      {activeUser ? (
        <InsuranceManager
          key={activeUser.id} // Re-mount component when user changes
          user={activeUser}
          entries={activeUserEntries}
          onAddEntry={addEntry}
          onUpdateEntry={updateEntry}
          onDeleteEntry={deleteEntry}
          onUpdateCopay={updateUserCopay}
        />
      ) : (
        <div className="text-center text-muted-foreground border rounded-lg p-12">
            <h2 className="text-xl font-semibold">Welcome!</h2>
            <p>Please add or select a user to begin.</p>
        </div>
      )}
    </main>
  );
}