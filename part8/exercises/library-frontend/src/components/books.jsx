import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

export default function Books({ show }) {
  const { data, loading: isLoading } = useQuery(ALL_BOOKS);
  const books = data?.allBooks;

  if (!show) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

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
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
