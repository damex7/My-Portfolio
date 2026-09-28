// "**Selected** Works" style: first part bold, the rest regular.
export default function SectionTitle({ bold, rest, as: Tag = "h2", id, className = "" }) {
  return (
    <Tag id={id} className={`font-display text-3xl tracking-tight sm:text-4xl ${className}`}>
      <span className="font-extrabold">{bold}</span> <span className="font-normal">{rest}</span>
    </Tag>
  );
}
