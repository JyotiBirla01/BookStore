import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import BookDetailPage from '../pages/BookDetailPage';
import ProtectedRoute from './ProtecteRoute';
import Layout from '../components/common/Layout';
import WishlistPage from '../pages/WishListPage';
import CheckoutPage from '../pages/CheckOutPage';

const AppRoutes = ({ user }) => {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to={user ? '/home' : '/login'} />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes Wrapper */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/book/:bookId" element={<BookDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path='/checkout' element={<CheckoutPage/>}/>
        {/* Add more protected child routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
