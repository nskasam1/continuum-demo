import { AnimatePresence, motion, type Variants } from "framer-motion";
import { medications, flags, gaps, emptyStateNote } from "../data/patientData";
import { BriefHeader } from "./BriefHeader";
import { MedicationRow } from "./MedicationRow";
import { FlagItem } from "./FlagItem";
import { GapItem } from "./GapItem";
import type { Stage } from "../App";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

export function BriefPanel({ stage }: { stage: Stage }) {
  const briefVisible = stage === "synthesized" || stage === "confirmed";

  return (
    <div>
      <p className="mb-3.5 ml-0.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        <span className="h-[7px] w-[7px] rounded-full bg-teal-dark" />
        Continuum brief
      </p>
      <AnimatePresence mode="wait">
        {!briefVisible ? (
          <motion.div
            key="empty"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-[340px] items-center justify-center rounded-xl border-[1.5px] border-dashed border-line px-6 py-10 text-center text-[13.5px] leading-relaxed text-muted"
          >
            {emptyStateNote}
          </motion.div>
        ) : (
          <motion.div
            key="brief"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-xl border border-line bg-panel shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
          >
            <motion.div variants={sectionVariants}>
              <BriefHeader />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="border-b border-line px-5 py-4"
            >
              <h4 className="mb-2 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                Active medications (cross-source)
              </h4>
              {medications.map((med) => (
                <MedicationRow key={med.name} medication={med} />
              ))}
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="flex flex-col gap-2 border-b border-line px-5 py-4"
            >
              <h4 className="mb-1 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                Flagged for review
              </h4>
              {flags.map((flag) => (
                <FlagItem key={flag.label} flag={flag} />
              ))}
            </motion.div>

            <motion.div variants={sectionVariants} className="px-5 py-4">
              <h4 className="mb-1 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                Open gaps in care
              </h4>
              {gaps.map((gap) => (
                <GapItem key={gap} text={gap} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
