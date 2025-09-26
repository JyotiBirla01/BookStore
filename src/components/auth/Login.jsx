// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendOtpAction ,setMobile} from '../../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [mobile, setMobile] = useState('');
//   const [role, setRole] = useState('admin');
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);
// const { isAuthenticated } = useSelector((state) => state.auth);
// const navigate = useNavigate();

// useEffect(() => {
//   if (isAuthenticated) {
//     navigate('/');
//   }
// }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//    try {
//     await dispatch(sendOtpAction({ mobile, role })).unwrap();
//     dispatch(setMobile(mobile));
//     navigate("/verify");
//   } catch (error) {
//     console.error(error);
//   }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Book Store Login
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
//                 Mobile Number
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="mobile"
//                   name="mobile"
//                   type="text"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="9876543210"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//               >
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Sending OTP...
//                   </>
//                 ) : 'Send OTP'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useEffect, useState } from 'react';
// import { useAuth } from "../features/auth/useAuth";
// import OtpInput from "../features/auth/otpInput";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import OtpInput from '../../pages/otpInput';
// import OtpInput from "../components/";

const Login = () => {
  const { step, sendOtp, verifyOtp, loading, error, user } = useAuth();
  const [mobile, setMobile] = useState('');
  const [role] = useState('user');
  const [otpArray, setOtpArray] = useState(Array(6).fill(''));
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after successful login
    if (user) {
      navigate('/home'); // or "/profile" if that's first screen
    }
  }, [user, navigate]);
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile) sendOtp(mobile, role);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otp = otpArray.join('');
    if (otp.length === 6) verifyOtp(otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-lg bg-white/30 border border-white/30">
        <h2 className="text-3xl font-bold text-center text-black drop-shadow mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/80 mb-8">
          Login using your mobile number
        </p>

        {step === 'sendOtp' && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-3 rounded-md text-lg bg-white/80 text-gray-700 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold text-white rounded-md bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 transition duration-300 shadow-lg"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'verifyOtp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <OtpInput otp={otpArray} setOtp={setOtpArray} />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold text-white rounded-md bg-gradient-to-r from-green-400 to-lime-500 hover:from-lime-500 hover:to-green-400 transition duration-300 shadow-lg"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
