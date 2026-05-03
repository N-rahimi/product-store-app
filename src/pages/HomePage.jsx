import React from 'react';
import ProductList from '../components/ProductList';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { useAppSettings } from '../context/AppSettingsContext';
import { FiGrid, FiList, FiStar } from 'react-icons/fi';

const HomePage = () => {
  const { settings, setViewMode } = useAppSettings();

  return (
    <div className="home-page">
      {/* Hero Section - کوچک‌تر شده */}
      <div className="relative text-center py-10 md:py-14 mb-6 backdrop-blur-xl bg-white/30 dark:bg-gray-900/40 border border-white/40 dark:border-white/20 rounded-[40px] md:rounded-[60px] overflow-hidden">
        <div className="hero-content relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold/20 dark:bg-gold/30 backdrop-blur-md px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm text-gold mb-4">
            <FiStar />
            <span>Luxury Collection 2026</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary dark:text-white mb-2 px-4">
            Discover <span className="bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent">Premium</span> Products
          </h1>
          <p className="text-sm md:text-base text-text-secondary dark:text-gray-300 max-w-2xl mx-auto px-4">
            Explore our curated collection of high-end products from world-class brands
          </p>
        </div>
      </div>

      {/* Search Bar - FULL WIDTH و زیبا */}
      <SearchBar />

      {/* Products Section */}
      <div className="products-section mt-6 md:mt-8">
        <div className="flex justify-between items-end mb-6 md:mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary dark:text-white flex items-center gap-2">
              <span>✨</span>
              Our Products
            </h2>
            <p className="text-xs md:text-sm text-text-muted dark:text-gray-400 mt-1">
              Handpicked luxury items just for you
            </p>
          </div>
          <div>
            <div className="flex gap-2 bg-white/20 dark:bg-gray-800/40 backdrop-blur-md p-1 rounded-full border border-white/30 dark:border-gray-600/50">
              <button 
                className={`flex items-center gap-1.5 px-4 md:px-5 py-1.5 md:py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                  settings.viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900' 
                    : 'bg-transparent text-text-secondary dark:text-gray-300 hover:text-gold'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button 
                className={`flex items-center gap-1.5 px-4 md:px-5 py-1.5 md:py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                  settings.viewMode === 'list' 
                    ? 'bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900' 
                    : 'bg-transparent text-text-secondary dark:text-gray-300 hover:text-gold'
                }`}
                onClick={() => setViewMode('list')}
              >
                <FiList size={16} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        <CategoryFilter />
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;