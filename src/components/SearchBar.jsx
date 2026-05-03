import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiTrendingUp, FiTag, FiStar } from 'react-icons/fi';
import { useAppSettings } from '../context/AppSettingsContext';

const SearchBar = () => {
  const { settings, setSearchQuery } = useAppSettings();
  const [localQuery, setLocalQuery] = useState(settings.searchQuery || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const popularSearches = [
    { icon: <FiStar />, text: "jewelery", color: "text-purple-500" },
    { icon: <FiTrendingUp />, text: "electronics", color: "text-blue-500" },
    { icon: <FiTag />, text: "men's clothing", color: "text-emerald-500" },
    { icon: <FiTag />, text: "women's clothing", color: "text-pink-500" },
  ];

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 400);
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    setSearchQuery(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 mb-8 md:mb-12">
      <div className="max-w-7xl mx-auto">
        {/* عنوان و توضیحات */}
        <div className="text-center mb-5 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-text-primary dark:text-white mb-2 flex items-center justify-center gap-2">

            Find Your Perfect Product
            <span className="text-gold">✨</span>
          </h3>
          <p className="text-xs md:text-sm text-text-muted dark:text-gray-400">
            Search from 100+ luxury products
          </p>
        </div>

        {/* جعبه جستجوی اصلی */}
        <div className="relative group">
          {/* افکت درخشش در پس‌زمینه */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition duration-500 ${isFocused ? 'opacity-60' : ''}`}></div>
          
          <div className="relative">
            {/* آیکون ذره‌بین داخل سرچ بار - سمت چپ */}
            <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 z-10">
              <div className={`
                w-10 h-10 md:w-12 md:h-12 
                rounded-full 
                flex items-center justify-center 
                transition-all duration-300
                ${isFocused 
                  ? 'bg-gradient-to-r from-[#c4a43c] to-[#e0c460] shadow-lg shadow-gold/50 scale-110' 
                  : 'bg-gradient-to-r from-[#c4a43c]/20 to-[#e0c460]/20 group-hover:scale-105'
                }
              `}>
                <FiSearch className={`
                  text-lg md:text-xl 
                  transition-all duration-300 
                  ${isFocused ? 'text-gray-900' : 'text-gold'}
                `} />
              </div>
            </div>
            
            {/* اینپوت جستجو */}
            <input
              ref={inputRef}
              type="text"
              value={localQuery}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search by product name, category, or keyword..."
              className={`
                w-full py-5 pl-16 md:pl-20 pr-24 md:pr-28
                rounded-full
                backdrop-blur-2xl
                bg-white/40 dark:bg-gray-900/60
                border-2 transition-all duration-300
                text-base md:text-lg
                font-medium
                ${isFocused 
                  ? 'border-gold shadow-2xl shadow-gold/30 scale-[1.01]' 
                  : 'border-white/50 dark:border-white/20 hover:border-gold/60'
                }
                text-text-primary dark:text-white 
                placeholder:text-text-muted/70 dark:placeholder:text-gray-500
                focus:outline-none
              `}
            />
            
            {/* دکمه پاک کردن */}
            {localQuery && (
              <button
                onClick={handleClear}
                className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 hover:bg-gradient-to-r hover:from-[#c4a43c] hover:via-[#e0c460] hover:to-[#c4a43c] flex items-center justify-center transition-all duration-300 group hover:scale-110"
                aria-label="Clear search"
              >
                <FiX className="text-gold text-base md:text-xl group-hover:text-gray-900 group-hover:rotate-90 transition-all duration-300" />
              </button>
            )}
            
            {/* آمار جستجو */}
            {settings.searchQuery && !localQuery && (
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gold/20 backdrop-blur-sm text-gold text-xs font-semibold">
                Searching...
              </div>
            )}

            {/* ذره‌بین دوم در سمت راست (اختیاری - برای دکمه جستجو) */}
            {!localQuery && !settings.searchQuery && (
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <FiSearch className="text-gold text-sm md:text-base" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* بخش پیشنهادات جستجو */}
        {!localQuery && !settings.searchQuery && (
          <div className="mt-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <span className="text-xs md:text-sm text-text-muted dark:text-gray-400 mr-2">
                🔥 Popular:
              </span>
              {popularSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item.text)}
                  className={`
                    group px-4 md:px-5 py-2 md:py-2.5 rounded-full
                    backdrop-blur-md
                    bg-white/30 dark:bg-gray-800/50
                    border border-white/40 dark:border-white/20
                    text-xs md:text-sm font-medium
                    transition-all duration-300
                    hover:scale-105 hover:-translate-y-1
                    hover:border-gold hover:shadow-lg hover:shadow-gold/30
                    flex items-center gap-2
                    ${item.color} dark:text-white
                  `}
                >
                  <span className="text-sm md:text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* نمایش نتیجه جستجوی فعال */}
        {settings.searchQuery && (
          <div className="mt-5 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 backdrop-blur-md border border-gold/30">
              <FiSearch className="text-gold text-sm md:text-base" />
              <span className="text-xs md:text-sm text-text-secondary dark:text-gray-300">
                Showing results for: 
                <span className="font-bold text-gold ml-1">"{settings.searchQuery}"</span>
              </span>
              <button
                onClick={handleClear}
                className="text-gold hover:text-gold-dark transition-colors ml-1"
              >
                <FiX className="text-xs md:text-sm" />
              </button>
            </div>
          </div>
        )}

        {/* نکات جستجو */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs text-text-muted dark:text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold"></span>
            Search in 4 categories
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold"></span>
            100+ products
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold"></span>
            Instant results
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;