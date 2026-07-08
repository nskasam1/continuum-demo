import { motion, type Variants } from "framer-motion";
import type { SourceRecord } from "../data/patientData";
import {
  CARD_ENTER_DURATION_S,
  CARD_ENTER_STAGGER_S,
  CARD_EXIT_DURATION_S,
  CARD_EXIT_STAGGER_S,
} from "../animation";

const SYSTEM_TAG_CLASSES: Record<SourceRecord["system"], string> = {
  epic: "bg-epic",
  rx: "bg-rx",
  cardiology: "bg-cardiology",
  lab: "bg-lab",
  er: "bg-er",
};

const ECG_SQUIGGLE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='24' viewBox='0 0 120 24'%3E%3Cpath d='M0 12 H30 L36 2 L42 22 L48 12 H60 L66 2 L72 22 L78 12 H120' fill='none' stroke='%23db2777' stroke-width='1.5'/%3E%3C/svg%3E";

function CardTexture({ system }: { system: SourceRecord["system"] }) {
  if (system === "cardiology") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 opacity-[0.14]"
        style={{
          backgroundImage: `url("${ECG_SQUIGGLE}")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "120px 24px",
        }}
      />
    );
  }
  if (system === "lab") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(180,83,9,0.09) 0 1px, transparent 1px 9px), repeating-linear-gradient(90deg, rgba(180,83,9,0.09) 0 1px, transparent 1px 9px)",
        }}
      />
    );
  }
  if (system === "er") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="rotate-[-14deg] font-mono text-[26px] font-bold tracking-[0.2em] text-red opacity-[0.09]">
          URGENT
        </span>
      </div>
    );
  }
  return null;
}

const cardVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: CARD_ENTER_DURATION_S,
      ease: [0.4, 0, 0.2, 1],
      delay: index * CARD_ENTER_STAGGER_S,
    },
  }),
  exit: (index: number) => ({
    opacity: 0,
    scale: 0.85,
    y: 6,
    filter: "blur(4px)",
    transition: {
      duration: CARD_EXIT_DURATION_S,
      ease: [0.4, 0, 0.2, 1],
      delay: index * CARD_EXIT_STAGGER_S,
    },
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
      className={`${record.rotation} relative overflow-hidden rounded-[10px] border border-line bg-panel p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
        record.system === "rx" ? "border-b-0" : ""
      } ${record.system === "epic" ? "border-b-2 border-b-epic/25" : ""}`}
    >
      <CardTexture system={record.system} />
      <div className="relative mb-2 flex items-center justify-between gap-2">
        <span
          className={`${SYSTEM_TAG_CLASSES[record.system]} rounded px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-wider text-white`}
        >
          {record.label}
        </span>
        <span className="font-mono text-[11px] text-muted">{record.date}</span>
      </div>
      <p className="relative font-mono text-[12.5px] leading-relaxed text-gray-700">
        {record.note}
      </p>
      {record.system === "rx" && (
        <div
          aria-hidden
          className="relative mt-3 border-t border-dashed border-rx/40 pt-2 font-mono text-[10px] tracking-[0.2em] text-rx/50"
        >
          * * * * * * * * * * * * * * * * * * * *
        </div>
      )}
    </motion.div>
  );
}
