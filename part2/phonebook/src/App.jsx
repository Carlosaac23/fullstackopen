import { useEffect, useState } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import People from "./components/people";

import { getAll, create } from "./services/phonebook";

export default function App() {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll().then((people) => setPeople(people));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactObject = {
      name: newName,
      phone: newPhone,
    };

    const personAlreadyExists = people.find((person) => person.name === contactObject.name);

    if (personAlreadyExists) {
      alert(`${contactObject.name} is already added to phonebook`);

      setNewName("");
      setNewPhone("");
      return;
    }

    create(contactObject).then((returnedContact) => {
      // setPeople(people.concat(returnedContact));
      setPeople([...people, returnedContact]);
      setNewName("");
      setNewPhone("");
    });
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
