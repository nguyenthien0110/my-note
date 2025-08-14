"use client";
import React, { useRef } from "react";
import { Note } from "@/types/note";

type Props = {
  note: Note;
  onChange: (n: Note) => void;
};

export default function NoteEditor({ note, onChange }: Props) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  function toggleBold() {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;
    if (start === end) return;
    const selected = val.slice(start, end);
    const before = val.slice(0, start);
    const after = val.slice(end);
    const wrapped = `**${selected}**`;
    const newContent = before + wrapped + after;
    onChange({
      ...note,
      content: newContent,
      updatedAt: new Date().toISOString(),
    });
    // restore selection approximate
    setTimeout(() => {
      ta.selectionStart = start;
      ta.selectionEnd = start + wrapped.length;
    }, 0);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 items-center p-2 border-b">
        <button onClick={toggleBold} className="px-2 py-1 rounded border">
          B
        </button>
        <button
          onClick={() => window.print()}
          className="px-2 py-1 rounded border"
        >
          In
        </button>
      </div>
      <input
        value={note.title}
        onChange={(e) =>
          onChange({
            ...note,
            title: e.target.value,
            updatedAt: new Date().toISOString(),
          })
        }
        className="p-2 border-b"
      />
      <textarea
        ref={taRef}
        value={note.content}
        onChange={(e) =>
          onChange({
            ...note,
            content: e.target.value,
            updatedAt: new Date().toISOString(),
          })
        }
        className="flex-1 p-3 resize-none"
      />
    </div>
  );
}
