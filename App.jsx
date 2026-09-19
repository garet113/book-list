import { useState, useEffect } from 'react';
import './App.css';

function BookList({ query }) {   // ✅ receive query as a prop
  const [books, setBooks] = useState(null);      // null = not loaded yet
  const [loading, setLoading] = useState(true);  // start in loading state
  const [error, setError] = useState(null);      // no error yet

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}`  // ✅ use query here
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const json = await response.json();
        setBooks(json.docs);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching books.');
        setBooks(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [query]); // ✅ watch query (the same name we destructured)

  // 🔹 4 explicit branches

  if (loading) {
    return (
      <div>
        <h1>harrypotter Books</h1>
        <p>Loading books…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>harrypotter Books</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  if (books && books.length === 0) {
    return (
      <div>
        <h1> {query} Books</h1>
        <p>No books found.</p>
      </div>
    );
  }

  // success branch (books loaded and not empty)
  return (
    <div>
      <h1>{query} Books</h1>
      <ul>
        {books &&
          books.map((book) => (
            <li key={book.key}>{book.title}</li>
          ))}
      </ul>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('harrypotter');
  const [liveQuery, setLiveQuery] = useState('harrypotter');

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(liveQuery);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search books:
          <input
            type="text"
            value={liveQuery}
            onChange={(event) => setLiveQuery(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <BookList query={query} />
    </div>
  );
}

export default App;