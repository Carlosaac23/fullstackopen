import { useEffect, useState } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import People from "./components/people";
import Notification from "./components/notification";

import { getContacts, createContact, updateContact, deleteContact } from "./services/phonebook";

export default function App() {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    getContacts().then((people) => setPeople(people));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactObject = {
      name: newName,
      phone: newPhone,
    };

    const personAlreadyExists = people.find((person) => person.name === contactObject.name);

    if (personAlreadyExists) {
      const wantReplaceOldNumber = window.confirm(
        `${contactObject.name} is already added to phonebook, replace the old number with a new one?`,
      );

      if (!wantReplaceOldNumber) return;

      const updatedContact = { ...personAlreadyExists, phone: newPhone };

      updateContact(personAlreadyExists.id, updatedContact)
        .then((returnedContact) => {
          setPeople(
            people.map((person) => (person.id === returnedContact.id ? returnedContact : person)),
          );

          // Notification
          setNoti({ message: `Updated ${personAlreadyExists.name} phone` });
          setTimeout(() => setNoti(null), 3000);

          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          setNoti({
            message: `Information of ${personAlreadyExists.name} has already been removed from server`,
            type: "failed",
          });
          setTimeout(() => setNoti(null), 3000);

          setPeople(people.filter((person) => person.id !== personAlreadyExists.id));

          setNewName("");
          setNewPhone("");
        });

      return;
    }

    createContact(contactObject)
      .then((returnedContact) => {
        setPeople([...people, returnedContact]);

        // Notification
        setNoti({ message: `Added ${returnedContact.name}` });
        setTimeout(() => setNoti(null), 3000);

        setNewName("");
        setNewPhone("");
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;

        setNoti({ message: errorMessage, type: "failed" });
        setTimeout(() => setNoti(null), 3000);
      });
  };

  const handleDelete = (id) => {
    const contact = people.find((person) => person.id === id);
    const isConfirm = window.confirm(`Delete ${contact.name}?`);

    if (!isConfirm) return;

    deleteContact(id).then(() => setPeople(people.filter((person) => person.id !== id)));
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
      <Notification {...noti} />
      <Filter filter={filter} onChange={handleFilterOnChange} />

      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
        handleNameOnChange={handleNameOnChange}
        handlePhoneOnChange={handlePhoneOnChange}
      />

      <People people={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
}
