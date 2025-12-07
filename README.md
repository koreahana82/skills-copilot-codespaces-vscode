# IB Conference Prep

A modern React + TypeScript single-page app that helps Hana (an elementary teacher from Korea) prepare for the IB Global Conference, Mumbai 2026. The app focuses on practicing English sentences, tracking preparation tasks, reviewing IB concepts, and organizing networking contacts.

## Features
- **Home dashboard** with D-day countdown, random English sentence, and upcoming checklist items.
- **English Sentences** grouped by set with tag filtering and bilingual display.
- **Checklist** organized by travel/English/IB/onsite areas with status toggles and due-date sorting.
- **IB Concepts** with EN/KR descriptions, categories, and example questions plus category filter.
- **Contacts** list, add form, and detail view backed by a simple React Context store.

## Tech Stack
- React 18 + TypeScript
- React Router for client-side routing
- Vite build setup

## Running locally
1. Install dependencies (requires Node.js):
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the printed local URL (typically `http://localhost:5173`).

## Project structure
```
src/
  components/      // Shared UI pieces like the layout shell
  context/         // Lightweight stores (e.g., ContactProvider)
  data/            // Static seed data for sentences, checklist, concepts, contacts
  pages/           // Route-level pages
  types/           // Shared TypeScript interfaces
  App.tsx          // Routes
  main.tsx         // Entry point
```
