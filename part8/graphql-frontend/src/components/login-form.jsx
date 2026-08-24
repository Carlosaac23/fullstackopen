import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LOGIN } from "../queries";

export default function LoginForm({ setError, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("phonebook-user-token", token);
    },
    onError: (error) => setError(error.message),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ variables: { username, password } });
    } catch (error) {
      setError(error.message);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-1p-ignore
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-1p-ignore
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
}
