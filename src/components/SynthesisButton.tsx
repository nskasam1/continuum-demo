import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Stage } from "../App";

const PROCESSING_STEPS = [
  "Reading EPIC…",
  "Cross-referencing Rx…",
  "Checking cardiology…",
  "Flagging risk…",
];

export function SynthesisButton({
  stage,
  onSynthesize,
}: {
  stage: Stage;
  onSynthesize: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stage !== "synthesizing") {
      setStepIndex(0);
      return;
    }
    const stepDuration = reducedMotion ? 1 : 190;
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, PROCESSING_STEPS.length - 1));
    }, stepDuration);
    return () => clearInterval(interval);
  }, [stage, reducedMotion]);

  const label =
    stage === "synthesizing"
      ? PROCESSING_STEPS[stepIndex]
      : stage === "idle"
        ? "Synthesize →"
        : "Synthesized ✓";

  const backgroundColor =
    stage === "synthesizing"
      ? "#0b8985"
      : stage === "idle"
        ? "#0b1f3a"
        : "#0ea5a0";

  const glowAnimation =
    stage === "synthesizing" && !reducedMotion
      ? {
          backgroundColor,
          boxShadow: [
            "0 6px 16px rgba(11,31,58,0.28), 0 0 0px rgba(14,165,160,0)",
            "0 6px 16px rgba(11,31,58,0.28), 0 0 22px rgba(14,165,160,0.55)",
            "0 6px 16px rgba(11,31,58,0.28), 0 0 0px rgba(14,165,160,0)",
          ],
        }
      : {
          backgroundColor,
          boxShadow: "0 6px 16px rgba(11,31,58,0.28)",
        };

  return (
    <div className="relative flex justify-center py-6 md:h-full md:flex-col md:items-center md:py-0 md:pt-[120px]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-line md:inset-y-0 md:inset-x-auto md:left-1/2 md:top-0 md:h-full md:w-px" />
      <motion.button
        type="button"
        disabled={stage !== "idle"}
        onClick={onSynthesize}
        animate={glowAnimation}
        whileHover={stage === "idle" ? { backgroundColor: "#0b8985" } : undefined}
        whileTap={stage === "idle" ? { scale: 0.96 } : undefined}
        transition={
          stage === "synthesizing" && !reducedMotion
            ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        className="relative z-10 h-11 w-44 shrink-0 rounded-full font-mono text-xs tracking-wider text-white uppercase focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none disabled:cursor-default enabled:cursor-pointer md:rotate-[-90deg]"
      >
        {label}
      </motion.button>
    </div>
  );
}
