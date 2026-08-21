import { useQuery } from "@apollo/client/react";
import { useState } from "react";

import { FIND_PERSON } from "../queries";

function Person({ person, onClose }) {
  return (
    <div>
      <h2>{person.name}</h2>

      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default function Persons({ persons }) {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)} />;
  }

  return (
    <div>
      <h2>Persons</h2>

      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.phone}
          <button onClick={() => setNameToSearch(person.name)}>Show address</button>
        </div>
      ))}
    </div>
  );
}
