import { AnimatePresence } from "framer-motion";
import { sourceRecords, missingSystemsNote } from "../data/patientData";
import { RecordCard } from "./RecordCard";
import type { Stage } from "../App";

export function SourcePanel({ stage }: { stage: Stage }) {
  const cardsVisible = stage === "idle";

  return (
    <div>
      <div className="mb-3.5 flex items-baseline gap-3">
        <p className="whitespace-nowrap font-mono text-[13px] font-medium tracking-tight text-amber-700">
          5 SOURCES <span className="text-muted">· disconnected</span>
        </p>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="flex flex-col gap-3.5">
        <AnimatePresence>
          {cardsVisible &&
            sourceRecords.map((record, i) => (
              <RecordCard key={record.id} record={record} index={i} />
            ))}
        </AnimatePresence>
      </div>
      {cardsVisible && (
        <p className="mt-4 border-t border-dashed border-line pt-3 font-mono text-[11.5px] text-muted">
          ↳ {missingSystemsNote}
        </p>
      )}
    </div>
  );
}
