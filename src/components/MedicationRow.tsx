import type { Medication } from "../data/patientData";

export function MedicationRow({ medication }: { medication: Medication }) {
  return (
    <div className="flex justify-between py-1 text-[13.5px]">
      <span>{medication.name}</span>
      <span className="font-mono text-[10px] text-muted">
        {medication.sourceTag}
      </span>
    </div>
  );
}
