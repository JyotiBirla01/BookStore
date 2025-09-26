import API from './axiosInstance';

export const createProfile = async (profileData) => {
  const res = await API.post('/profile', profileData);
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get('/profile');
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await API.put('/profile', profileData);
  return res.data;
};
