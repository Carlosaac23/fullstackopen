import { useApolloClient, useQuery } from "@apollo/client/react";
import Persons from "./components/persons";
import PersonForm from "./components/person-form";
import Notification from "./components/notification";
import { useState } from "react";
import PhoneForm from "./components/phone-form";
import LoginForm from "./components/login-form";
import { ALL_PERSONS } from "./queries";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("phonebook-user-token"));
  const [errorMessage, setErrorMessage] = useState("");
  const { data, loading: isLoading } = useQuery(ALL_PERSONS);
  const persons = data?.allPersons;
  const client = useApolloClient();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notification message={errorMessage} />

        <h2>Login</h2>
        <LoginForm setError={notify} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <button onClick={handleLogout}>logout</button>
      <Persons persons={persons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}
