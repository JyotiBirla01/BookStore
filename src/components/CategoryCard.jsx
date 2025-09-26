import { Link } from 'react-router-dom';
const CategoryCard = ({ name, categoryId }) => {
  return (
    <Link to={`/category/${encodeURIComponent(categoryId)}`}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center border border-pink-100">
        <h3 className="text-lg font-semibold text-pink-600">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
