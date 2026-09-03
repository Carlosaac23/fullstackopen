import { useMutation } from "@apollo/client/react";
import { useState } from "react";

import { CREATE_PERSON } from "../queries";
import { addPersonToCache } from "../utils/apollo-cache";

export default function PersonForm({ setError }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => setError(error.message),
    update: (cache, res) => {
      const addedPerson = res.data.addPerson;
      addPersonToCache(cache, addedPerson);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPerson({
        variables: { name, phone: phone.length > 0 ? phone : undefined, street, city },
      });
    } catch (error) {
      setError(error.message);
    }

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
