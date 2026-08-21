import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Persons from "./components/persons";
import PersonForm from "./components/person-form";
import Notification from "./components/notification";
import { useState } from "react";
import PhoneForm from "./components/phone-form";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

export default function App() {
  const { data, loading: isLoading } = useQuery(ALL_PERSONS);
  const persons = data?.allPersons;
  const [errorMessage, setErrorMessage] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <Persons persons={persons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}
