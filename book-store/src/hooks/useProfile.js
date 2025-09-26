import {
  clearProfileError,
  createProfileThunk,
  fetchProfileThunk,
  resetProfileStatus,
  updateProfileThunk,
} from '../redux/slices/profileSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading, success } = useAppSelector(
    (state) => state.profile
  );
  return {
    profile: data,
    error,
    loading,
    success,
    createProfile: (formData) => dispatch(createProfileThunk(formData)),
    getProfile: () => dispatch(fetchProfileThunk()),
    updateProfile: (formData) => dispatch(updateProfileThunk(formData)),
    clearError: () => dispatch(clearProfileError()),
    resetStatus: () => dispatch(resetProfileStatus()),
  };
};
