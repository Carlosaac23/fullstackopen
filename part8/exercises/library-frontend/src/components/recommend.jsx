import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

export default function Recommend({ show, user }) {
  const { data } = useQuery(ALL_BOOKS, {
    variables: { genre: user?.me.favoriteGenre },
    skip: !user?.me?.favoriteGenre,
  });

  const recommendedBooks = data?.allBooks;

  if (!show) {
    return null;
  }

  return (
    <div>
      <h1>Recommendations for you</h1>
      <p>
        Books based in your favorite genre <strong>{user?.me?.favoriteGenre}</strong>
      </p>

      {recommendedBooks.length === 0 ? (
        <p>No recommended books for you</p>
      ) : (
        <table>
          {recommendedBooks?.map((book) => (
            <>
              <thead>
                <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                </tr>
              </thead>

              <tbody key={book.id}>
                <tr>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      )}
    </div>
  );
}
