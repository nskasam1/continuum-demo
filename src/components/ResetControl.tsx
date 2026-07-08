export function ResetControl({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="mt-4.5 rounded-md border border-line px-3.5 py-1.75 font-mono text-xs text-muted transition-colors hover:border-muted hover:text-text"
    >
      ↺ reset simulation
    </button>
  );
}
