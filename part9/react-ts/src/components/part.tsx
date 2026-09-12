import type { CoursePart } from "../App";

function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

export default function Part({ part }: { part: CoursePart }) {
  function renderParts() {
    switch (part.kind) {
      case "basic":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>{part.description}</p>
          </>
        );
      case "group":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>project exercises {part.groupProjectCount}</p>
          </>
        );
      case "background":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>{part.description}</p>
            <p>submit to {part.backgroundMaterial}</p>
          </>
        );
      case "special":
        return (
          <>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>{part.description}</p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </>
        );
      default:
        return assertNever(part);
    }
  }

  return <>{renderParts()}</>;
}
