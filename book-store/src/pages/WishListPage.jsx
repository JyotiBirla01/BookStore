import { useWishList } from '../hooks/useWishList';
import BookCard from '../components/BookCard';

const WishlistPage = () => {
  const { wishList } = useWishList();

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">
        ❤️ Your Wishlist
      </h2>
      {wishList.length === 0 ? (
        <p className="text-gray-600">
          You haven&apos;t added any books to your wishlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishList.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
