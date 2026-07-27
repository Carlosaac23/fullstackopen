export default function Person({ person }) {
  return (
    <p key={person.id}>
      {person.name} --- {person.phone}
    </p>
  );
}
