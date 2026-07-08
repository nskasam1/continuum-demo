# Continuum — React Rebuild Design

## Purpose
Rebuild the existing single-file HTML/CSS/JS Continuum prototype as a polished Vite + React + TypeScript app for a hedge fund internship case study. The visual argument: five fragmented medical records collapse into one synthesized brief, but the clinician must still check a box confirming review before proceeding — AI amplifies judgment, it doesn't replace it.

## Tech stack
Vite, React 18, TypeScript, Tailwind CSS, Framer Motion. No backend — synthesis is simulated client-side with a deliberate sub-second delay. Deploys to Vercel with zero config (`vercel --prod` from repo root).

## Content (verbatim, unchanged from original prototype)
Five source records (EPIC/PCP, RX/Walgreens, Cerner/Cardiology, Quest Diagnostics, ER/City General), the synthesized brief (meds, flags, gaps), the sign-off line, and the closing thesis line — all as specified in the original brief and already implemented in `index.html`. Content lives in `src/data/patientData.ts` as typed constants, isolated from components so copy can change without touching logic.

## File structure
```
src/
  main.tsx, App.tsx, index.css
  data/patientData.ts
  components/
    SourcePanel.tsx, RecordCard.tsx
    SynthesisButton.tsx
    BriefPanel.tsx, BriefHeader.tsx, MedicationRow.tsx, FlagItem.tsx, GapItem.tsx
    SignoffBar.tsx, ThesisStatement.tsx, ResetControl.tsx
```

## Design system
- Palette: ink `#0B1F3A` (structure/headers), bg `#F2F4F7` (page), panel `#FFFFFF`, teal `#0EA5A0` (synthesize action + success only), amber `#D97706` (non-critical flag), red `#DC2626` (critical flag only).
- Typography: Inter (humanist sans) for the brief/UI chrome; IBM Plex Mono for source-card system names, timestamps, and raw note text — the typeface contrast itself signals "raw system data" vs. "synthesized judgment."
- Each of the five source cards keeps a distinct system-tag color and a subtle independent rotation, so the fragmentation reads visually before any animation runs.

## State machine (App.tsx)
`idle → synthesizing → synthesized → confirmed`, with a `reset` action returning to `idle`. `synthesizing` disables the Synthesize button and drives the exit/processing animation; `synthesized` mounts the brief and sign-off bar; checking the acknowledgment checkbox enables "Confirm & proceed"; confirming locks the UI into a done state (checkbox and button both disabled).

## Animation choreography (signature moment)
On Synthesize: the five cards exit staggered (~80–100ms apart, fade+scale+translate, framer-motion `AnimatePresence`/`staggerChildren`) while the button shows short deliberate processing microcopy (not a generic spinner) for under a second. Once cards clear, the brief mounts with its three sections (meds → flags → gaps) staggering in, followed by the sign-off bar. `useReducedMotion()` collapses all of this to near-instant crossfades when the user prefers reduced motion.

## Responsive behavior
Two-column layout collapses to a single stacked column on narrow viewports; the rotated vertical "Synthesize" divider button becomes a normal horizontal button between the stacked columns.

## Out of scope
No backend, no persistence, no routing, no real API calls, no auth.
