import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LOGIN } from "../queries";

export default function LoginForm({ setToken, show, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);

      setPage("authors");
    },
    onError: (error) => setError(error.message),
  });

  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ variables: { username, password } });
    } catch (error) {
      console.error(error.message);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
}
