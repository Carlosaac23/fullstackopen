import Person from "./person";

export default function People({ people }) {
  return (
    <>
      <h2>Numbers</h2>
      {people.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
}
