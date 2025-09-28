import { useState } from 'react';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface UserSelectorProps {
  users: User[];
  activeUserId: string | null;
  onAddUser: (name: string) => void;
  onSelectUser: (id: string) => void;
}

export function UserSelector({ users, activeUserId, onAddUser, onSelectUser }: UserSelectorProps) {
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    onAddUser(newUserName.trim());
    setNewUserName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select or Add User</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Existing User</label>
          <Select onValueChange={onSelectUser} value={activeUserId ?? ''} disabled={users.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            placeholder="Enter new user's name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddUser()}
          />
          <Button onClick={handleAddUser}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}