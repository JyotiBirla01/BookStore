// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* You can add a header/navigation here */}
//       <main className="py-10">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PrivateRoute;
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
