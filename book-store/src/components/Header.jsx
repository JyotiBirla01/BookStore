import { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

import { User, HelpCircle, LogOut, ShoppingCart } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { toast } from 'react-toastify';
import ProfileModal from './ProfileModel';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';

const navLinks = [
  { label: 'Home', path: '/home' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Shop', path: '/shop' },
];

const Header = ({ searchTerm, setSearchTerm }) => {
  const {
    profile,
    createProfile,
    getProfile,
    updateProfile,
    loading,
    error,
    success,
    clearError,
    resetStatus,
  } = useProfile();

  const [openMenu, setOpenMenu] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const { search } = useBooks();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      search(searchTerm, 1); // search first page
    }
  };

  useEffect(() => {
    if (success) {
      getProfile();
    }
  }, [success]);

  useEffect(() => {
    if (success) {
      toast.success('Profile saved successfully!');
      setEditProfile(false);
      resetStatus();
    }
  }, [success]);

  useEffect(() => {
    if (error && error !== 'Profile not found') {
      toast.error(error);
      clearError();
    }
  }, [error]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };
  const handleWishList = () => {
    navigate('/wishlist');
  };
  return (
    <div className="relative">
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        {/* Left: Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-pink-600">📖 BookNest</h1>
          <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            {navLinks.map((nav) => (
              <Link
                key={nav.path}
                to={nav.path}
                className="hover:text-pink-600 transition"
              >
                {nav.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="relative w-1/2 max-w-lg">
          <input
            type="text"
            placeholder="Search books by title, author, category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full px-4 py-2 rounded-md border border-gray-300 pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Right: Cart & Profile */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Heart
            className="text-gray-600 hover:text-pink-500 cursor-pointer"
            size={24}
            onClick={handleWishList}
          />
          <div className="relative cursor-pointer">
            <ShoppingCart className="text-pink-600" />
            <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full px-1.5 py-0.5">
              2
            </span>
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold hover:bg-pink-700"
            >
              J
            </button>
            {openMenu && (
              <div className="absolute right-0 mt-2 w-[360px] bg-white border border-gray-200 text-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-lg">
                    {profile?.fullName || 'Guest'}
                  </p>
                  <p className="text-sm text-gray-500">Book Lover</p>
                </div>
                <ul className="flex flex-col py-2">
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2"
                    onClick={() => setEditProfile(true)}
                  >
                    <User size={18} /> Profile
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2">
                    <HelpCircle size={18} /> Help
                  </li>
                  <hr className="border-gray-200 my-1" />
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {editProfile && (
        <ProfileModal
          profile={profile}
          loading={loading}
          onClose={() => setEditProfile(false)}
          onSubmit={(formData) => {
            profile ? updateProfile(formData) : createProfile(formData);
          }}
        />
      )}
    </div>
  );
};

export default Header;
