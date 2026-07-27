import { useState } from "react";

export default function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: "418-154124" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameObject = {
      name: newName,
      phone: newPhone,
    };

    const personAlreadyExists = persons.find((person) => person.name === nameObject.name);

    if (personAlreadyExists) {
      alert(`${nameObject.name} is already added to phonebook`);

      setNewName("");
      setNewPhone("");
      return;
    }

    setPersons([...persons, nameObject]);
    setNewName("");
    setNewPhone("");
  };

  const handleNameOnChange = ({ target }) => setNewName(target.value);
  const handlePhoneOnChange = ({ target }) => setNewPhone(target.value);

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameOnChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneOnChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} --- {person.phone}
        </p>
      ))}
    </div>
  );
}
