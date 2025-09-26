import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// import { useAuth } from '../features/auth/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
