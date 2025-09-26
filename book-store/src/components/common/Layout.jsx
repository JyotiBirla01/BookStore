// src/components/common/Layout.jsx
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow px-6 py-10">
        <Outlet context={{ searchTerm, setSearchTerm }} />{' '}
        {/* 👈 This renders the nested route (e.g. HomePage) */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
