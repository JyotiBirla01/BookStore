import { useSelector } from 'react-redux';
import Login from '../components/auth/Login';
import OtpForm from '../components/auth/otpForm';
import { Navigate } from 'react-router-dom';
// import OtpForm from '../components/auth/OtpForm';

const AuthPage = () => {
  const { otpSent, user } = useSelector((state) => state.auth);

  if (user) {
    // User is already logged in, redirect to home
    return <Navigate to="/" />;
  }

  return <div className="auth-page">{otpSent ? <OtpForm /> : <Login />}</div>;
};

export default AuthPage;
