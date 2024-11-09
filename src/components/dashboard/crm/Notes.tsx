import React, { useState } from 'react';
import { Account } from './types';

interface NotesProps {
  account: Account;
  onUpdate: (account: Account) => void;
}

export const Notes: React.FC<NotesProps> = ({ account, onUpdate }) => {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote) {
      onUpdate({
        ...account,
        notes: [
          {
            id: Date.now().toString(),
            text: newNote,
            createdBy: 'User',
            createdAt: new Date().toLocaleString()
          },
          ...account.notes
        ]
      });
      setNewNote('');
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Notes</h3>
      
      <div className="flex gap-4 mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter note..."
          className="flex-1 bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors h-fit"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {account.notes.map((note) => (
          <div key={note.id} className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{note.createdBy}</span>
              <span>{note.createdAt}</span>
            </div>
            <p className="text-white">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};