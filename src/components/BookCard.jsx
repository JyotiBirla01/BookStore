import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishList } from '../hooks/useWishList';

const BookCard = ({ book }) => {
  const {
    id,
    title,
    author,
    imageUrl,
    price,
    originalPrice = 399,
    rating = 4.5,
  } = book;

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const { addToWishList, wishList } = useWishList();
  // ✅ Check if this book is already in the wishlist
  const isInWishlist = wishList?.some((book) => book.id === id);
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition h-full flex flex-col relative">
      {/* Wishlist Icon */}
      <button
        onClick={() => addToWishList(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-pink-500"
      >
        <Heart
          size={20}
          fill={isInWishlist ? '#ec4899' : 'none'} // pink if in wishlist
          stroke={isInWishlist ? '#ec4899' : '#9CA3AF'}
        />
      </button>

      {/* Book Image */}
      <div className="h-40 flex items-center justify-center overflow-hidden">
        <img
          src={
            imageUrl?.startsWith('/uploads')
              ? `${process.env.REACT_APP_BASE_URL}${imageUrl}`
              : imageUrl
          }
          alt={title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Book Info */}
      <div className="mt-4 flex-1">
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-sm text-gray-600">{author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(rating) ? '#facc15' : 'none'}
              strokeWidth={1}
            />
          ))}
          <span className="text-gray-500 ml-1">({rating})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-lg font-bold text-pink-600">₹{price}</span>{' '}
          <span className="text-sm line-through text-gray-500">
            ₹{originalPrice}
          </span>{' '}
          <span className="text-sm text-green-600 font-semibold">
            {discount}% off
          </span>
        </div>
      </div>

      {/* View Details */}
      <Link
        to={`/book/${id}`}
        state={{
          id,
          title,
          author,
          imageUrl,
          price,
          originalPrice,
          rating,
        }}
        className="mt-3 text-sm text-pink-600 hover:underline font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
