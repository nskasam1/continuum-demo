import { motion } from "framer-motion";
import { signoffLine } from "../data/patientData";
import type { Stage } from "../App";

export function SignoffBar({
  stage,
  acknowledged,
  onToggleAcknowledged,
  onConfirm,
}: {
  stage: Stage;
  acknowledged: boolean;
  onToggleAcknowledged: () => void;
  onConfirm: () => void;
}) {
  const confirmed = stage === "confirmed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className="mt-4 rounded-xl border border-line bg-panel px-4.5 py-4"
    >
      <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-text">
        <input
          type="checkbox"
          checked={acknowledged}
          disabled={confirmed}
          onChange={onToggleAcknowledged}
          className="mt-0.5 h-4 w-4 shrink-0 accent-teal-dark focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        {signoffLine}
      </label>
      <button
        type="button"
        disabled={!acknowledged || confirmed}
        onClick={onConfirm}
        className={`mt-3.5 w-full rounded-lg border-none py-2.75 text-[13.5px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none ${
          confirmed
            ? "bg-ink text-white"
            : acknowledged
              ? "cursor-pointer bg-teal-dark text-white hover:bg-ink"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
        }`}
      >
        {confirmed
          ? "Confirmed — visit context loaded ✓"
          : "Confirm & proceed to visit"}
      </button>
    </motion.div>
  );
}
