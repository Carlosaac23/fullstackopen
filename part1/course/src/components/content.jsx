import Part from "./part";

export default function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
}
