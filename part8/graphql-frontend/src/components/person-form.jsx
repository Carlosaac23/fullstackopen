import { useMutation } from "@apollo/client/react";
import { useState } from "react";

import { ALL_PERSONS, CREATE_PERSON } from "../queries";

export default function PersonForm({ setError }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => setError(error.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create new person</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name{" "}
          <input value={name} onChange={({ target }) => setName(target.value)} data-1p-ignore />
        </div>
        <div>
          phone{" "}
          <input value={phone} onChange={({ target }) => setPhone(target.value)} data-1p-ignore />
        </div>
        <div>
          street{" "}
          <input value={street} onChange={({ target }) => setStreet(target.value)} data-1p-ignore />
        </div>
        <div>
          city{" "}
          <input value={city} onChange={({ target }) => setCity(target.value)} data-1p-ignore />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
