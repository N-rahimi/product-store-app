import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import { useAppSettings } from '../context/AppSettingsContext';
import { 
  FiGrid, FiList, FiTag, FiLayers, FiPackage, FiShoppingBag, 
  FiWatch, FiSmartphone, FiHome, FiHeart, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

const categoryIcons = {
  "electronics": <FiSmartphone />,
  "jewelery": <FiHeart />,
  "men's clothing": <FiShoppingBag />,
  "women's clothing": <FiPackage />,
  "all": <FiLayers />
};

const categoryNames = {
  "all": "All Products",
  "electronics": "Electronics",
  "jewelery": "Jewelery",
  "men's clothing": "Men's Fashion",
  "women's clothing": "Women's Fashion"
};

const CategoryFilter = () => {
  const { settings, setCategory, setViewMode } = useAppSettings();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = React.useRef(null);

  const allCategories = ['all', ...(categories || [])];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newPosition = scrollPosition + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="mb-12 p-6 backdrop-blur-xl bg-white/30 dark:bg-black/50 border border-white/40 dark:border-white/20 rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 flex-wrap gap-4">
        <div className="flex items-center gap-2 font-semibold text-text-primary dark:text-white">
          <span className="text-xl">🏷️</span>
          <span>Browse by Category</span>
        </div>
        <button 
          className="px-5 py-2 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold font-semibold cursor-pointer transition-all duration-300 hover:bg-gold hover:text-gray-900"
          onClick={() => setCategory('all')}
        >
          Reset All
        </button>
      </div>
      
      {/* Categories Container with Scroll */}
      <div className="relative flex items-center gap-2">
        {/* Scroll Left Button */}
        <button 
          className="w-9 h-9 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/30 cursor-pointer flex items-center justify-center text-text-primary dark:text-white transition-all duration-300 flex-shrink-0 hover:bg-gold hover:text-gray-900 hover:border-gold"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <FiChevronLeft />
        </button>
        
        {/* Scrollable Categories */}
        <div 
          className="flex gap-3 overflow-x-auto scroll-smooth flex-1 py-1 [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          {allCategories.map((category, index) => (
            <button
              key={category}
              className={`
                flex items-center gap-2.5 px-6 py-2.5 rounded-full cursor-pointer 
                transition-all duration-300 whitespace-nowrap font-medium
                bg-white/25 dark:bg-white/10 backdrop-blur-lg
                border border-white/30 dark:border-white/30
                text-text-primary dark:text-white hover:-translate-y-0.5 hover:border-gold hover:bg-gold/25 dark:hover:bg-gold/25
                ${settings.selectedCategory === category 
                  ? 'bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] border-gold text-gray-900 dark:text-gray-900 hover:bg-gradient-to-r' 
                  : ''
                }
              `}
              onClick={() => setCategory(category)}
              style={{ '--index': index }}
            >
              <span className="text-base dark:text-white">
                {categoryIcons[category] || <FiTag />}
              </span>
              <span className="text-sm">
                {categoryNames[category] || category}
              </span>
              {settings.selectedCategory === category && (
                <span className="ml-1 text-xs">●</span>
              )}
            </button>
          ))}
        </div>
        
        {/* Scroll Right Button */}
        <button 
          className="w-9 h-9 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/30 cursor-pointer flex items-center justify-center text-text-primary dark:text-white transition-all duration-300 flex-shrink-0 hover:bg-gold hover:text-gray-900 hover:border-gold"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;