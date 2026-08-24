import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

export default function Books({ show }) {
  const [filter, setFilter] = useState("all");
  const { data, loading: isLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: filter === "all" ? null : filter },
  });

  if (!show) {
    return null;
  }

  const books = data?.allBooks;
  const genres = books ? [...new Set(books.map((book) => book.genres).flat()), "all"] : [];

  return (
    <div>
      <h2>Books</h2>

      {isLoading ? (
        <div>Loading books...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <h2>Genres</h2>

        {genres?.map((genre) => (
          <button key={genre} onClick={({ target }) => setFilter(target.textContent)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
