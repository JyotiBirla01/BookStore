import API from './axiosInstance';

export const sendOtp = async (mobile, role) => {
  const res = await API.post('/auth/send-otp', { mobile, role });
  return res.data;
};

export const verifyOtp = async (mobile, otp) => {
  const res = await API.post('/auth/verify-otp', { mobile, otp });
  return res.data;
};
