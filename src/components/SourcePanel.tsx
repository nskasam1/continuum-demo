import { AnimatePresence } from "framer-motion";
import { sourceRecords, missingSystemsNote } from "../data/patientData";
import { RecordCard } from "./RecordCard";
import type { Stage } from "../App";

export function SourcePanel({ stage }: { stage: Stage }) {
  const cardsVisible = stage === "idle";

  return (
    <div>
      <p className="mb-3.5 ml-0.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        <span className="h-[7px] w-[7px] rounded-full bg-amber-600" />
        Five disconnected systems
      </p>
      <div className="flex flex-col gap-3.5">
        <AnimatePresence>
          {cardsVisible &&
            sourceRecords.map((record, i) => (
              <RecordCard key={record.id} record={record} index={i} />
            ))}
        </AnimatePresence>
      </div>
      {cardsVisible && (
        <p className="mt-4 border-t border-dashed border-line pt-3 font-mono text-[11.5px] text-gray-400">
          ↳ {missingSystemsNote}
        </p>
      )}
    </div>
  );
}
