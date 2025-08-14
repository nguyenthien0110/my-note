# Simple Note App

A basic note-taking app built with Next.js and Tailwind CSS. Stores a single note in localStorage, supports basic editing, bold formatting, and printing.

## Live
4. Open `https://nguyenthien0110.github.io/my-note/` in your browser.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser.

## Features

- Edit a single note.
- Bold formatting via toolbar.
- Save note to localStorage.
- Print note using browser's print functionality.

## Struct src

├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           # root layout + Tailwind classes
│  │  └─ page.tsx             # app main page
│  ├─ components/
│  │  ├─ Header.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ Tabs.tsx
│  │  ├─ NotesList.tsx
│  │  └─ NoteEditor.tsx
│  ├─ lib/
│  │  └─ storage.ts          # localStorage helpers
│  ├─ hooks/
│  │  └─ useDebounce.ts
│  ├─ styles/
│  │  └─ globals.css
│  └─ types/
│     └─ note.ts