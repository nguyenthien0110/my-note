import { Note } from "@/types/note";

const KEY = "local_notes_v1";

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Note[];
  } catch (e) {
    console.error("loadNotes", e);
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes));
  } catch (e) {
    console.error("saveNotes", e);
  }
}

export function createNote(): Note {
  const now = new Date().toISOString();
  return {
    id: String(Date.now()),
    title: "Untitled",
    content: "",
    createdAt: now,
    updatedAt: now,
  };
}
