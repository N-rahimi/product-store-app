import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiShoppingCart, FiSun, FiMoon, FiSettings } from 'react-icons/fi';
import { useAppSettings } from '../../context/AppSettingsContext';

const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { settings, setTheme, setIsSettingsOpen } = useAppSettings();

  React.useEffect(() => {
    document.body.className = settings.theme;
  }, [settings.theme]);

  const openSettingsPanel = () => {
    setIsSettingsOpen(true);
  };

  return (
    <nav className="fixed top-3 left-3 right-3 md:top-5 md:left-5 md:right-5 z-50 backdrop-blur-xl bg-white/30 dark:bg-black/40 border border-white/30 dark:border-white/20 rounded-2xl md:rounded-[60px] transition-all duration-300 py-2 md:py-3 px-4 md:px-7 shadow-lg shadow-black/5 dark:shadow-black/30">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-[1.3rem] md:text-[1.8rem] font-extrabold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent no-underline tracking-tight flex items-center gap-1 drop-shadow-sm">
          <span>🛍️</span>
          <span className="xs:inline font-bold">ShopHub</span>
        </Link>

        {/* Desktop Navigation (md and up) */}
        <div className="hidden md:flex gap-4 lg:gap-7 items-center">
          <Link to="/" className="text-text-primary dark:text-white/90 font-semibold hover:text-gold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] after:transition-all after:duration-300 hover:after:w-full">
            Products
          </Link>

          <Link to="/cart" className="flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/20 text-text-primary dark:text-white/90 font-semibold hover:border-gold hover:-translate-y-0.5 hover:bg-gold/20 dark:hover:bg-gold/20 transition-all duration-300 shadow-sm">
            <FiShoppingCart size={18} className="dark:text-white/90" />
            <span className="text-sm">Cart</span>
            {totalQuantity > 0 && (
              <span className="bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 rounded-full px-2 py-0.5 text-xs font-extrabold ml-1 shadow-sm">
                {totalQuantity}
              </span>
            )}
          </Link>

          <button 
            className="backdrop-blur-md bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/20 cursor-pointer p-2.5 rounded-full flex items-center justify-center transition-all duration-300 text-text-primary dark:text-white/80 hover:rotate-12 hover:scale-105 hover:border-gold hover:text-gold dark:hover:text-gold hover:bg-gold/15 dark:hover:bg-gold/15 shadow-sm"
            onClick={openSettingsPanel}
            aria-label="Settings"
          >
            <FiSettings size={18} />
          </button>

          <button 
            className="backdrop-blur-md bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/20 cursor-pointer p-2.5 rounded-full flex items-center justify-center transition-all duration-300 text-text-primary dark:text-white/80 hover:rotate-12 hover:scale-105 hover:border-gold hover:text-gold dark:hover:text-gold hover:bg-gold/15 dark:hover:bg-gold/15 shadow-sm"
            onClick={() => setTheme(settings.theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {settings.theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>
        </div>

        {/* Mobile Navigation (below md) - همه دکمه‌ها مستقیماً روی navbar */}
        <div className="flex md:hidden items-center gap-2">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <div className="backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/30 p-2 rounded-full transition-all duration-300 hover:border-gold hover:bg-gold/15 dark:hover:bg-gold/15 active:scale-95">
              <FiShoppingCart size={18} className="text-gray-800 dark:text-white" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold shadow-sm">
                  {totalQuantity}
                </span>
              )}
            </div>
          </Link>

          {/* Theme Toggle Button - مستقیم روی navbar */}
          <button 
            className="backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/30 p-2 rounded-full transition-all duration-300 hover:border-gold hover:bg-gold/15 dark:hover:bg-gold/15 hover:rotate-12 active:scale-95"
            onClick={() => setTheme(settings.theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {settings.theme === 'light' ? (
              <FiMoon size={18} className="text-gray-800 dark:text-white" />
            ) : (
              <FiSun size={18} className="text-gray-800 dark:text-white" />
            )}
          </button>

          {/* Settings Button - مستقیم روی navbar */}
          <button 
            className="backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/30 p-2 rounded-full transition-all duration-300 hover:border-gold hover:bg-gold/15 dark:hover:bg-gold/15 hover:rotate-12 active:scale-95"
            onClick={openSettingsPanel}
            aria-label="Settings"
          >
            <FiSettings size={18} className="text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;