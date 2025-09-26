import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const { state } = useLocation();
  const { addToCart, loading } = useCart();
  const navigate=useNavigate();
  if (!state) {
    return (
      <p className="text-center mt-10 text-gray-500">No book details found.</p>
    );
  }

  const {
    title,
    author,
    description,
    price,
    originalPrice = 399,
    rating = 4.5,
    imageUrl,
    Category,
  } = state;

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(bookId, 1); // quantity default 1
  };
  const handleBuyNow=()=>{
    navigate("/checkout")

  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Book Image */}
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center">
          <img
            src={
              imageUrl?.startsWith('/uploads')
                ? `${process.env.REACT_APP_BASE_URL}${imageUrl}`
                : imageUrl
            }
            alt={title}
            className="object-contain max-h-[450px] transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Book Details */}
        <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-1">
              by <span className="font-medium">{author}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Category: {Category?.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(rating) ? '#facc15' : 'none'}
                  strokeWidth={1.2}
                  className="text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({rating})</span>
            </div>

            {/* Price & Discount */}
            <div className="mb-4">
              <span className="text-3xl font-bold text-pink-600">₹{price}</span>
              <span className="line-through text-gray-500 text-lg ml-3">
                ₹{originalPrice}
              </span>
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-md text-sm font-medium">
                {discount}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-[16px] mb-6">
              {description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 border border-pink-600  hover:bg-pink-50 text-pink-600 text-lg px-6 py-3 rounded-lg transition duration-200 "
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button onClick={handleBuyNow} className="flex items-center gap-2  bg-pink-600 text-white hover:bg-pink-70 px-6 py-3 rounded-lg transition duration-200 shadow ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
