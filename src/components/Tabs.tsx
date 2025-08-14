"use client";
import React from "react";
import { Note } from "@/types/note";

type Props = {
  openNotes: Note[];
  activeId?: string;
  onSwitch: (id: string) => void;
  onClose: (id: string) => void;
};

export default function Tabs({
  openNotes,
  activeId,
  onSwitch,
  onClose,
}: Props) {
  return (
    <div className="flex gap-2 p-2 overflow-x-auto">
      {openNotes.map((n) => (
        <div
          key={n.id}
          className={`px-3 py-1 rounded ${
            n.id === activeId ? "bg-gray-200" : "bg-white"
          }`}
        >
          <button onClick={() => onSwitch(n.id)}>
            {n.title || "Untitled"}
          </button>
          <button onClick={() => onClose(n.id)} className="ml-2">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
