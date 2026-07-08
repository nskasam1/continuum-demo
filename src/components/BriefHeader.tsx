import { briefMeta } from "../data/patientData";

export function BriefHeader() {
  return (
    <div className="bg-ink px-5 py-4 text-white">
      <div className="text-base font-bold">{briefMeta.patientName}</div>
      <div className="mt-[3px] font-mono text-[11px] text-[#b9c4d6]">
        {briefMeta.generatedNote}
      </div>
    </div>
  );
}
