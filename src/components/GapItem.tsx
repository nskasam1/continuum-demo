export function GapItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2 py-1 text-[13px] text-gray-700">
      <span className="text-muted">—</span>
      <span>{text}</span>
    </div>
  );
}
