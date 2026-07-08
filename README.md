# Continuum — Pre-Visit Synthesis Brief

An interactive prototype for a hedge fund internship case study. Five fragments
of a patient's medical history, scattered across five systems that don't talk
to each other, collapse into one synthesized brief — but a clinician still has
to check a box confirming they reviewed it before proceeding. The checkbox is
the thesis: AI should amplify judgment, not replace it.

No backend. Synthesis is simulated client-side with a deliberate short delay.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

```bash
vercel --prod
```

Zero config needed — Vercel auto-detects the Vite framework preset.

## Structure

- `src/data/patientData.ts` — all copy (source records, brief content, sign-off
  and thesis lines). Edit here without touching component logic.
- `src/components/` — small composable pieces: `RecordCard`, `SourcePanel`,
  `SynthesisButton`, `BriefPanel`, `FlagItem`, `SignoffBar`, etc.
- `src/App.tsx` — the interaction state machine
  (`idle → synthesizing → synthesized → confirmed`, with reset).
