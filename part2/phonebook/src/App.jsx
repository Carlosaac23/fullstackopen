import { useEffect, useState } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import People from "./components/people";
import axios from "axios";

export default function App() {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/people").then((res) => setPeople(res.data));
  }, []);

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
