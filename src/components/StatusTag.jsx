const styles = {
  shipped: "bg-marigold text-ink",
  building: "bg-cobalt text-paper",
  planned: "border border-line text-muted",
};
const labels = { shipped: "Shipped", building: "Building", planned: "Planned" };

export default function StatusTag({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[status] ?? styles.planned}`}>
      {labels[status] ?? status}
    </span>
  );
}
