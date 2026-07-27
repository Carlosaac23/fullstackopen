export default function Total({ parts }) {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return <strong>total of {total} exercises</strong>;
}
