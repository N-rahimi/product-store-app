import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SettingsPanel from '../SettingsPanel';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1 pt-[80px] md:pt-[100px] pb-8 md:pb-12 px-3 sm:px-4 md:px-6 max-w-[1400px] mx-auto w-full">
        {children}
      </main>
      <SettingsPanel />
      <Footer />
    </div>
  );
};

export default MainLayout;