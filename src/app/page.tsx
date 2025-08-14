"use client";
import React, { useEffect, useState } from "react";
import { loadNotes, saveNotes, createNote } from "../lib/storage";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";
import Tabs from "../components/Tabs";
import useDebounce from "../hooks/useDebounce";
import { Note } from "@/types/note";

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const deb = useDebounce(query, 200);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ns = loadNotes();
    setNotes(ns);
    if (ns.length) {
      setOpenIds([ns[0].id]);
      setActiveId(ns[0].id);
    }
  }, []);

  useEffect(() => saveNotes(notes), [notes]);

  function handleCreate() {
    const n = createNote();
    setNotes((prev) => [n, ...prev]);
    setOpenIds((ids) => [n.id, ...ids]);
    setActiveId(n.id);
  }

  function handleOpen(id: string) {
    setOpenIds((ids) => (ids.includes(id) ? ids : [id, ...ids]));
    setActiveId(id);
  }

  function handleClose(id: string) {
    setOpenIds((ids) => ids.filter((i) => i !== id));
    if (activeId === id) setActiveId(openIds.find((i) => i !== id) || null);
  }

  function handleChange(note: Note) {
    setNotes((prev) => prev.map((p) => (p.id === note.id ? note : p)));
  }

  function handleDelete(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    handleClose(id);
  }

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(deb.toLowerCase()) ||
      n.content.toLowerCase().includes(deb.toLowerCase())
  );

  const activeNote = notes.find((n) => n.id === activeId) || null;

  return (
    <div className="h-screen grid grid-cols-4">
      <aside className="col-span-1 border-r flex flex-col">
        <div className="p-2 flex gap-2">
          <button onClick={handleCreate} className="px-3 py-1 border rounded">
            New
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 p-1 border rounded"
          />
        </div>
        <NotesList
          notes={filtered}
          onOpen={handleOpen}
          onDelete={handleDelete}
        />
      </aside>

      <main className="col-span-3 flex flex-col">
        <Tabs
          openNotes={notes.filter((n) => openIds.includes(n.id))}
          activeId={activeId || undefined}
          onSwitch={(id) => setActiveId(id)}
          onClose={handleClose}
        />
        <div className="flex-1 p-2">
          {activeNote ? (
            <NoteEditor note={activeNote} onChange={handleChange} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Open or create a note
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
