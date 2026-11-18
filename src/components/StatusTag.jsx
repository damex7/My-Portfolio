// Black & white status: solid = shipped, outline + pulsing dot = building, dashed = planned.
const styles = {
  shipped: "border border-ink bg-ink text-paper",
  building: "border border-ink text-ink",
  planned: "border border-dashed border-muted text-muted",
};
const labels = { shipped: "Shipped", building: "Building", planned: "Planned" };

export default function StatusTag({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[status] ?? styles.planned}`}>
      {status === "building" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" aria-hidden="true" />}
      {labels[status] ?? status}
    </span>
  );
}
