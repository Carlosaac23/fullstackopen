import { useState } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import People from "./components/people";

export default function App() {
  const [people, setPeople] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameObject = {
      name: newName,
      phone: newPhone,
      id: people.length + 1,
    };

    const personAlreadyExists = people.find((person) => person.name === nameObject.name);

    if (personAlreadyExists) {
      alert(`${nameObject.name} is already added to phonebook`);

      setNewName("");
      setNewPhone("");
      return;
    }

    setPeople([...people, nameObject]);
    setNewName("");
    setNewPhone("");
  };

  const handleNameOnChange = ({ target }) => setNewName(target.value);
  const handlePhoneOnChange = ({ target }) => setNewPhone(target.value);
  const handleFilterOnChange = ({ target }) => setFilter(target.value);
  const peopleToShow = people.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={handleFilterOnChange} />

      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
        handleNameOnChange={handleNameOnChange}
        handlePhoneOnChange={handlePhoneOnChange}
      />

      <People people={peopleToShow} />
    </div>
  );
}
