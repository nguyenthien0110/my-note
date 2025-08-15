"use client";
import React from "react";
import { Note } from "@/types/note";

type Props = {
  notes: Note[];
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function NotesList({ notes, onOpen, onDelete }: Props) {
  return (
    <div className="p-2 space-y-1 overflow-y-auto">
      {notes.map((n) => (
        <div
          key={n.id}
          onClick={() => onOpen(n.id)}
          className="p-2 border rounded flex justify-between items-center"
        >
          <div>
            <div className="font-medium">{n.title}</div>
            <div className="text-xs text-gray-500">
              {new Date(n.updatedAt).toLocaleString()}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpen(n.id)}
              className="px-2 py-1 border rounded hover:cursor-pointer"
            >
              Open
            </button>
            <button
              onClick={() => onDelete(n.id)}
              className="px-2 py-1 border rounded hover:cursor-pointer"
            >
              Del
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
