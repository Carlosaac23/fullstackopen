import type { CoursePart } from "../App";
import Part from "./part";

interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
}
