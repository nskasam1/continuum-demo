import type { Flag } from "../data/patientData";

export function FlagItem({ flag }: { flag: Flag }) {
  const isCritical = flag.critical;
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] leading-relaxed ${
        isCritical
          ? "border-red-border bg-red-tint text-[#991b1b]"
          : "border-amber-border bg-amber-tint text-[#92400e]"
      }`}
    >
      <span>⚠</span>
      <span>
        <b className={isCritical ? "text-red" : "text-amber"}>{flag.label}</b>{" "}
        {flag.detail}
      </span>
    </div>
  );
}
