export type SourceSystem = "epic" | "rx" | "cardiology" | "lab" | "er";

export interface SourceRecord {
  id: string;
  system: SourceSystem;
  label: string;
  date: string;
  note: string;
  rotation: string;
}

export const sourceRecords: SourceRecord[] = [
  {
    id: "epic",
    system: "epic",
    label: "EPIC · PCP OFFICE",
    date: "Jun 14, 2026",
    note: "Visit note: pt reports fatigue, occasional dizziness. Started lisinopril 10mg for BP mgmt. F/u in 3 months.",
    rotation: "-rotate-[0.6deg]",
  },
  {
    id: "rx",
    system: "rx",
    label: "RX · WALGREENS",
    date: "Jun 20, 2026",
    note: "Fill history: sumatriptan 50mg, qty 9, prescribed by Dr. Osei (Neurology) — migraine, as-needed.",
    rotation: "rotate-[0.5deg]",
  },
  {
    id: "cardiology",
    system: "cardiology",
    label: "CERNER · CARDIOLOGY",
    date: "May 02, 2026",
    note: "Consult note: borderline QT prolongation on EKG, monitor with any new prescriptions. No action taken.",
    rotation: "-rotate-[0.3deg]",
  },
  {
    id: "lab",
    system: "lab",
    label: "QUEST DIAGNOSTICS",
    date: "Jun 18, 2026",
    note: "Lab panel: potassium 5.3 mmol/L (high). Ordering provider: PCP office. No follow-up scheduled.",
    rotation: "rotate-[0.7deg]",
  },
  {
    id: "er",
    system: "er",
    label: "ER · CITY GENERAL",
    date: "Apr 29, 2026",
    note: "D/c summary: presented with palpitations, ruled out MI. Advised outpatient cardiology f/u — no record of scheduling found elsewhere.",
    rotation: "-rotate-[0.4deg]",
  },
];

export interface Medication {
  name: string;
  sourceTag: string;
}

export const medications: Medication[] = [
  { name: "Lisinopril 10mg, daily", sourceTag: "EPIC · PCP" },
  { name: "Sumatriptan 50mg, as-needed", sourceTag: "RX · WALGREENS" },
];

export interface Flag {
  critical: boolean;
  label: string;
  detail: string;
}

export const flags: Flag[] = [
  {
    critical: true,
    label: "Interaction risk:",
    detail:
      "sumatriptan + borderline QT prolongation (Cardiology, May 2) — no cross-check occurred at time of prescribing.",
  },
  {
    critical: false,
    label: "Lab follow-up gap:",
    detail:
      "elevated potassium (Jun 18) — no follow-up on file, and lisinopril can raise potassium further.",
  },
];

export const gaps: string[] = [
  "ER-recommended cardiology follow-up (Apr 29) — no record it was ever scheduled",
  "Last EKG on file: 6 weeks ago",
];

export const briefMeta = {
  patientName: "Patient #4471 — Pre-Visit Brief",
  generatedNote: "Generated from 5 sources · Today, 8:42 AM · Not a diagnosis",
};

export const signoffLine =
  "I've reviewed this brief against the chart. It informs, but doesn't replace, my clinical judgment.";

export const thesisLine =
  "Every fact in that brief already existed in one of the five systems on the left. Continuum's only job is closing the access gap — the checkbox is deliberate. The system stops short of a decision on purpose.";

export const emptyStateNote =
  "No synthesized brief yet — today's decision depends on whichever card happens to be open.";

export const missingSystemsNote =
  "None of these five systems can see the other four. The PCP prescribing today sees only the top card.";
