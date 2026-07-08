import { useRef, useState } from "react";
import { SourcePanel } from "./components/SourcePanel";
import { BriefPanel } from "./components/BriefPanel";
import { SynthesisButton } from "./components/SynthesisButton";
import { SignoffBar } from "./components/SignoffBar";
import { ThesisStatement } from "./components/ThesisStatement";
import { ResetControl } from "./components/ResetControl";
import { CARD_COUNT, SYNTHESIS_DURATION_MS, cardExitFinishMs } from "./animation";

export type Stage = "idle" | "synthesizing" | "synthesized" | "confirmed";

function App() {
  const [stage, setStage] = useState<Stage>("idle");
  const [acknowledged, setAcknowledged] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function handleSynthesize() {
    if (stage !== "idle") return;
    setStage("synthesizing");
    setRevealedCount(0);
    for (let i = 0; i < CARD_COUNT; i++) {
      timers.current.push(
        setTimeout(() => setRevealedCount(i + 1), cardExitFinishMs(i)),
      );
    }
    timers.current.push(
      setTimeout(() => setStage("synthesized"), SYNTHESIS_DURATION_MS),
    );
  }

  function handleConfirm() {
    if (!acknowledged) return;
    setStage("confirmed");
  }

  function handleReset() {
    clearTimers();
    setStage("idle");
    setAcknowledged(false);
    setRevealedCount(0);
  }

  return (
    <div className="mx-auto max-w-[1180px] px-6 pt-9 pb-20">
      <header className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2.5">
          <span className="rounded border border-[#bee7e5] bg-teal-tint px-2 py-0.75 font-mono text-[13px] font-semibold tracking-[0.14em] text-teal-dark">
            CONTINUUM
          </span>
          <h1 className="m-0 text-[28px] font-extrabold tracking-tight text-ink">
            Pre-Visit Synthesis Brief
          </h1>
        </div>
        <span className="font-mono text-xs text-muted">
          simulation — patient #4471, fictional data
        </span>
      </header>
      <p className="mb-8.5 max-w-[760px] text-[15px] leading-relaxed text-muted">
        The record on the left already contains everything a clinician needs.
        It's just split across five systems that don't talk to each other.{" "}
        <b className="text-text">
          Continuum doesn't add information — it removes the access tax on
          information that already exists,
        </b>{" "}
        and hands judgment back to the clinician.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_46px_1fr] md:gap-0">
        <SourcePanel stage={stage} />
        <SynthesisButton stage={stage} onSynthesize={handleSynthesize} />
        <div>
          <BriefPanel stage={stage} revealedCount={revealedCount} />
          {(stage === "synthesized" || stage === "confirmed") && (
            <SignoffBar
              stage={stage}
              acknowledged={acknowledged}
              onToggleAcknowledged={() => setAcknowledged((v) => !v)}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </div>

      <ThesisStatement />
      <ResetControl onReset={handleReset} />
    </div>
  );
}

export default App;
