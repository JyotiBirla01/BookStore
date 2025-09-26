import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCategories } from '../hooks/useCategories';
import { useCallback, useEffect, useRef } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useOutletContext } from 'react-router-dom';
// import { searchBooks } from '../api/bookApi';

const slides = [img1, img2, img3];
const HomePage = () => {
  // const [searchTerm, setSearchTerm] = useState();
  const { searchTerm } = useOutletContext();
  const observer = useRef();
  const { categories, loading, error, getCategories } = useCategories();
  const {
    books,
    bookLoading,
    getBooks,
    currentPage,
    searchBooks,
    totalPages,
    resetAll,
    query,
  } = useBooks();

  useEffect(() => {
    getCategories();
  }, []);

  const lastBookRef = useCallback(
    (node) => {
      if (bookLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          if (query) {
            searchBooks(query, currentPage + 1);
          } else {
            getBooks(currentPage + 1);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [bookLoading, currentPage, totalPages, searchTerm, getBooks]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      resetAll();
      if (searchTerm?.trim()) {
        searchBooks(searchTerm, 1); //  this uses Redux thunk
      } else {
        getBooks(1);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fff6f6] to-[#fff]">
      <section className="relative w-full h-[500px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                {/* Pink Overlay */}
                <div className="absolute inset-0  bg-opacity-1"></div>
                {/* Pink Glassmorphism Overlay */}
                {/* <div className="absolute inset-0 bg-pink-300/30 "></div> */}

                {/* Content on top of overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
                    📚 Discover Your Next Favorite Book
                  </h1>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
                    Explore a wide variety of genres, hand-picked collections,
                    and personalized recommendations.
                  </p>
                  <button className="px-6 py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow">
                    Start Browsing
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          📂 Browse Categories
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  categoryId={category.id}
                />
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        )}
      </section>
      <section className="py-12 px-6 bg-pink-50">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          🔥 Bestsellers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, index) => {
            const isLast = index === books.length - 1;
            return (
              <div key={book.id} ref={isLast ? lastBookRef : null}>
                <BookCard book={book} />
              </div>
            );
          })}
        </div>
        {bookLoading && (
          <p className="text-gray-500 mt-4 text-center">
            Loading more books...
          </p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
