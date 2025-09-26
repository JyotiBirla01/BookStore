// ProfileModal.jsx
import { useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../validations/profileValidations';

const ProfileModal = ({ profile, loading, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: profile || {},
  });

  useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 border-l border-gray-200 overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register('fullName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone"
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            {...register('dateOfBirth')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Address"
            {...register('address')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <select
            {...register('gender')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white flex items-center justify-center gap-2 ${
            loading ? 'bg-pink-300' : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          <Save size={18} /> {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileModal;
