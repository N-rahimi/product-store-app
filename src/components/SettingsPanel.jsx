import React, { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import { useAppSettings } from '../context/AppSettingsContext';
import { 
  FiSettings, FiX, FiSun, FiMoon, FiGrid, FiList, 
  FiTag, FiLayers, FiMonitor, FiHeart, FiShoppingBag, FiPackage
} from 'react-icons/fi';
import { MdCategory, MdColorLens, MdViewModule } from 'react-icons/md';

const SettingsPanel = () => {
  const { isSettingsOpen, setIsSettingsOpen, settings, setTheme, setViewMode, setCategory } = useAppSettings();
  const [activeTab, setActiveTab] = React.useState('appearance');
  const panelRef = useRef(null);

  const closePanel = () => {
    setIsSettingsOpen(false);
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSettingsOpen && panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };

    const handleEscapeKey = (event) => {
      if (isSettingsOpen && event.key === 'Escape') {
        closePanel();
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isSettingsOpen]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });

  const categoryIcons = {
    "electronics": <FiMonitor />,
    "jewelery": <FiHeart />,
    "men's clothing": <FiShoppingBag />,
    "women's clothing": <FiPackage />,
  };

  if (!isSettingsOpen) return null;

  return (
    <>
      {/* Backdrop - تیره‌تر در دارک مود */}
      <div 
        className="fixed inset-0 bg-white/10 dark:bg-black/60 backdrop-blur-md z-[10000] animate-in fade-in duration-300"
        onClick={closePanel} 
      />
      
      {/* Settings Panel */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-[90vw] max-h-[85vh] rounded-3xl z-[10001] transition-all duration-300 backdrop-blur-3xl bg-white/95 dark:bg-gray-900/95 border border-gold/30 dark:border-gold/50 shadow-2xl animate-in slide-in-from-top-4 duration-300 flex flex-col overflow-hidden"
        ref={panelRef} 
        onClick={handlePanelClick}
      >
        {/* Header */}
        <div className="pt-7 pb-5 px-7 text-center border-b border-gold/20 dark:border-gold/30 relative">
          <div className="w-16 h-16 bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-gray-900">
            <FiSettings />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] bg-clip-text text-transparent mb-1.5">
            Customize Experience
          </h2>
          <p className="text-sm text-text-secondary dark:text-gray-300">Personalize your luxury shopping journey</p>
          <button 
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-text-secondary dark:text-gray-300 hover:bg-gold/20 hover:text-gold hover:rotate-90 transition-all duration-200"
            onClick={closePanel}
          >
            <FiX />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-5 gap-2 border-b border-gold/20 dark:border-gold/30">
          <button 
            className={`flex-1 py-3.5 bg-transparent border-none font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-sm relative after:content-[''] after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] after:scale-x-0 after:transition-transform after:duration-200 ${activeTab === 'appearance' ? 'text-gold after:scale-x-100' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
            onClick={() => setActiveTab('appearance')}
          >
            <MdColorLens /> Appearance
          </button>
          <button 
            className={`flex-1 py-3.5 bg-transparent border-none font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-sm relative after:content-[''] after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] after:scale-x-0 after:transition-transform after:duration-200 ${activeTab === 'view' ? 'text-gold after:scale-x-100' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
            onClick={() => setActiveTab('view')}
          >
            <MdViewModule /> View
          </button>
          <button 
            className={`flex-1 py-3.5 bg-transparent border-none font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-sm relative after:content-[''] after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#c4a43c] after:via-[#e0c460] after:to-[#c4a43c] after:scale-x-0 after:transition-transform after:duration-200 ${activeTab === 'category' ? 'text-gold after:scale-x-100' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
            onClick={() => setActiveTab('category')}
          >
            <MdCategory /> Category
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-black/10 dark:[&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gold [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* Tab Appearance - Theme */}
          {activeTab === 'appearance' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-xl">🎨</span>
                <h3 className="text-base font-semibold text-text-primary dark:text-white">Theme Selection</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* Light Theme Card */}
                <div 
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold ${settings.theme === 'light' ? 'border-2 border-gold bg-gold/10' : 'border-2 border-gold/20 bg-black/5 dark:bg-white/10'}`}
                  onClick={() => setTheme('light')}
                >
                  <div className="h-[100px] rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
                    <div className="h-5 bg-[#dee2e6] m-2 rounded-xl"></div>
                    <div className="h-10 bg-[#e9ecef] m-2 rounded-lg"></div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-text-primary dark:text-white">
                    <FiSun />
                    <span>Light Mode</span>
                  </div>
                  {settings.theme === 'light' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">✓</div>
                  )}
                </div>
                
                {/* Dark Theme Card */}
                <div 
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold ${settings.theme === 'dark' ? 'border-2 border-gold bg-gold/10' : 'border-2 border-gold/20 bg-black/5 dark:bg-white/10'}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="h-[100px] rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                    <div className="h-5 bg-[#2a2a4a] m-2 rounded-xl"></div>
                    <div className="h-10 bg-[#1e1e36] m-2 rounded-lg"></div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-text-primary dark:text-white">
                    <FiMoon />
                    <span>Dark Mode</span>
                  </div>
                  {settings.theme === 'dark' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">✓</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab View */}
          {activeTab === 'view' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-xl">👁️</span>
                <h3 className="text-base font-semibold text-text-primary dark:text-white">Display Layout</h3>
              </div>
              <div className="flex flex-col gap-3">
                {/* Grid View Card */}
                <div 
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1 hover:border-gold ${settings.viewMode === 'grid' ? 'border-2 border-gold bg-gold/10' : 'border border-gold/20 bg-black/5 dark:bg-white/10'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-2xl text-gold">
                    <FiGrid />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-text-primary dark:text-white mb-1">Grid View</h4>
                    <p className="text-xs text-text-muted dark:text-gray-400">Products in elegant grid layout</p>
                  </div>
                  {settings.viewMode === 'grid' && (
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 text-xs font-semibold">Active</div>
                  )}
                </div>
                
                {/* List View Card */}
                <div 
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1 hover:border-gold ${settings.viewMode === 'list' ? 'border-2 border-gold bg-gold/10' : 'border border-gold/20 bg-black/5 dark:bg-white/10'}`}
                  onClick={() => setViewMode('list')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-2xl text-gold">
                    <FiList />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-text-primary dark:text-white mb-1">List View</h4>
                    <p className="text-xs text-text-muted dark:text-gray-400">Products in detailed list</p>
                  </div>
                  {settings.viewMode === 'list' && (
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c4a43c] via-[#e0c460] to-[#c4a43c] text-gray-900 text-xs font-semibold">Active</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Category */}
          {activeTab === 'category' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-xl">📁</span>
                <h3 className="text-base font-semibold text-text-primary dark:text-white">Filter by Category</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* All Products */}
                <button 
                  className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/5 text-text-primary dark:text-gray-200 font-medium text-sm relative ${settings.selectedCategory === 'all' ? 'border-2 border-gold bg-gold/10 text-gold' : 'border border-gold/20 bg-black/5 dark:bg-white/10'}`}
                  onClick={() => setCategory('all')}
                >
                  <FiLayers className="text-lg" />
                  <span>All Products</span>
                  {settings.selectedCategory === 'all' && <span className="absolute right-3 text-gold font-bold">✓</span>}
                </button>
                
                {/* Dynamic Categories */}
                {categories?.map(category => (
                  <button 
                    key={category}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/5 text-text-primary dark:text-gray-200 font-medium text-sm relative ${settings.selectedCategory === category ? 'border-2 border-gold bg-gold/10 text-gold' : 'border border-gold/20 bg-black/5 dark:bg-white/10'}`}
                    onClick={() => setCategory(category)}
                  >
                    {categoryIcons[category] || <FiTag className="text-lg" />}
                    <span>
                      {category === "men's clothing" ? "Men's Fashion" :
                       category === "women's clothing" ? "Women's Fashion" :
                       category === "electronics" ? "Electronics" :
                       category === "jewelery" ? "Jewelery" :
                       category}
                    </span>
                    {settings.selectedCategory === category && <span className="absolute right-3 text-gold font-bold">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t border-gold/20 dark:border-gold/30">
          <div className="text-xs text-gold flex items-center justify-center gap-1.5">
            <span>✨ Premium Experience</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;