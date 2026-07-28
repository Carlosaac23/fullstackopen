export default function Person({ person, handleDelete }) {
  return (
    <p key={person.id}>
      {person.name} --- {person.phone}{" "}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  );
}
