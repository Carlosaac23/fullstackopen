import Person from "./person";

export default function People({ people, handleDelete }) {
  return (
    <>
      <h2>Numbers</h2>
      {people.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </>
  );
}
