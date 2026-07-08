import { thesisLine } from "../data/patientData";

export function ThesisStatement() {
  return (
    <p className="mt-14 max-w-[820px] border-t border-line pt-5.5 text-[13.5px] leading-loose text-muted">
      {thesisLine}
    </p>
  );
}
