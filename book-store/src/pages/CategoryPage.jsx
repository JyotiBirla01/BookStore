// src/pages/CategoryPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { books, bookLoading, bookError, getBooksByCategory, resetAll } =
    useBooks();

  useEffect(() => {
    resetAll();
    if (categoryId) {
      getBooksByCategory(categoryId, 1);
    }
  }, [categoryId]);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📚 Category: {decodeURIComponent(categoryId)}
      </h2>

      {bookLoading ? (
        <p>Loading books...</p>
      ) : bookError ? (
        <p className="text-red-500">{bookError}</p>
      ) : books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              images={book.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
