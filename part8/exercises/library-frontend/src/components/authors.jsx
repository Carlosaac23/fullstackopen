import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

export default function Authors({ show, token }) {
  const { data, loading: isLoading } = useQuery(ALL_AUTHORS);
  const authors = data?.allAuthors;

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, res) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((author) =>
            author.id === res.data.editAuthor.id ? res.data.editAuthor : author,
          ),
        };
      });
    },
  });

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Authors</h2>

      {isLoading ? (
        <div>Loading authors...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
          </thead>
          <tbody>
            {authors?.map((author) => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {token && (
        <>
          <h2>Set birthyear</h2>

          <form onSubmit={handleSubmit}>
            <div>
              name
              <select value={name} onChange={({ target }) => setName(target.value)}>
                <option value="" disabled>
                  -- Select --
                </option>
                {authors?.map((author) => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born <input value={born} onChange={({ target }) => setBorn(target.value)} />
            </div>

            <button type="submit">Update author</button>
          </form>
        </>
      )}
    </div>
  );
}
