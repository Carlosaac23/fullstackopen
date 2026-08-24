import { useState } from "react";
import Authors from "./components/authors";
import Books from "./components/books";
import NewBook from "./components/new-book";
import LoginForm from "./components/login-form";
import { useApolloClient, useQuery } from "@apollo/client/react";
import Recommend from "./components/recommend";
import { ME } from "./queries";

export default function App() {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-user-token"));
  const { data: userData } = useQuery(ME, { skip: !token });
  const client = useApolloClient();

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    client.clearStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setPage={setPage} />
      <Recommend show={page === "recommend"} user={userData} />
      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
}
