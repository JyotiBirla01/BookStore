// import { sendOtpThunk, verifyOtpThunk } from '../../auth/authSlice';
// import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  logout,
  sendOtpThunk,
  verifyOtpThunk,
} from '../redux/slices/authSlice';
// import { logout, sendOtpThunk, verifyOtpThunk } from './authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error, step, mobile } = useAppSelector(
    (state) => state.auth
  );

  return {
    user,
    token,
    step,
    loading,
    error,
    mobile,
    sendOtp: (mobile, role) => dispatch(sendOtpThunk({ mobile, role })),
    verifyOtp: (otp) => dispatch(verifyOtpThunk({ mobile, otp })),
    logout: () => dispatch(logout()),
  };
};
