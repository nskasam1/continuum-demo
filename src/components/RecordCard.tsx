import { motion, type Variants } from "framer-motion";
import type { SourceRecord } from "../data/patientData";

const SYSTEM_TAG_CLASSES: Record<SourceRecord["system"], string> = {
  epic: "bg-epic",
  rx: "bg-rx",
  cardiology: "bg-cardiology",
  lab: "bg-lab",
  er: "bg-er",
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: index * 0.06 },
  }),
  exit: (index: number) => ({
    opacity: 0,
    scale: 0.85,
    y: 6,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: index * 0.09 },
  }),
};

export function RecordCard({
  record,
  index,
}: {
  record: SourceRecord;
  index: number;
}) {
  return (
    <motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={`${record.rotation} rounded-[10px] border border-line bg-panel p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={`${SYSTEM_TAG_CLASSES[record.system]} rounded px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-wider text-white`}
        >
          {record.label}
        </span>
        <span className="font-mono text-[11px] text-muted">{record.date}</span>
      </div>
      <p className="font-mono text-[12.5px] leading-relaxed text-gray-700">
        {record.note}
      </p>
    </motion.div>
  );
}
