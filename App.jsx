import { useState, useEffect } from 'react';
import './App.css';

function BookList() {
  const [books, setBooks] = useState([]); // safe empty array

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('https://openlibrary.org/search.json?q=react');
      const json = await response.json();
      setBooks(json.docs);
    }

    fetchBooks();
  }, []); // run once on mount

  return (
    <div>
      <h1>React Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return <BookList />;
}

export default App;