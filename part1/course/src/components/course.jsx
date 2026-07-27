import Header from "./header";
import Content from "./content";
import Total from "./total";

export default function Course({ course }) {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}
