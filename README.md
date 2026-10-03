# Cucucina Pizzeria

Premium landing page for Cucucina Pizzeria, Poznań.

## Stack
Next.js + React + TypeScript + CSS. Ready for Vercel.

## Owner panel demo
The footer button **Panel właściciela** opens the gallery manager. Demo password: `cucucina-demo`.

This first version intentionally stores uploaded gallery images in browser localStorage. It is a functional local/demo mode, not a production multi-device CMS. The gallery UI is isolated so a persistent adapter (for example Supabase Storage + database) can replace the storage layer without rebuilding the public gallery experience.

## Data
The supplied Google Maps photos and business information are used as the initial content. Opening hours were not supplied as a full weekly schedule, so the page avoids inventing exact hours.

## Run
`npm install` then `npm run dev`.

## Deploy
Import this repository into Vercel. Next.js will be detected automatically.
